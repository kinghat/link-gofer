const inquirer = require("inquirer");

const { BROWSERS, Browser } = require("../../lib/app-variables").APP;
const { getBrowsers } = require("../../lib/utilities");
const { BROWSER_DATA } = require("../../lib/CONSTANTS");

async function scaffoldInstallMenuQuestions(baseChoices) {
	const menuName = "Install";
	const browsers = await getBrowsers(BROWSER_DATA);
	console.log(`LOG: scaffoldInstallMenuQuestions -> browsers: `, browsers);
	const choices = [
		...browsers,
		new inquirer.Separator(),
		...baseChoices.filter((choice) => choice !== menuName),
	];

	const message = browsers.length
		? `Which browser is the extension installed on?`
		: "Couldn't find any browsers.";
	const questions = [
		{
			type: "list",
			name: "install",
			message,
			choices,
			default: "Install",
		},
	];
	return questions;
}

module.exports = {
	scaffoldInstallMenuQuestions,
};
