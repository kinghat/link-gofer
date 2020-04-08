// const { homedir } = require("os");
const { stat } = require("fs").promises;
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { join } = require("path");

const { Registry } = require("winreg-utf8");

const PLATFORM = process.platform;
const {
	MANIFEST_NAME,
	MANIFEST_PATHS,
	WINDOWS_REGISTRY_KEYS,
	MANIFEST_OBJECT,
	BROWSER_DATA,
	metaData,
} = require("./CONSTANTS");
const { APP_NAME, PROJECT_NAME } = metaData;

const getManifestPath = async (MANIFEST_PATHS, MANIFEST_SCOPE, browser = "chrome") => {
	const scope = await MANIFEST_SCOPE();

	return scope ? MANIFEST_PATHS[PLATFORM][scope][browser] : scope;
};

const getManifestScope = async (MANIFEST_PATHS, browser = "chrome") => {
	for (const scope in MANIFEST_PATHS[PLATFORM]) {
		if (await isManifestFile(MANIFEST_PATHS[PLATFORM][scope][browser])) return scope;
	}
};

async function getBrowsers(BROWSER_DATA) {
	if (PLATFORM === "win32") {
		const browsers = BROWSER_DATA.flatMap((browser) =>
			browser.win32.aliases.map((name) =>
				browser.browser === "firefox"
					? {
							name,
							hive: browser.win32.scope.global.hive,
							basePath: browser.win32.scope.global.basePath,
					  }
					: {
							name,
							hive: browser.win32.scope.user.hive,
							basePath: browser.win32.scope.user.basePath,
					  },
			),
		);
		return winBrowsers(browsers);
	} else if (PLATFORM === "linux") {
		let browsers = await Promise.all(
			BROWSER_DATA.flatMap((browser) => browser.linux.aliases).map(async (browser) => {
				const { stdout } = await exec(`command -v ${browser}`).catch((error) => {
					if ([127, 1].includes(error.code)) return {};

					throw error;
				});
				if (stdout) return browser;
			}),
		);
		browsers = browsers.filter(Boolean);
		console.log(`LOG: getBrowsers -> browsers: `, browsers);
		return browsers;
		// return (
		// 	await Promise.all(
		// 		BROWSER_DATA.flatMap((browser) => browser.linux.aliases).map(async (browser) => {
		// 			const { stdout } = await exec(`command -v ${browser}`).catch((error) => {
		// 				if ([127, 1].includes(error.code)) return {};

		// 				throw error;
		// 			});
		// 			if (stdout) return browser;
		// 		}),
		// 	)
		// ).filter(Boolean);
	}
}

async function winBrowsers(browserArray) {
	const installedBrowsers = [];
	for (const browser of browserArray) {
		const isKey = await winKeyExists(browser.hive, `${browser.basePath}\\${browser.name}`).catch(
			(error) => {
				throw error;
			},
		);
		if (isKey) installedBrowsers.push(browser);
	}
	return installedBrowsers;
}

function winKeyExists(hive, registryPath) {
	const registryKey = new Registry({
		hive: Registry[hive],
		key: registryPath,
	});

	return new Promise((resolve, reject) => {
		registryKey.keyExists((error, exists) => {
			if (error) reject(error);
			resolve(exists);
		});
	});
}

const isManifestFile = async (MANIFEST_PATH) => {
	// if (!STATIC_MANIFEST_PATH) return false;
	const status = await stat(MANIFEST_PATH).catch((error) => {
		if (error.code === "ENOENT") return false;
		// if (error.code === "ENOENT" || error.code === "ERR_INVALID_ARG_TYPE") return false;
		throw error;
	});

	if (!status || !status.isFile()) return false;

	return status.isFile();
};

const isGlobalScope = async (MANIFEST_SCOPE) => {
	const scope = await MANIFEST_SCOPE();

	return scope === "global" ? true : scope === "user" ? false : scope;
};

async function isAppInstalled() {
	let browsers = await Promise.all(
		BROWSER_DATA.map(async (browserItem) => {
			const appPath = browserItem[PLATFORM].scope.user.hostPath;
			const isAppInstalled = await exists(join(appPath, PROJECT_NAME, APP_NAME));

			if (isAppInstalled) return browserItem.browser;
		}),
	);
	browsers = browsers.filter(Boolean);
	console.log(`LOG: isAppInstalled -> browsers: `, browsers);
	return browsers;
}

async function isManifestInstalled() {
	let browsers = await Promise.all(
		BROWSER_DATA.map(async (browserItem) => {
			const manifestPath = browserItem[PLATFORM].scope.user.manifestPath;
			const isManifestInstalled = await exists(manifestPath);

			if (isManifestInstalled) return browserItem.browser;
		}),
	);
	browsers = browsers.filter(Boolean);
	console.log(`LOG: isManifestInstalled -> browsers: `, browsers);
	return browsers;
}

async function exists(path) {
	// if (error.code === "ENOENT") return;
	// if (error.code === "ENOENT" || error.code === "ERR_INVALID_ARG_TYPE") return false;
	// throw error;
	// return Boolean(
	// 	await stat(path).catch((error) => (error.code === "ENOENT" ? false : Error(error))),
	// );
	return stat(path).catch((error) => (error.code === "ENOENT" ? false : Error(error)));
}

// async function scaffoldManifestFile(BROWSER_DATA, MANIFEST_OBJECT, browserName) {
// 	// if (PLATFORM === "win32") {
// 	// 	console.log("win32 not setup yet!");
// 	// } else if (PLATFORM === "linux") {
// 	// 	const allowed = BROWSERS_DATA.MANIFEST_OBJECT;
// 	// }
// 	const manifestProperties = BROWSER_DATA.some((browserItem) =>
// 		browserItem.browser === browserName
// 			? {
// 					path: browserItem[PLATFORM].scope.user.manifestPath,
// 					manifestAllowed: browserItem.allowed,
// 			  }
// 			: {},
// 	);
// 	// console.log(`LOG: scaffoldManifestFile -> manifestProperties`, manifestProperties);

// 	MANIFEST_OBJECT = { ...MANIFEST_OBJECT, ...manifestProperties };
// 	return MANIFEST_OBJECT;
// }

module.exports = {
	getManifestPath,
	getManifestScope,
	getBrowsers,
	isManifestFile,
	isGlobalScope,
	isAppInstalled,
	isManifestInstalled,
	exists,
	// scaffoldManifestFile,
};
