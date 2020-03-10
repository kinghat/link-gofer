const inquirer = require("inquirer");

const { STATE } = require("../../lib/app-variables").APP;
const { installMenu } = require("./install");
const { uninstall } = require("./uninstall");
const { systemReportMenu } = require("./system-report");

const baseChoices = ["System Report", "Quit"];
async function scaffoldMenu() {
	const state = await STATE();
	const dynamicChoices = [state ? "Uninstall" : "Install"];
	const choices = [...dynamicChoices, ...baseChoices];
	const message = state
		? "Link Gofer already installed. Would you like to uninstall it?"
		: "Link Gofer is NOT installed. Would you like to install it?";
	const questions = [
		{
			type: "list",
			name: "main",
			message,
			choices,
			default: "System Report",
		},
	];
	return questions;
}

async function mainMenu() {
	const { main } = await inquirer.prompt(await scaffoldMenu());

	if (main === "System Report") return systemReportMenu();
	if (main === "Install") return installMenu();
	if (main === "Uninstall") uninstall();
	// if (main === "Quit") return main;
	// return main !== "Quit" ? menu() : main;
	return main !== "Quit" ? mainMenu() : main;
}

module.exports = {
	baseChoices,
	mainMenu,
};
