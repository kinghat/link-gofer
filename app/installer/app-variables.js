const { homedir } = require("os");

const APP_NAME = "link.gofer.json";
const MANIFEST_LOCATIONS = {
	osx: {
		global: {
			chrome: [`/Library/Google/Chrome/NativeMessagingHosts/${APP_NAME}`],
			firefox: [],
		},
		user: {
			chrome: [
				`${homedir}/Library/Application Support/Google/Chrome/NativeMessagingHosts/${APP_NAME}`,
			],
			firefox: [],
		},
	},
	linux: {
		global: {
			chrome: [`/etc/opt/chrome/native-messaging-hosts/${APP_NAME}`],
			firefox: [],
		},
		user: {
			chrome: [`${homedir}/.config/google-chrome/NativeMessagingHosts/${APP_NAME}`],
			firefox: [],
		},
	},
	win32: {
		global: {
			chrome: [`C:\\path\\to\\${APP_NAME}`],
			firefox: [],
		},
		user: {
			chrome: [`C:\\path\\to\\${APP_NAME}`],
			firefox: [],
		},
	},
};

const WINDOWS_REGISTRY_KEYS = {
	global: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${APP_NAME}`,
	user: `HKEY_CURRENT_USER\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${APP_NAME}`,
};

module.exports = {
	APP_NAME,
	MANIFEST_LOCATIONS,
	WINDOWS_REGISTRY_KEYS,
};
