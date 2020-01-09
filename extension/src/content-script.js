import browser from "webextension-polyfill";

document.addEventListener("click", eventFilter);

function eventFilter(event) {
	const link = event.target.parentNode.href;
	if (event.ctrlKey && link) {
		event.preventDefault();
		const message = {
			type: "link",
			data: link,
		};
		sendMessage(message);
	}
}

function sendMessage(message) {
	browser.runtime.sendMessage(message);
	console.log(`Sent Message: ${message.data}`);
}
