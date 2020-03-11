const inquirer = require("inquirer");

const { scaffoldMainMenuQuestions } = require("./main");
const { scaffoldInstallMenuQuestions } = require("./install");
const { scaffoldUninstallMenuQuestions } = require("./uninstall");
const { scaffoldSystemReportMenuQuestions, printSystemReport } = require("./system-report");

const baseChoices = ["System Report", "Quit"];
async function rootMenu() {
	mainMenu();
}

async function systemReportMenu() {
	await printSystemReport();
	const { report } = await inquirer.prompt(await scaffoldSystemReportMenuQuestions());
	if (report === "Main Menu") return mainMenu();
}

async function installMenu() {
	const { install } = await inquirer.prompt(await scaffoldInstallMenuQuestions(baseChoices));

	if (install === "Main Menu") return rootMenu();
	if (install === "System Report") systemReportMenu();
}

async function uninstallMenu() {
	const { install } = await inquirer.prompt(await scaffoldUninstallMenuQuestions());

	if (install === "Main Menu") return rootMenu();
	if (install === "System Report") systemReportMenu();
}

async function mainMenu() {
	const { main } = await inquirer.prompt(await scaffoldMainMenuQuestions());

	if (main === "System Report") return systemReportMenu();
	if (main === "Install") return installMenu();
	if (main === "Uninstall") return uninstallMenu();
	// if (main === "Quit") return main;
	// return main !== "Quit" ? menu() : main;
	// return main !== "Quit" ? mainMenu() : main;
	return main === "Quit" ? main : mainMenu();
}

module.exports = {
	rootMenu,
	baseChoices,
};
