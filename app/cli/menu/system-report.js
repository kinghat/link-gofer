// const inquirer = require("inquirer");

const { APP } = require("../../lib/app-variables");
// const { isInstalled } = require("../../lib/utilities");

const printSystemReport = async () => {
	const state = await APP.STATE();

	console.log(`System Report:
	platform: ${APP.PLATFORM}
	installed: ${state}
	manifest path: ${state ? await APP.MANIFEST_PATH() : "Not Found"}
	manifest scope: ${await APP.MANIFEST_SCOPE()}
	`);
};

module.exports = {
	// systemReportMenu,
	printSystemReport,
};

// const systemReportMenu = () => {
// 	const questions = [
// 		{
// 			type: "list",
// 			name: "info",
// 			message: "Link Gofer is NOT installed. Would you like to install it?",
// 			choices: ["Install", "System Report", "Quit"],
// 			default: "Install",
// 		},
// 	];
// 	return inquirer.prompt(questions);
// };
