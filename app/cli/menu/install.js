const inquirer = require("inquirer");
// export const install = () => {
// 	console.log(`INSTALLED!`);
// };

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
