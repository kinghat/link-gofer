const inquirer = require("inquirer");

const { STATE, PLATFORM, MANIFEST_PATH, MANIFEST_SCOPE } = require("../../lib/app-variables").APP;
const { menu } = require("./main-menu");

// const { isInstalled } = require("../../lib/utilities");

const baseChoices = ["Main Menu", "Quit"];
async function scaffoldMenu() {
	const choices = [...baseChoices];
	const message = "System Report";
	// const message = await printSystemReport();
	const questions = [
		{
			type: "list",
			name: "report",
			message,
			choices,
			default: "Main Menu",
		},
	];
	return questions;
}

async function printSystemReport() {
	const state = await STATE();

	console.log(`System Report: \nplatform: ${PLATFORM} \ninstalled: ${state} \nmanifest path: ${
		state ? await MANIFEST_PATH() : "Not Found"
	} \nmanifest scope: ${await MANIFEST_SCOPE()}
	`);
}

async function systemReportMenu() {
	await printSystemReport();
	const { report } = await inquirer.prompt(await scaffoldMenu());
	if (report === "Main Menu") return menu();
}

module.exports = {
	systemReportMenu,
};
