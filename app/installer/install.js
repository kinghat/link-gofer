const { writeFile } = require("fs").promises;

const { BROWSERS, PLATFORM } = require("../lib/app-variables").APP;
const { BROWSER_DATA } = require("../lib/CONSTANTS");

async function writeManifest(path, manifestData) {
	await writeFile(path, manifestData).catch((error) => console.log(error));
}

async function writeApp(path, appData) {
	await writeFile(path, appData).catch((error) => console.log(error));
}

async function install(browser, PLATFORM) {
	const browserData = BROWSER_DATA.map((browserItem) => {
		if (browserItem[PLATFORM].aliases.some((browserName) => browserName === browser)) {
			return {
				browser: browserItem.browser,
				manifestPath: browserItem[PLATFORM].scope.user.manifestPath,
			};
		}
	});

	console.log(`LOG: install -> browserData: `, browserData);
}

async function installer(params) {}

module.exports = {
	install,
	installer,
};
