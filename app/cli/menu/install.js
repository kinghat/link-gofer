const inquirer = require("inquirer");

const { BROWSERS } = require("../../lib/app-variables");

const staticMenu = ["Main Menu", "Quit"];
const dynamicMenu = [...BROWSERS];

module.exports = {
	install: () => {
		const questions = [
			{
				type: "list",
				name: "install",
				message: "Link Gofer is NOT installed. Would you like to install it?",
				choices: ["Install", "System Report", "Quit"],
				default: "Install",
			},
		];
		return inquirer.prompt(questions);
	},
};
