const inquirer = require("inquirer");

const { BROWSERS, PLATFORM } = require("../../lib/app-variables").APP;
const { install } = require("../../installer/install");
const { scaffoldMainMenuQuestions } = require("./main");
const { scaffoldInstallMenuQuestions } = require("./install");
const { scaffoldUninstallMenuQuestions } = require("./uninstall");
const { scaffoldSystemReportMenuQuestions, printSystemReport } = require("./report");

const baseChoices = ["System Report", "Main Menu", "Quit"];
const mainChoices = ["Install", "Uninstall", ...baseChoices];

async function rootMenu() {
	menuHandler(scaffoldMainMenuQuestions, baseChoices);
}

async function menuHandler(menuQuestions, baseChoices) {
	const choice = await inquirer.prompt(await menuQuestions(baseChoices));
	// console.log(`LOG: menuHandler -> choice`, choice);
	// console.log(await BROWSERS());
	// console.log(mainChoices.includes(await BROWSERS()));
	// if (!choice.includes(mainChoices)) return install(choice, PLATFORM);
	await menuChoiceHandler(choice);
}

async function menuChoiceHandler(choiceObject) {
	const choice = Object.values(choiceObject)[0];

	if (!mainChoices.includes(choice)) return install(choice, PLATFORM);
	if (choice === "Main Menu") return menuHandler(scaffoldMainMenuQuestions, baseChoices);
	if (choice === "Install") return menuHandler(scaffoldInstallMenuQuestions, baseChoices);
	if (choice === "Uninstall") return menuHandler(scaffoldUninstallMenuQuestions, baseChoices);
	if (choice === "System Report") {
		await printSystemReport();
		return menuHandler(scaffoldSystemReportMenuQuestions, baseChoices);
	}
	if (choice === "Quit") return choice;
}

module.exports = {
	rootMenu,
};
