// import browser from "webextension-polyfill";

// const port = browser.runtime.connectNative("link.gofer");
const port = chrome.runtime.connectNative("link.gofer");

port.onMessage.addListener((response) => {
	console.log(`Message Received: ${response}`);
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

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
	id: "link-gofer",
	title: "Link Gofer",
	contexts: ["link"],
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
	console.log(`INFO: `, info);
	console.log(`Sending Message: ${info.linkUrl}`);
	port.postMessage({ link: info.linkUrl });
});