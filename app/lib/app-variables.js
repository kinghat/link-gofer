const {
	MANIFEST_NAME,
	APP_NAME,
	MANIFEST_PATHS,
	WINDOWS_REGISTRY_KEYS,
	MANIFEST_OBJECT,
	BROWSER_DATA,
	metaData,
} = require("./CONSTANTS");
const {
	getManifestPath,
	getManifestScope,
	getBrowsers,
	isAppInstalled,
	isManifestInstalled,
	// scaffoldManifestFile,
} = require("./utilities");

async function STATE() {
	const manifestState = await isManifestInstalled();
	const appState = await isAppInstalled();
	// if (appState.length && manifestState.length) return `Installed`;
	// if (manifestState.length) return `Partially: The application is missing.`;
	// if (appState.length) return `Partially: The Manifest is missing.`;
	return Boolean(appState.length && manifestState.length);
}
const PLATFORM = process.platform;
async function BROWSERS() {
	return getBrowsers(BROWSER_DATA);
}
// const BROWSERS = async () => getBrowsers();
const MANIFEST_SCOPE = async () => getManifestScope(MANIFEST_PATHS, PLATFORM);
const MANIFEST_PATH = async () =>
	getManifestPath(APP.MANIFEST_PATHS, APP.PLATFORM, APP.MANIFEST_SCOPE);
// const MANIFEST_FILE = scaffoldManifestFile(BROWSER_DATA, MANIFEST_OBJECT, PLATFORM, browserName);
const APP = {
	metaData,
	MANIFEST_NAME,
	APP_NAME,
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
