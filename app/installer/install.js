const { writeFile, mkdir, copyFile, unlink } = require("fs").promises;
const { dirname, basename, parse, resolve, join } = require("path");

const { BROWSERS, PLATFORM } = require("../lib/app-variables").APP;
const { exists } = require("../lib/utilities");
const { BROWSER_DATA, MANIFEST_OBJECT, metaData } = require("../lib/CONSTANTS");
const { APP_NAME, PROJECT_NAME, MANIFEST_NAME, DESCRIPTION } = metaData;

function scaffoldManifestFile(MANIFEST_OBJECT, path, allowed) {
	// const { hostPath: path, allowed } = manifestProperties;
	return JSON.stringify({ ...MANIFEST_OBJECT, path, ...allowed }, null, 2);
}

async function writeManifestFile(manifestPath, manifestFileData) {
	const manifestDirectoryPath = dirname(manifestPath);
	const isManifestDirectory = await exists(manifestDirectoryPath);

	if (isManifestDirectory) {
		await writeFile(manifestPath, manifestFileData).catch((error) => console.log(error));
	} else {
		await mkdir(manifestDirectoryPath).catch((error) => console.log(error));
		await writeFile(manifestPath, manifestFileData).catch((error) => console.log(error));
	}
}

async function writeHostApp(hostPath) {
	const hostAppDirectory = join(PROJECT_NAME, APP_NAME);
	// console.log(`LOG: writeHostApp -> hostAppDirectoryS`, hostAppDirectoryS);
	// const { dir: hostAppPath, base: hostAppFilename } = parse(hostPath);
	// const isHostAppDirectory = await exists(hostAppDirectoryPath);
	const isLocalPath = (await exists(hostPath)) && (await exists(join(hostPath, PROJECT_NAME)));
	// console.log(`LOG: writeHostApp -> isHostAppDirectory`, isLocalPath);
	const installerPath = resolve(APP_NAME);

	if (isLocalPath) {
		// await writeFile(hostPath, "test").catch((error) => console.log(error));
		await copyFile(installerPath, join(hostPath, PROJECT_NAME, APP_NAME)).catch((error) =>
			console.log(error),
		);
	} else {
		await mkdir(join(hostPath, PROJECT_NAME)).catch((error) => console.log(error));
		await copyFile(installerPath, join(hostPath, PROJECT_NAME, APP_NAME)).catch((error) =>
			console.log(error),
		);
	}

	unlink(installerPath);

	return exists(join(hostPath, PROJECT_NAME, APP_NAME));
}

async function install(browser) {
	const browserData = BROWSER_DATA.map((browserItem) => {
		if (browserItem[PLATFORM].aliases.some((browserName) => browserName === browser)) {
			return {
				// browser: browserItem.browser,
				manifestPath: browserItem[PLATFORM].scope.user.manifestPath,
				hostPath: browserItem[PLATFORM].scope.user.hostPath,
				allowed: browserItem.allowed,
			};
		}
	}).filter(Boolean);

	const { manifestPath, hostPath, allowed } = browserData[0];
	const hostAppPath = join(hostPath, PROJECT_NAME, APP_NAME);
	const manifestData = scaffoldManifestFile(MANIFEST_OBJECT, hostAppPath, allowed);

	await writeHostApp(hostPath, metaData);
	await writeManifestFile(manifestPath, manifestData);
}

async function installer(params) {}

module.exports = {
	install,
	installer,
};
