const inquirer = require("inquirer");
// export const systemReport = () => {
// 	console.log(`SYSTEM REPORT:`);
// };

module.exports = {
	systemReport: () => {
		const questions = [
			{
				type: "list",
				name: "info",
				message: "Link Gofer is NOT installed. Would you like to install it?",
				choices: ["Install", "System Report", "Quit"],
				default: "Install",
			},
		];
		return inquirer.prompt(questions);
	},
	printSystemReport: () => {
		console.log(`System Report:
		${process.platform}
		`);
	},
};
