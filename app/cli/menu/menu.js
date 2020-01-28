const inquirer = require("inquirer");

const { install } = require("./install");
const { isInstalled } = require("../../installer/app-variables");
const { uninstall } = require("./uninstall");
const { systemReport, printSystemReport } = require("./system-report");

const mainMenu = ["Install", "Uninstall", "System Report", "Quit"];
const questions = [
	{
		type: "list",
		name: "main",
		message: "Choose your action",
		choices: mainMenu,
		default: "System Report",
	},
];

// inquirer
// 	.prompt(questions)
// 	.then((answers) => console.log(JSON.stringify(answers)))
// 	.catch((error) => console.log(error));

const menu = async () => {
	console.log(`Welcome to Link Gofer:`);

	// const selection = await install();
	// const selection = await uninstall();
	// console.log(selection);
	// if (selection.uninstall === "System Report") printSystemReport();
	const { main } = await inquirer.prompt(questions);
	// console.log(`LOG: menu -> selection: `, main);
	return main !== "Quit" ? menu() : main;
};

module.exports = {
	questions,
	// isInstalled: async () => {
	// 	const selection = await install();
	// 	console.log(selection);
	// },
	menu,
};
