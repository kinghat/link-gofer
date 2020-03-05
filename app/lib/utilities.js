// const { homedir } = require("os");
const { stat } = require("fs").promises;
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const { Registry } = require("winreg-utf8");

const getManifestPath = async (MANIFEST_PATHS, PLATFORM, MANIFEST_SCOPE, browser = "chrome") => {
	const scope = await MANIFEST_SCOPE();

	return scope ? MANIFEST_PATHS[PLATFORM][scope][browser] : scope;
};

const getManifestScope = async (MANIFEST_PATHS, PLATFORM, browser = "chrome") => {
	for (const scope in MANIFEST_PATHS[PLATFORM]) {
		if (await isManifestFile(MANIFEST_PATHS[PLATFORM][scope][browser])) return scope;
	}
};

async function getBrowsers(PLATFORM, BROWSERS) {
	if (PLATFORM === "win32") {
		const browsers = BROWSERS.flatMap((browser) =>
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
		const browsers = BROWSERS.flatMap((browser) =>
			browser.linux.aliases.filter(async (name) => {
				const { stdout } = await exec(`command -v ${name}`).catch((error) => {
					if (error.code === 127) return {};
					throw error;
				});
				console.log({ stdout, name });
				if (stdout) return name;
				// return stdout ? name : stdout;
			}),
		);
		// console.log(browsers);
		return browsers;
	}
}

// async function test() {
// 	const util = require("util");
// const exec = util.promisify(require("child_process").exec);
// const { stdout } = await exec(`command -v google-chrome-stables`).catch((error) => {
// 	if (error.code === 127) return {};
// 	throw error;
// });
// console.log("stdout: ", stdout);
// }
// test();

// async function nixBrowsers(params) {}

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

const isInstalled = async (MANIFEST_PATHS, PLATFORM, MANIFEST_SCOPE) => {
	const manifestLocation = await getManifestPath(MANIFEST_PATHS, PLATFORM, MANIFEST_SCOPE);

	return manifestLocation ? isManifestFile(manifestLocation) : false;
};

module.exports = {
	getManifestPath,
	getManifestScope,
	getBrowsers,
	isManifestFile,
	isGlobalScope,
	isInstalled,
};
