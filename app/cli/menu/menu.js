const inquirer = require("inquirer");
const { install } = require("./install");
const uninstall = require("./uninstall");
const { systemReport } = require("./system-report");

const mainMenu = ["Install", "Uninstall", "System Report"];
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
	const selection = await install();
	console.log(selection);
};

module.exports = {
	questions,
	// isInstalled: async () => {
	// 	const selection = await install();
	// 	console.log(selection);
	// },
	menu,
};
