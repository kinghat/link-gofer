const { homedir } = require("os");
const { stat } = require("fs").promises;

const getManifestPath = async (
	MANIFEST_LOCATION_OBJECT,
	PLATFORM,
	MANIFEST_SCOPE,
	browser = "chrome",
) => {
	const scope = await MANIFEST_SCOPE();

	return scope ? MANIFEST_LOCATION_OBJECT[PLATFORM][scope][browser] : scope;
};

const isManifestFile = async (STATIC_MANIFEST_PATH) => {
	console.log(`LOG: isManifestFile -> STATIC_MANIFEST_PATH: `, STATIC_MANIFEST_PATH);
	// if (!STATIC_MANIFEST_PATH) return false;
	const status = await stat(STATIC_MANIFEST_PATH).catch((error) => {
		if (error.code === "ENOENT") return false;
		// if (error.code === "ENOENT" || error.code === "ERR_INVALID_ARG_TYPE") return false;
		throw error;
	});

	if (!status || !status.isFile()) return false;

	return status.isFile();
};

const getManifestScope = async (MANIFEST_LOCATION_OBJECT, PLATFORM, browser = "chrome") => {
	for (const key in MANIFEST_LOCATION_OBJECT[PLATFORM]) {
		if (await isManifestFile(MANIFEST_LOCATION_OBJECT[PLATFORM][key][browser])) return key;
	}
};

const isGlobalScope = async () => {
	const scope = await MANIFEST_SCOPE();

	return scope === "global" ? true : scope === "user" ? false : scope;
};

const APP_NAME = "link.gofer.json";
const MANIFEST_LOCATIONS = {
	darwin: {
		global: {
			chrome: `/Library/Google/Chrome/NativeMessagingHosts/${APP_NAME}`,
			firefox: `/Library/Application Support/Mozilla/NativeMessagingHosts/${APP_NAME}`,
		},
		user: {
			chrome: `${homedir}/Library/Application Support/Google/Chrome/NativeMessagingHosts/${APP_NAME}`,
			firefox: `${homedir}/Library/Application Support/Mozilla/NativeMessagingHosts/${APP_NAME}`,
		},
	},
	linux: {
		global: {
			chrome: `/etc/opt/chrome/native-messaging-hosts/${APP_NAME}`,
			firefox: `/usr/lib/mozilla/native-messaging-hosts/${APP_NAME}`,
		},
		user: {
			chrome: `${homedir}/.config/google-chrome/NativeMessagingHosts/${APP_NAME}`,
			firefox: `${homedir}/.mozilla/native-messaging-hosts/${APP_NAME}`,
		},
	},
	win32: {
		global: {
			chrome: `C:\\global\\path\\to\\chrome\\${APP_NAME}`,
			firefox: `C:\\path\\to\\firefox\\${APP_NAME}`,
		},
		user: {
			chrome: `C:\\user\\path\\to\\chrome\\${APP_NAME}`,
			firefox: `C:\\path\\to\\firefox\\${APP_NAME}`,
		},
	},
};
const WINDOWS_REGISTRY_KEYS = {
	global: {
		chrome: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${APP_NAME}`,
		firefox: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Mozilla\\NativeMessagingHosts\\${APP_NAME}`,
	},
	user: {
		chrome: `HKEY_CURRENT_USER\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${APP_NAME}`,
		firefox: `HKEY_CURRENT_USER\\SOFTWARE\\Mozilla\\NativeMessagingHosts\\${APP_NAME}`,
	},
};
const PLATFORM = process.platform;
const MANIFEST_SCOPE = async () => getManifestScope(MANIFEST_LOCATIONS, PLATFORM);

module.exports = {
	APP_NAME,
	PLATFORM,
	MANIFEST_SCOPE,
	MANIFEST_LOCATIONS,
	WINDOWS_REGISTRY_KEYS,
	getManifestPath,
	isManifestFile,
};
