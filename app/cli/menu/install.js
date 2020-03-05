const inquirer = require("inquirer");

const { BROWSERS } = require("../../lib/app-variables").APP;
const { baseMenu } = require("./menu");

const staticMenu = ["Main Menu", "System Report", "Quit"];
const dynamicMenu = async () => [...(await BROWSERS())];
const mainMenu = async () => [...(await dynamicMenu()), ...staticMenu];
const questions = [
	{
		type: "list",
		name: "install",
		message: "Link Gofer is NOT installed. Would you like to install it?",
		choices: mainMenu,
		default: "Install",
	},
];

async function installMenu() {
	// console.log(...(await BROWSERS()));
	return inquirer.prompt(questions);
}

module.exports = {
	installMenu,
};
