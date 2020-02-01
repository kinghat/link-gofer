const { homedir } = require("os");
const { getManifestPath, getManifestScope, isInstalled } = require("../lib/utilities");

const NAME = "link.gofer.json";
const MANIFEST_PATHS = {
	darwin: {
		global: {
			chrome: `/Library/Google/Chrome/NativeMessagingHosts/${NAME}`,
			firefox: `/Library/Application Support/Mozilla/NativeMessagingHosts/${NAME}`,
		},
		user: {
			chrome: `${homedir}/Library/Application Support/Google/Chrome/NativeMessagingHosts/${NAME}`,
			firefox: `${homedir}/Library/Application Support/Mozilla/NativeMessagingHosts/${NAME}`,
		},
	},
	linux: {
		global: {
			chrome: `/etc/opt/chrome/native-messaging-hosts/${NAME}`,
			firefox: `/usr/lib/mozilla/native-messaging-hosts/${NAME}`,
		},
		user: {
			chrome: `${homedir}/.config/google-chrome/NativeMessagingHosts/${NAME}`,
			firefox: `${homedir}/.mozilla/native-messaging-hosts/${NAME}`,
		},
	},
	win32: {
		global: {
			chrome: `C:\\global\\path\\to\\chrome\\${NAME}`,
			firefox: `C:\\path\\to\\firefox\\${NAME}`,
		},
		user: {
			chrome: `C:\\user\\path\\to\\chrome\\${NAME}`,
			firefox: `C:\\path\\to\\firefox\\${NAME}`,
		},
	},
};
const WINDOWS_REGISTRY_KEYS = {
	global: {
		chrome: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${NAME}`,
		firefox: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Mozilla\\NativeMessagingHosts\\${NAME}`,
	},
	user: {
		chrome: `HKEY_CURRENT_USER\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${NAME}`,
		firefox: `HKEY_CURRENT_USER\\SOFTWARE\\Mozilla\\NativeMessagingHosts\\${NAME}`,
	},
};
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
	NAME,
	PLATFORM,
	MANIFEST_SCOPE,
	MANIFEST_PATHS,
	WINDOWS_REGISTRY_KEYS,
};
