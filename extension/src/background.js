import browser from "webextension-polyfill";

// const port = browser.runtime.connectNative("link.gofer");
const port = browser.runtime.connectNative("link.gofer");

port.onMessage.addListener((response) => {
	if (response.type === "success") {
		console.log(`Message Received: `, response.message);
	}
});

browser.runtime.onMessage.addListener((request, sender) => {
	if (request.type === "link") {
		console.log(`Message Received: `, request.data);
		const message = { link: request.data };
		sendNativeMessage(message);
	}
});

// https://github.com/mozilla/webextension-polyfill/issues/74#issuecomment-406289372
// browser.menus = browser.menus || browser.contextMenus;

// clear persisted context menus: https://stackoverflow.com/a/38204762/934239
// create the right click context menu item
// browser.contextMenus.removeAll();
// browser.contextMenus.create({
// 	id: "link-gofer",
// 	title: "Link Gofer",
// 	contexts: ["link"],
// });
// browser.contextMenus.onClicked.addListener((info, tab) => {
// 	console.log(`INFO: ${info}`);
// 	console.log(`Sending Message: ${info.linkUrl}`);
// 	port.postMessage({ link: info.linkUrl });
// });
// port.onDisconnect.addListener(() => {
// 	console.log(`Connection Closed: ${browser.runtime.lastError}`);
// });

browser.contextMenus.removeAll();
browser.contextMenus.create({
	id: "link-gofer",
	title: "Link Gofer",
	contexts: ["link"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
	const message = { link: info.linkUrl };

	console.log(`Link Clicked: ${message.link}`);

	sendNativeMessage(message);
});

function sendNativeMessage(message) {
	port.postMessage(message);
	console.log(`Sent Message: ${message.link}`);
}
