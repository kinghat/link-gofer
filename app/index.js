#!/home/kinghat/.nvm/versions/node/v13.6.0/bin/node
// #!/usr/bin/env node

const { writeFile, appendFile } = require("fs").promises;
const open = require("open");

const { APP } = require("./lib/app-variables");
const program = require("commander");
const pkg = require("./package.json");
const { menu } = require("./cli/menu/menu");

if (process.stdin.isTTY) {
	program.version(pkg.version);
	program.parse(process.argv);

	console.log(`Welcome to Link Gofer:`);

	menu().catch((error) => console.log(error));
}

if (!process.stdin.isTTY) {
	process.stdin.on("readable", () => {
		let input = [];
		let chunk;
		while ((chunk = process.stdin.read())) {
			input.push(chunk);
		}
		// console.log(`LOG: chunk: `, chunk);
		input = Buffer.concat(input);
		// console.log(`LOG: input: `, input.toString());

		const msgLen = input.readUInt32LE(0);
		const dataLen = msgLen + 4;

		if (input.length >= dataLen) {
			const content = input.slice(4, dataLen);
			const json = JSON.parse(content.toString());
			handleMessage(json);
			writeMsg(JSON.stringify(json));
		}

		// writeMsg(input);
	});
}

// process.stdin.on("readable", () => {
// 	let input = [];
// 	let chunk;
// 	while ((chunk = process.stdin.read())) {
// 		input.push(chunk);
// 	}
// 	// console.log(`LOG: chunk: `, chunk);
// 	input = Buffer.concat(input);
// 	// console.log(`LOG: input: `, input.toString());

// 	const msgLen = input.readUInt32LE(0);
// 	const dataLen = msgLen + 4;

// 	if (input.length >= dataLen) {
// 		const content = input.slice(4, dataLen);
// 		const json = JSON.parse(content.toString());
// 		handleMessage(json);
// 		writeMsg(JSON.stringify(json));
// 	}

// 	// writeMsg(input);
// });

async function handleMessage(request) {
	if (request.link) {
		await openLink(request.link).catch((error) =>
			sendMessage({ type: "error", message: `Error Opening: ${error.message}` }),
		);

		sendMessage({ type: "success", message: `successfully opened: ${request.link}` });
	}
}

async function openLink(link) {
	const options = {};

	if (APP.PLATFORM === "linux") options.app = "xdg-open";

	// APP.PLATFORM === "linux" ? (options.app = "xdg-open") : (options = {});

	// if (["win32", "darwin"].includes(APP.PLATFORM)) {
	// 	options = {};
	// } else {
	// 	options = { app: "xdg-open" };
	// }
	await open(link, options);
}

async function writeMsg(msg) {
	// await writeFile("log.txt", msg).catch((error) => console.log(error));
	const date = new Date().toISOString();
	await appendFile("log.txt", `[${date}]: ${msg} \n`).catch((error) => console.log(error));
}

function sendMessage(msg) {
	const buffer = Buffer.from(JSON.stringify(msg));

	const header = Buffer.alloc(4);
	header.writeUInt32LE(buffer.length, 0);

	const data = Buffer.concat([header, buffer]);
	process.stdout.write(data);
}

process.on("uncaughtException", (err) => {
	console.log(`LOG: err: `, err);
	sendMessage({ error: err.toString() });
});

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   let chunk;
//   let input = [];
//   // Use a loop to make sure we read all available data.
//   while ((chunk = process.stdin.read()) !== null) {
//     // process.stdout.write(`data: ${chunk}`);
//     input.push(chunk);
//   };

//   writeMsg(input.toString());

// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });
