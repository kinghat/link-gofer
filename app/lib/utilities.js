// const { homedir } = require("os");
const { stat } = require("fs").promises;

const getManifestPath = async (MANIFEST_PATHS, PLATFORM, MANIFEST_SCOPE, browser = "chrome") => {
	const scope = await MANIFEST_SCOPE();

	return scope ? MANIFEST_PATHS[PLATFORM][scope][browser] : scope;
};

const getManifestScope = async (MANIFEST_PATHS, PLATFORM, browser = "chrome") => {
	for (const key in MANIFEST_PATHS[PLATFORM]) {
		if (await isManifestFile(MANIFEST_PATHS[PLATFORM][key][browser])) return key;
	}
};

async function getBrowsers(MANIFEST_PATHS, PLATFORM) {}

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
	isManifestFile,
	isGlobalScope,
	isInstalled,
};
