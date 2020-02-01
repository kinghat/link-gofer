const { NAME, MANIFEST_PATHS, WINDOWS_REGISTRY_KEYS } = require("./CONSTANTS");
const { getManifestPath, getManifestScope, isInstalled } = require("./utilities");

const PLATFORM = process.platform;
const MANIFEST_SCOPE = async () => getManifestScope(MANIFEST_PATHS, PLATFORM);
const MANIFEST_PATH = async () =>
	getManifestPath(APP.MANIFEST_PATHS, APP.PLATFORM, APP.MANIFEST_SCOPE);
const STATE = async () => isInstalled(MANIFEST_PATHS, PLATFORM, MANIFEST_SCOPE);
const APP = {
	NAME,
	STATE,
	PLATFORM,
	MANIFEST_PATH,
	MANIFEST_SCOPE,
	MANIFEST_PATHS,
	WINDOWS_REGISTRY_KEYS,
};

module.exports = {
	APP,
};
