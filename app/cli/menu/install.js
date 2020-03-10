const inquirer = require("inquirer");

const { systemReportMenu } = require("./system-report");
const { BROWSERS, NAME } = require("../../lib/app-variables").APP;
const { baseChoices, mainMenu } = require("./main-menu");

async function scaffoldMenu() {
	const browsers = await BROWSERS();
	const staticChoices = ["Main Menu", "System Report", "Quit"];
	const dynamicChoices = [...browsers];
	const choices = [...dynamicChoices, ...staticChoices];

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

async function installMenu() {
	const { install } = await inquirer.prompt(await scaffoldMenu());

	if (install === "Main Menu") return mainMenu();
	if (install === "System Report") systemReportMenu();
}

module.exports = {
	installMenu,
};
