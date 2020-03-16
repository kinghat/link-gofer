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

const REGISTRY_SCOPES = {
	hives: { global: "HKLM", user: "HKCU" },
	paths: { global: "\\SOFTWARE", user: "\\Software" },
};

const MANIFEST_OBJECT = {
	name: NAME,
	description: DESCRIPTION,
	path: "",
	type: "stdio",
};

const BROWSER_DATA = [
	{
		browser: "firefox",
		win32: {
			aliases: ["Mozilla Firefox", "Firefox Developer Edition"],
			scope: {
				global: {
					hive: REGISTRY_SCOPES.hives.global,
					basePath: `${REGISTRY_SCOPES.paths.global}\\Mozilla`,
					keyPath: `\\NativeMessagingHosts\\${NAME}`,
					manifestPath: `C:\\global\\path\\to\\firefox\\${NAME}`,
					hostPath: ``,
				},
				user: {
					hive: REGISTRY_SCOPES.hives.user,
					basePath: `${REGISTRY_SCOPES.paths.user}\\Mozilla`,
					keyPath: `\\NativeMessagingHosts\\${NAME}`,
					manifestPath: `C:\\user\\path\\to\\firefox\\${NAME}`,
					hostPath: ``,
				},
			},
		},
		linux: {
			aliases: ["firefox", "firefox-beta", "firefox-developer"],
			scope: {
				global: {
					manifestPath: [
						`/usr/lib/mozilla/native-messaging-hosts/${NAME}`,
						`/usr/lib64/mozilla/native-messaging-hosts/${NAME}`,
					],
					hostPath: ``,
				},
				user: {
					manifestPath: `${homedir}/.mozilla/native-messaging-hosts/${NAME}`,
					hostPath: ``,
				},
			},
		},
		darwin: {
			aliases: [],
			scope: {
				global: {
					manifestPath: `/Library/Application Support/Mozilla/NativeMessagingHosts/${NAME}`,
					hostPath: ``,
				},
				user: {
					manifestPath: `${homedir}/Library/Application Support/Mozilla/NativeMessagingHosts/${NAME}`,
					hostPath: ``,
				},
			},
		},
	},
	{
		browser: "chrome",
		win32: {
			aliases: ["Chrome", "Chrome Beta", "Chrome Canary", "Brave", "Opera", "Vivaldi"],
			scope: {
				global: {
					hive: REGISTRY_SCOPES.hives.global,
					basePath: `${REGISTRY_SCOPES.paths.global}\\Google`,
					keyPath: `\\Chrome\\NativeMessagingHosts\\${NAME}`,
					manifestPath: `C:\\global\\path\\to\\chrome\\${NAME}`,
					hostPath: ``,
				},
				user: {
					hive: REGISTRY_SCOPES.hives.user,
					basePath: `${REGISTRY_SCOPES.paths.user}\\Google`,
					keyPath: `\\Chrome\\NativeMessagingHosts\\${NAME}`,
					manifestPath: `C:\\user\\path\\to\\chrome\\${NAME}`,
					hostPath: ``,
				},
			},
		},
		linux: {
			aliases: [
				"google-chrome-stable",
				"google-chrome-beta",
				"google-chrome-canary",
				"brave-browser-stable",
				"brave-browser-beta",
			],
			scope: {
				global: {
					manifestPath: `/etc/opt/chrome/native-messaging-hosts/${NAME}`,
					hostPath: ``,
				},
				user: {
					manifestPath: `${homedir}/.config/google-chrome/NativeMessagingHosts/${NAME}`,
					hostPath: ``,
				},
			},
		},
		darwin: {
			aliases: [],
			scope: {
				global: {
					manifestPath: `/Library/Google/Chrome/NativeMessagingHosts/${NAME}`,
					hostPath: ``,
				},
				user: {
					manifestPath: `${homedir}/Library/Application Support/Google/Chrome/NativeMessagingHosts/${NAME}`,
					hostPath: ``,
				},
			},
		},
	},
];

module.exports = {
	NAME,
	MANIFEST_PATHS,
	// WINDOWS_REGISTRY_KEYS,
	REGISTRY_SCOPES,
	MANIFEST_OBJECT,
	BROWSER_DATA,
};

// const WINDOWS_REGISTRY_KEYS = {
// 	global: {
// 		chrome: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Google\\Chrome\\NativeMessagingHosts\\${NAME}`,
// 		firefox: `HKEY_LOCAL_MACHINE\\SOFTWARE\\Mozilla\\NativeMessagingHosts\\${NAME}`,
// 	},
// 	user: {
// 		chrome: `HKEY_CURRENT_USER\\Software\\Google\\Chrome\\NativeMessagingHosts\\${NAME}`,
// 		firefox: `HKEY_CURRENT_USER\\Software\\Mozilla\\NativeMessagingHosts\\${NAME}`,
// 	},
// };

// const BROWSERS = [
// 	"Firefox Developer Edition",
// 	"Mozilla Firefox",
// 	"Chrome",
// 	"Chrome Beta",
// 	"Chrome Canary",
// 	"Brave",
// 	"Opera",
// 	"Vivaldi",
// ];
