const { homedir } = require("os");

const projectPkg = require("../../package.json");
const appPkg = require("../package.json");

const metaData = {
	MANIFEST_NAME: appPkg.name.replace(/-/g, "."),
	PROJECT_NAME: projectPkg.name,
	APP_NAME: appPkg.name,
	DESCRIPTION: appPkg.description,
};
const { MANIFEST_NAME, PROJECT_NAME, APP_NAME, DESCRIPTION } = metaData;
// const MANIFEST_NAME = appPkg.name.replace(/-/g, ".");
// const PROJECT_NAME = projectPkg.name;
// const APP_NAME = appPkg.name;
// const DESCRIPTION = appPkg.description;
const MANIFEST_PATHS = {
	darwin: {
		global: {
			chrome: `/Library/Google/Chrome/NativeMessagingHosts/${MANIFEST_NAME}`,
			firefox: `/Library/Application Support/Mozilla/NativeMessagingHosts/${MANIFEST_NAME}`,
		},
		user: {
			chrome: `${homedir}/Library/Application Support/Google/Chrome/NativeMessagingHosts/${MANIFEST_NAME}`,
			firefox: `${homedir}/Library/Application Support/Mozilla/NativeMessagingHosts/${MANIFEST_NAME}`,
		},
	},
	linux: {
		global: {
			chrome: `/etc/opt/chrome/native-messaging-hosts/${MANIFEST_NAME}`,
			firefox: `/usr/lib/mozilla/native-messaging-hosts/${MANIFEST_NAME}`,
		},
		user: {
			chrome: `${homedir}/.config/google-chrome/NativeMessagingHosts/${MANIFEST_NAME}`,
			firefox: `${homedir}/.mozilla/native-messaging-hosts/${MANIFEST_NAME}`,
		},
	},
	win32: {
		global: {
			chrome: `C:\\global\\path\\to\\chrome\\${MANIFEST_NAME}`,
			firefox: `C:\\path\\to\\firefox\\${MANIFEST_NAME}`,
		},
		user: {
			chrome: `C:\\user\\path\\to\\chrome\\${MANIFEST_NAME}`,
			firefox: `C:\\path\\to\\firefox\\${MANIFEST_NAME}`,
		},
	},
};
const REGISTRY_SCOPES = {
	hives: { global: "HKLM", user: "HKCU" },
	paths: { global: "\\SOFTWARE", user: "\\Software" },
};
const MANIFEST_OBJECT = {
	name: MANIFEST_NAME,
	description: DESCRIPTION,
	path: "",
	type: "stdio",
};
const BROWSER_DATA = [
	{
		browser: "firefox",
		allowed: {
			allowed_extensions: ["@link-gofer-app"],
		},
		win32: {
			aliases: ["Mozilla Firefox", "Firefox Developer Edition"],
			binaryExtension: ".exe",
			scope: {
				global: {
					hive: REGISTRY_SCOPES.hives.global,
					basePath: `${REGISTRY_SCOPES.paths.global}\\Mozilla`,
					keyPath: `\\NativeMessagingHosts\\${MANIFEST_NAME}`,
					manifestPath: `C:\\global\\path\\to\\firefox\\${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
				user: {
					hive: REGISTRY_SCOPES.hives.user,
					basePath: `${REGISTRY_SCOPES.paths.user}\\Mozilla`,
					keyPath: `\\NativeMessagingHosts\\${MANIFEST_NAME}`,
					manifestPath: `C:\\user\\path\\to\\firefox\\${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
			},
		},
		linux: {
			aliases: ["firefox", "firefox-beta", "firefox-developer"],
			scope: {
				global: {
					manifestPath: [
						`/usr/lib/mozilla/native-messaging-hosts/${MANIFEST_NAME}.json`,
						`/usr/lib64/mozilla/native-messaging-hosts/${MANIFEST_NAME}.json`,
					],
					binaryExtension: "",
					hostPath: `${APP_NAME}`,
				},
				user: {
					manifestPath: `${homedir}/.mozilla/native-messaging-hosts/${MANIFEST_NAME}.json`,
					hostPath: `${homedir}/.local/share`,
				},
			},
		},
		darwin: {
			aliases: [],
			binaryExtension: "",
			scope: {
				global: {
					manifestPath: `/Library/Application Support/Mozilla/NativeMessagingHosts/${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
				user: {
					manifestPath: `${homedir}/Library/Application Support/Mozilla/NativeMessagingHosts/${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
			},
		},
	},
	{
		browser: "chrome",
		allowed: {
			allowed_origins: ["chrome-extension://ffafcnflglpadgjpkagjihmpemgbpdin/"],
		},
		win32: {
			aliases: ["Chrome", "Chrome Beta", "Chrome Canary", "Brave", "Opera", "Vivaldi"],
			binaryExtension: ".exe",
			scope: {
				global: {
					hive: REGISTRY_SCOPES.hives.global,
					basePath: `${REGISTRY_SCOPES.paths.global}\\Google`,
					keyPath: `\\Chrome\\NativeMessagingHosts\\${MANIFEST_NAME}`,
					manifestPath: `C:\\global\\path\\to\\chrome\\${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
				user: {
					hive: REGISTRY_SCOPES.hives.user,
					basePath: `${REGISTRY_SCOPES.paths.user}\\Google`,
					keyPath: `\\Chrome\\NativeMessagingHosts\\${MANIFEST_NAME}`,
					manifestPath: `C:\\user\\path\\to\\chrome\\${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
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
			binaryExtension: "",
			scope: {
				global: {
					manifestPath: `/etc/opt/chrome/native-messaging-hosts/${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
				user: {
					manifestPath: `${homedir}/.config/google-chrome/NativeMessagingHosts/${MANIFEST_NAME}.json`,
					hostPath: `${homedir}/.local/share`,
				},
			},
		},
		darwin: {
			aliases: [],
			binaryExtension: "",
			scope: {
				global: {
					manifestPath: `/Library/Google/Chrome/NativeMessagingHosts/${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
				user: {
					manifestPath: `${homedir}/Library/Application Support/Google/Chrome/NativeMessagingHosts/${MANIFEST_NAME}.json`,
					hostPath: `${APP_NAME}`,
				},
			},
		},
	},
];

module.exports = {
	MANIFEST_PATHS,
	metaData,
	// WINDOWS_REGISTRY_KEYS,
	REGISTRY_SCOPES,
	MANIFEST_OBJECT,
	BROWSER_DATA,
	// refactor these to use the metaData object
	MANIFEST_NAME,
	PROJECT_NAME,
	APP_NAME,
	DESCRIPTION,
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
