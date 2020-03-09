const inquirer = require("inquirer");

const { STATE } = require("../../lib/app-variables").APP;
const { installMenu } = require("./install");
const { uninstall } = require("./uninstall");
const { systemReportMenu } = require("./system-report");

const baseMenu = ["System Report", "Quit"];
async function scaffoldMenu() {
	const state = await STATE();
	const dynamicMenu = [state ? "Uninstall" : "Install"];
	const mainMenu = [...dynamicMenu, ...baseMenu];
	const message = state
		? "Link Gofer already installed. Would you like to uninstall it?"
		: "Link Gofer is NOT installed. Would you like to install it?";
	const questions = [
		{
			type: "list",
			name: "main",
			message,
			choices: mainMenu,
			default: "System Report",
		},
	];
	return questions;
}

async function menu() {
	const { main } = await inquirer.prompt(await scaffoldMenu());
	// console.log(`LOG: menu -> main`, main);

	if (main === "System Report") return systemReportMenu();
	if (main === "Install") return installMenu();
	if (main === "Uninstall") uninstall();
	// if (main === "Quit") return main;
	// return main !== "Quit" ? menu() : main;
	return main !== "Quit" ? menu() : main;
}

module.exports = {
	baseMenu,
	menu,
};
