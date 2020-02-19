const inquirer = require("inquirer");

const { APP } = require("../../lib/app-variables");
const { install } = require("./install");
const { uninstall } = require("./uninstall");
const { printSystemReport } = require("./system-report");

const staticMenu = ["System Report", "Quit"];
const dynamicMenu = async () => [(await APP.STATE()) ? "Uninstall" : "Install", "TEST_ENTRY"];
const mainMenu = async () => [...(await dynamicMenu()), ...staticMenu];
const questions = [
	{
		type: "list",
		name: "main",
		message: "Choose your action",
		choices: mainMenu,
		default: "System Report",
	},
];

const menu = async () => {
	const { main } = await inquirer.prompt(questions);

	if (main === "System Report") await printSystemReport();
	if (main === "Install") install();
	if (main === "Uninstall") uninstall();
	return main !== "Quit" ? menu() : main;
};

module.exports = {
	menu,
};
