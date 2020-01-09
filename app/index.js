const { writeFile } = require("fs").promises;
const open = require("open");

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

process.stdin.on("readable", () => {
	let input = [];
	let chunk;
	while ((chunk = process.stdin.read())) {
		input.push(chunk);
	}
	input = Buffer.concat(input);

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

async function handleMessage(request) {
	if (request.link) {
		await openLink(request.link);
		sendMessage({ type: "success", message: `Successfully Opened ${request.link}` });
	}
}

async function openLink(link) {
	let options = {};
	if (["win32", "darwin"].includes(process.platform)) {
		options = {};
	} else {
		options = { app: "xdg-open" };
	}
	return await open(link, options);
}

async function writeMsg(msg) {
	await writeFile("log.txt", msg).catch((error) => console.log(error));
}

function sendMessage(msg) {
	const buffer = Buffer.from(JSON.stringify(msg));

	const header = Buffer.alloc(4);
	header.writeUInt32LE(buffer.length, 0);

	const data = Buffer.concat([header, buffer]);
	process.stdout.write(data);
}

process.on("uncaughtException", (err) => {
	sendMessage({ error: err.toString() });
});
