//import browser from "webextension-polyfill";

const key = "background";
chrome.storage.local.get(key).then((data) => {
  document.body.style = `background-color: ${data[key]}`;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Updating BGCOLOR!')
  if(request.message === 'update_bgcolor') {
    chrome.storage.local.get(key).then((data) => {
      document.body.style = `background-color: ${data[key]}`;
    });
  }
});

console.log('Extension Content Script Loaded!!!')