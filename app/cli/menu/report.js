const { STATE, PLATFORM, MANIFEST_PATH, MANIFEST_SCOPE } = require("../../lib/app-variables").APP;

async function scaffoldSystemReportMenuQuestions(baseChoices) {
	const menuName = "System Report";
	// baseChoices = [...new Set([...baseChoices, menuName])]
	const choices = [...baseChoices.filter((choice) => choice !== menuName)];
	// console.log(`LOG: scaffoldSystemReportMenuQuestions -> choices: `, choices);
	// const choices = [...baseChoices];
	// const message = "System Report";
	const message = await printSystemReport();
	const questions = [
		{
			type: "list",
			name: "report",
			message,
			choices,
			default: "Main Menu",
		},
	];
	// const report = await printSystemReport();
	// console.log(report);
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
