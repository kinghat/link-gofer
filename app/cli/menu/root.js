const inquirer = require("inquirer");

const { scaffoldMainMenuQuestions } = require("./main");
const { scaffoldInstallMenuQuestions } = require("./install");
const { scaffoldUninstallMenuQuestions } = require("./uninstall");
const { scaffoldSystemReportMenuQuestions, printSystemReport } = require("./report");

const baseChoices = ["System Report", "Main Menu", "Quit"];
const menus = ["Install", "Uninstall", "System Report", "Main Menu", "Quit"];

async function rootMenu() {
	menuHandler(scaffoldMainMenuQuestions, baseChoices);
}

async function menuHandler(menuQuestions, baseChoices) {
	const choice = await inquirer.prompt(await menuQuestions(baseChoices));

	menuChoiceHandler(choice);
}

function menuChoiceHandler(choiceObject) {
	const choice = Object.values(choiceObject)[0];

	if (choice === "Main Menu") return menuHandler(scaffoldMainMenuQuestions, baseChoices);
	if (choice === "Install") return menuHandler(scaffoldInstallMenuQuestions, baseChoices);
	if (choice === "Uninstall") return menuHandler(scaffoldUninstallMenuQuestions, baseChoices);
	if (choice === "System Report")
		return menuHandler(scaffoldSystemReportMenuQuestions, baseChoices);
	if (choice === "Quit") return choice;
}

async function systemReportMenu() {
	await printSystemReport();
	const questions = await scaffoldSystemReportMenuQuestions(baseChoices);
	// console.log(`LOG: systemReportMenu -> questions: `, questions);
	const choice = await inquirer.prompt(questions);
	// const choice = await inquirer.prompt(await scaffoldSystemReportMenuQuestions(baseChoices));

	menuChoiceHandler(choice);
}

async function installMenu() {
	const choice = await inquirer.prompt(await scaffoldInstallMenuQuestions(baseChoices));

	menuChoiceHandler(choice);
}

async function uninstallMenu() {
	const choice = await inquirer.prompt(await scaffoldUninstallMenuQuestions(baseChoices));

	menuChoiceHandler(choice);
}

async function mainMenu() {
	const choice = await inquirer.prompt(await scaffoldMainMenuQuestions(baseChoices));

	menuChoiceHandler(choice);
}

// function menuChoiceHandler(choiceObject) {
// 	const choice = Object.values(choiceObject)[0];

// 	if (choice === "Main Menu") return mainMenu();
// 	if (choice === "Install") return installMenu();
// 	if (choice === "Uninstall") return uninstallMenu();
// 	if (choice === "System Report") return systemReportMenu();
// 	if (choice === "Quit") return choice;
// }

module.exports = {
	rootMenu,
};
