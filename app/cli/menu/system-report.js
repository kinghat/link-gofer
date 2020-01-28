const inquirer = require("inquirer");

const { MANIFEST_LOCATIONS } = require("../../installer/app-variables");
const { isInstalled } = require("../../installer/installer");
const { menu } = require("./menu");

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
	installed: ${await isInstalled(MANIFEST_LOCATIONS.linux.user.chrome[0])}
	`);

	menu();
};

module.exports = {
	systemReportMenu,
	printSystemReport,
};
