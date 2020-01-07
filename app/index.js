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

	let msgLen = input.readUInt32LE(0);
	let dataLen = msgLen + 4;

	if (input.length >= dataLen) {
		let content = input.slice(4, dataLen);
		let json = JSON.parse(content.toString());
		handleMessage(json);
		writeMsg(JSON.stringify(json));
	}

	// writeMsg(input);
});

async function handleMessage(request) {
	if (request.link) {
		await openLink(request.link);
		sendMessage({ message: `opened ${request.link}` });
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
	let buffer = Buffer.from(JSON.stringify(msg));

	let header = Buffer.alloc(4);
	header.writeUInt32LE(buffer.length, 0);

	let data = Buffer.concat([header, buffer]);
	process.stdout.write(data);
}

process.on("uncaughtException", (err) => {
	sendMessage({ error: err.toString() });
});

// (async () => {
// Opens the image in the default image viewer and waits for the opened app to quit.
//  await open('unicorn.png', {wait: true});
//  console.log('The image viewer app quit');

// Opens the URL in the default browser.

// await opn('https://sindresorhus.com').catch(error => console.log(error));

// Opens the URL in a specified browser.

//  await open('https://sindresorhus.com', {app: 'firefox'});

// Specify app arguments.

// await opn('https://sindresorhus.com', {app: ['google-chrome', '--incognito']}).catch(error => console.log(error));

//     let opnOpts = {};
//     if (['win32', 'darwin'].includes(process.platform)) {
//       opnOpts = {};
//     } else {
//       opnOpts = {app: 'xdg-open'};
//     }
//     return open(`https://sindresorhus.com`, opnOpts);
// })();
