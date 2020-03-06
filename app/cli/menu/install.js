const inquirer = require("inquirer");

const { printSystemReport } = require("./system-report");
const { BROWSERS, NAME } = require("../../lib/app-variables").APP;
const { baseMenu, menu } = require("./menu");

async function scaffoldMenu() {
	const browsers = await BROWSERS();
	const staticMenu = ["Main Menu", "System Report", "Quit"];
	const dynamicMenu = [...browsers];
	const mainMenu = [...dynamicMenu, ...staticMenu];

	const message = browsers.length
		? `Which browser is the extension installed on?`
		: "Couldn't find any browsers.";
	const questions = [
		{
			type: "list",
			name: "install",
			message,
			choices: mainMenu,
			default: "Install",
		},
	];
	return questions;
}

async function installMenu() {
	const { install } = await inquirer.prompt(await scaffoldMenu());

	if (install === "Main Menu") return menu();
	if (install === "System Report") printSystemReport();
}

module.exports = {
	installMenu,
};
