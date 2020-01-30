const { homedir } = require("os");

const { getApplicationEnvironment } = require("./installer");

const APP_NAME = "link.gofer.json";
const PLATFORM = process.platform;
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
			chrome: `C:\\path\\to\\${APP_NAME}`,
			firefox: `C:\\path\\to\\${APP_NAME}`,
		},
		user: {
			chrome: `C:\\path\\to\\${APP_NAME}`,
			firefox: `C:\\path\\to\\${APP_NAME}`,
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
const ENVIRONMENT = getApplicationEnvironment(MANIFEST_LOCATIONS, PLATFORM);

module.exports = {
	APP_NAME,
	PLATFORM,
	ENVIRONMENT,
	MANIFEST_LOCATIONS,
	WINDOWS_REGISTRY_KEYS,
};
