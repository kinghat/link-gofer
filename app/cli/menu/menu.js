const inquirer = require("inquirer");

const { isInstalled } = require("../../installer/installer");
const { uninstall } = require("./uninstall");
const { printSystemReport } = require("./system-report");

const staticMenu = ["System Report", "Quit"];
const variableMenu = async () => [(await isInstalled()) ? "Uninstall" : "Install", "TEST_ENTRY"];
const mainMenu = async () => [...(await variableMenu()), ...staticMenu];
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
	return main !== "Quit" ? menu() : main;
};

module.exports = {
	menu,
};
