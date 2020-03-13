const inquirer = require("inquirer");

const { BROWSERS } = require("../../lib/app-variables").APP;

async function scaffoldInstallMenuQuestions(baseChoices) {
	const menuName = "Install";
	const browsers = await BROWSERS();
	const choices = [
		...browsers,
		new inquirer.Separator(),
		...baseChoices.filter((choice) => choice !== menuName),
	];

	const message = browsers.length
		? `Which browser is the extension installed on?`
		: "Couldn't find any browsers.";
	const questions = [
		{
			type: "list",
			name: "install",
			message,
			choices,
			default: "Install",
		},
	];
	return questions;
}

module.exports = {
	scaffoldInstallMenuQuestions,
};
