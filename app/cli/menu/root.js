const inquirer = require("inquirer");

const { scaffoldMainMenuQuestions } = require("./main-menu");
const { scaffoldInstallMenuQuestions } = require("./install");
const { uninstall } = require("./uninstall");
const { scaffoldSystemReportMenuQuestions, printSystemReport } = require("./system-report");

const baseChoices = ["System Report", "Quit"];
async function rootMenu() {
	// console.log(`LOG: baseChoices`, baseChoices);
	mainMenu();
}

async function systemReportMenu() {
	await printSystemReport();
	const { report } = await inquirer.prompt(await scaffoldSystemReportMenuQuestions());
	if (report === "Main Menu") return mainMenu();
}

async function installMenu() {
	const { install } = await inquirer.prompt(await scaffoldInstallMenuQuestions());

	if (install === "Main Menu") return rootMenu();
	if (install === "System Report") systemReportMenu();
}

async function mainMenu() {
	const { main } = await inquirer.prompt(await scaffoldMainMenuQuestions());

	if (main === "System Report") return systemReportMenu();
	if (main === "Install") return installMenu();
	if (main === "Uninstall") uninstall();
	// if (main === "Quit") return main;
	// return main !== "Quit" ? menu() : main;
	return main !== "Quit" ? mainMenu() : main;
}

module.exports = {
	rootMenu,
	baseChoices,
};
