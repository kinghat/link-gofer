const { STATE } = require("../../lib/app-variables").APP;

async function scaffoldMainMenuQuestions(baseChoices) {
	const menuName = "Main Menu";
	const state = await STATE();
	const stateChoice = state ? "Uninstall" : "Install";
	const choices = [stateChoice, ...baseChoices.filter((choice) => choice !== menuName)];
	const message = state
		? "Link Gofer already installed. Would you like to uninstall it?"
		: "Link Gofer is NOT installed. Would you like to install it?";
	const questions = [
		{
			type: "list",
			name: "main",
			message,
			choices,
			default: stateChoice,
		},
	];
	return questions;
}

module.exports = {
	scaffoldMainMenuQuestions,
};
