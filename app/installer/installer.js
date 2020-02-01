const {
	MANIFEST_LOCATIONS,
	PLATFORM,
	MANIFEST_SCOPE,
	getManifestPath,
	isManifestFile,
} = require("./app-variables");

const isInstalled = async () => {
	const manifestLocation = await getManifestPath(MANIFEST_LOCATIONS, PLATFORM, MANIFEST_SCOPE);

	return manifestLocation ? isManifestFile(manifestLocation) : false;
};

module.exports = {
	isInstalled,
};
