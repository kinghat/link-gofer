const { writeFile } = require("fs").promises;
// const { spawn } = require("child_process");

const { APP } = require("../lib/app-variables");

async function writeManifest(params) {
	await writeFile("log.txt", msg).catch((error) => console.log(error));
}

const install = () => {
	console.log("installed");
};

module.exports = {
	install,
};
