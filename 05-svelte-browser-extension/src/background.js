//import browser from "webextension-polyfill";

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    alert("Hello");
  }
});
