const { BROWSERS } = require("../../lib/app-variables").APP;

async function scaffoldUninstallMenuQuestions(baseChoices) {
	const menuName = "Uninstall";
	const browsers = await BROWSERS();
	const staticChoices = [...baseChoices];
	const dynamicChoices = [...browsers];
	// const choices = [...dynamicChoices, ...staticChoices];
	const choices = [...browsers, ...baseChoices.filter((choice) => choice !== menuName)];

	const message = browsers.length
		? `Which browser is the extension installed on?`
		: "Couldn't find any browsers.";
	const questions = [
		{
			type: "list",
			name: "uninstall",
			message,
			choices,
			default: "Uninstall",
		},
	];
	return questions;
}

module.exports = {
	scaffoldUninstallMenuQuestions,
};

// const uninstallMenu = () => {
// 	const questions = [
// 		{
// 			type: "list",
// 			name: "uninstall",
// 			message: "Link Gofer is already installed. Would you like to uninstall it?",
// 			choices: ["Uninstall", "System Report", "Quit"],
// 			default: "Uninstall",
// 		},
// 	];
// 	return inquirer.prompt(questions);
// };
