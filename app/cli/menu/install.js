const { BROWSERS } = require("../../lib/app-variables").APP;

async function scaffoldInstallMenuQuestions(baseChoices) {
	const browsers = await BROWSERS();
	const staticChoices = [...baseChoices];
	const dynamicChoices = [...browsers];
	const choices = [...dynamicChoices, ...staticChoices];

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
