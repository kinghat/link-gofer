const { STATE } = require("../../lib/app-variables").APP;

async function scaffoldMainMenuQuestions(baseChoices) {
	const state = await STATE();
	const dynamicChoices = [state ? "Uninstall" : "Install"];
	const choices = [...dynamicChoices, ...baseChoices];
	const message = state
		? "Link Gofer already installed. Would you like to uninstall it?"
		: "Link Gofer is NOT installed. Would you like to install it?";
	const questions = [
		{
			type: "list",
			name: "main",
			message,
			choices,
			default: "System Report",
		},
	];
	return questions;
}

module.exports = {
	scaffoldMainMenuQuestions,
};
