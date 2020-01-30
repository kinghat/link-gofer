const { stat } = require("fs").promises;

const { MANIFEST_LOCATIONS } = require("./app-variables");

const staticManifestPathLookup = (MANIFEST_LOCATION_OBJECT) => {
	const platform = process.platform;
	const environment = "user";
	const browser = "chrome";
	return MANIFEST_LOCATION_OBJECT[platform][environment][browser];
};
const isManifestFile = async (STATIC_MANIFEST_PATH) => {
	const status = await stat(STATIC_MANIFEST_PATH).catch((error) => {
		if (error.code !== "ENOENT") throw error;
		return false;
	});

	if (!status || !status.isFile()) return false;

	return status.isFile();
};
const isInstalled = async () => {
	const manifestLocation = staticManifestPathLookup(MANIFEST_LOCATIONS);
	// console.log(`LOG: isInstalled -> isManifestFile: `, await isManifestFile(manifestLocation));
	return isManifestFile(manifestLocation);
};
const getApplicationEnvironment = async (
	MANIFEST_LOCATION_OBJECT,
	PLATFORM,
	browser = "chrome",
) => {
	for (const key in MANIFEST_LOCATION_OBJECT[PLATFORM]) {
		if (isManifestFile(MANIFEST_LOCATION_OBJECT[PLATFORM][key][browser])) return key;
	}
};
module.exports = {
	isManifestFile,
	staticManifestPathLookup,
	isInstalled,
	getApplicationEnvironment,
};
