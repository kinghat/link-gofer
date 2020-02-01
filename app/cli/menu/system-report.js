const inquirer = require("inquirer");

const {
	MANIFEST_LOCATIONS,
	PLATFORM,
	MANIFEST_SCOPE,
	getManifestPath,
} = require("../../installer/app-variables");
const { isInstalled } = require("../../installer/installer");

const systemReportMenu = () => {
	const questions = [
		{
			type: "list",
			name: "info",
			message: "Link Gofer is NOT installed. Would you like to install it?",
			choices: ["Install", "System Report", "Quit"],
			default: "Install",
		},
	];
	return inquirer.prompt(questions);
};

const printSystemReport = async () => {
	console.log(`System Report:
	platform: ${process.platform}
	installed: ${await isInstalled()}
	manifest path: ${
		(await isInstalled())
			? await getManifestPath(MANIFEST_LOCATIONS, PLATFORM, MANIFEST_SCOPE)
			: "Not Found"
	}
	manifest scope: ${await MANIFEST_SCOPE()}
	`);
};

module.exports = {
	systemReportMenu,
	printSystemReport,
};
