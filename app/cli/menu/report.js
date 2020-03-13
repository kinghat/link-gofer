const { STATE, PLATFORM, MANIFEST_PATH, MANIFEST_SCOPE } = require("../../lib/app-variables").APP;

async function scaffoldSystemReportMenuQuestions(baseChoices) {
	const menuName = "System Report";
	const choices = [...baseChoices.filter((choice) => choice !== menuName)];
	const message = "Where would you like to go?";
	const questions = [
		{
			type: "list",
			name: "report",
			message,
			choices,
			default: "Main Menu",
		},
	];
	return questions;
}

async function printSystemReport() {
	const state = await STATE();

	console.log(`System Report: \nplatform: ${PLATFORM} \ninstalled: ${state} \nmanifest path: ${
		state ? await MANIFEST_PATH() : "Not Found"
	} \nmanifest scope: ${await MANIFEST_SCOPE()}
	`);
}

module.exports = {
	scaffoldSystemReportMenuQuestions,
	printSystemReport,
};
