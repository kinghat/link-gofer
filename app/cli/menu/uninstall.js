const inquirer = require("inquirer");
const { printSystemReport } = require("./system-report");
// export const uninstall = () => {
// 	console.log(`UNINSTALLED!`);
// };

module.exports = {
	uninstall: () => {
		const questions = [
			{
				type: "list",
				name: "uninstall",
				message: "Link Gofer is already installed. Would you like to uninstall it?",
				choices: ["Uninstall", "System Report", "Quit"],
				default: "Uninstall",
			},
		];
		return inquirer.prompt(questions);
	},
};
