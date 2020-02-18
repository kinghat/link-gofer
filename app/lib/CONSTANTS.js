const { homedir } = require("os");

const pkg = require("../package.json");

const NAME = pkg.name.replace(/-/g, ".");
const DESCRIPTION = pkg.description;
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

const MANIFEST_OBJECT = {
	name: NAME,
	description: DESCRIPTION,
	path: "this/is/a/dummy/path",
	type: "stdio",
};

module.exports = {
	NAME,
	MANIFEST_PATHS,
	WINDOWS_REGISTRY_KEYS,
	MANIFEST_OBJECT,
};
