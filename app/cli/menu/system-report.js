const inquirer = require("inquirer");

const { MANIFEST_LOCATIONS } = require("../../installer/app-variables");
const { menu } = require("./menu");
const {
	isManifestFile,
	staticManifestPathLookup,
	isInstalled,
	getApplicationEnvironment,
} = require("../../installer/installer");

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
	manifest location: ${
		(await isInstalled()) ? staticManifestPathLookup(MANIFEST_LOCATIONS) : "Not Found"
	}
	application environment: ${await getApplicationEnvironment(MANIFEST_LOCATIONS)}
	`);
};

module.exports = {
	systemReportMenu,
	printSystemReport,
};
