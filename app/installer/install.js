const { writeFile, mkdir, stat } = require("fs").promises;
const { parse } = require("path");

const { BROWSERS, PLATFORM } = require("../lib/app-variables").APP;
const { BROWSER_DATA, MANIFEST_OBJECT } = require("../lib/CONSTANTS");
// const { scaffoldManifestFile } = require("../lib/utilities");

function scaffoldManifestFile(MANIFEST_OBJECT, manifestProperties) {
	return JSON.stringify({ ...MANIFEST_OBJECT, ...manifestProperties }, null, 2);
}

// async function writeFile(path, data) {
// 	await writeFile(path, data).catch((error) => console.log(error));
// }

async function writeDir(path) {
	console.log(`LOG: writeDir -> status`, status);
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

async function install(browser, PLATFORM) {
	const browserData = BROWSER_DATA.map((browserItem) => {
		if (browserItem[PLATFORM].aliases.some((browserName) => browserName === browser)) {
			return {
				// browser: browserItem.browser,
				manifestPath: browserItem[PLATFORM].scope.user.manifestPath,
				hostPath: browserItem[PLATFORM].scope.user.hostPath,
				...browserItem.allowed,
			};
		}
	}).filter(Boolean);

	const MANIFEST_FILE = scaffoldManifestFile(MANIFEST_OBJECT, browserData[0]);
	// console.log(`LOG: install -> MANIFEST_FILE`, MANIFEST_FILE);
	const { manifestPath, hostPath } = browserData[0];
	const { dir: manifestDirectoryPath, base: manifestFileName } = parse(manifestPath);
	const { dir: hostAppDirectoryPath, base: hostAppFileName } = parse(hostPath);
	const isManifestDirectory = await exists(manifestDirectoryPath);

	// const isManifestDirectory = await exists(manifestDirectoryPath).catch((error) => {
	// 	if (error.code === "ENOENT") return false;
	// 	// if (error.code === "ENOENT" || error.code === "ERR_INVALID_ARG_TYPE") return false;
	// 	throw error;
	// });

	if (isManifestDirectory) {
		await writeFile(manifestPath, MANIFEST_FILE).catch((error) => console.log(error));
	} else {
		await mkdir(manifestDirectoryPath);
		await writeFile(manifestPath, MANIFEST_FILE).catch((error) => console.log(error));
	}

	// writeDir("/etc");
	// writeDir(browserData[0].path);
	// await writeManifest(browserData[0].path, MANIFEST_FILE);
}

async function installer(params) {}

module.exports = {
	install,
	installer,
};
