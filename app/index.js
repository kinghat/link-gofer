// #!/usr/local/bin/node

// const open = require("open");

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   let chunk;
//   // Use a loop to make sure we read all available data.
//   while ((chunk = process.stdin.read()) !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   };

//   console.log(chunk);
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });

process.stdin.on('readable', () => {
  var input = []
  var chunk
  while (chunk = process.stdin.read()) {
    input.push(chunk)
  }
  input = Buffer.concat(input)

  var msgLen = input.readUInt32LE(0)
  var dataLen = msgLen + 4

  if (input.length >= dataLen) {
    var content = input.slice(4, dataLen)
    var json = JSON.parse(content.toString())
    handleMessage(json)
  }
})

function sendMessage(msg) {
  var header = Buffer.alloc(4);
  header.writeUInt32LE(msg.length, 0);

  process.stdout.write(header);
  process.stdout.write(msg);
}

process.on('uncaughtException', (err) => {
  sendMessage({error: err.toString()})
})

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