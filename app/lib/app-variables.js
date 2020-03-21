const {
	NAME,
	MANIFEST_PATHS,
	WINDOWS_REGISTRY_KEYS,
	MANIFEST_OBJECT,
	BROWSER_DATA,
} = require("./CONSTANTS");
const {
	getManifestPath,
	getManifestScope,
	getBrowsers,
	isInstalled,
	scaffoldManifestFile,
} = require("./utilities");

const STATE = async () => isInstalled(MANIFEST_PATHS, PLATFORM, MANIFEST_SCOPE);
const PLATFORM = process.platform;
const BROWSERS = async () => getBrowsers(PLATFORM, BROWSER_DATA);
const MANIFEST_SCOPE = async () => getManifestScope(MANIFEST_PATHS, PLATFORM);
const MANIFEST_PATH = async () =>
	getManifestPath(APP.MANIFEST_PATHS, APP.PLATFORM, APP.MANIFEST_SCOPE);
// const MANIFEST_FILE = scaffoldManifestFile(BROWSER_DATA, MANIFEST_OBJECT, PLATFORM, browserName);
const APP = {
	NAME,
	STATE,
	PLATFORM,
	BROWSERS,
	MANIFEST_PATH,
	MANIFEST_SCOPE,
	MANIFEST_PATHS,
	// MANIFEST_FILE,
	WINDOWS_REGISTRY_KEYS,
};

module.exports = {
	APP,
};
