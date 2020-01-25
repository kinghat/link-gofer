import browser from "webextension-polyfill";

document.addEventListener("auxclick", auxClickHandler);
document.addEventListener("click", clickHandler);

function auxClickHandler(event) {
	const link = getLink(event);

	if (link) {
		event.preventDefault();

		const message = {
			type: "link",
			data: link,
		};

		sendMessage(message);
	}
}

function clickHandler(event) {
	const link = getLink(event);

	if (event.ctrlKey && link) {
		event.preventDefault();

		const message = {
			type: "link",
			data: link,
		};

		sendMessage(message);
	}
}

function getLink(event) {
	const a = event.target.closest("a");

	if (!a || !a.href) return;

	return a.href;
}

function sendMessage(message) {
	browser.runtime.sendMessage(message);
	console.log(`Sent Message: ${message.data}`);
}
