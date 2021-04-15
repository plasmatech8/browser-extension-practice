console.log("from background script")

// When tab is completed loading, inject code
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(changeInfo.status === "complete") {

    // Tab info (tabId, URL, faviconURL, selected, pinned, etc)
    console.log(tab)

    // Inject JS & CSS into a webage if it matches a pattern
    if (/^https:\/\/www\.google.com/.test(tab.url)) {
      // 1, 2, 3, ..., or null for current tab.
      chrome.tabs.executeScript(
        null, { file: "./foreground.js" },
        () => console.log("I injected a foreground script")
      );
      chrome.tabs.insertCSS(
        null, { file: "./mystyles.css" },
        () => console.log("I injected a foreground CSS")
      );
    }


  }
})

// When a tab is activated
let activeTab = 0;
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {

    // Send an arbitrary message to the specific tab
    if (/^https:\/\/www\.google.com/.test(tab.url)) {
      activeTabId = activeInfo.tabId
      chrome.tabs.sendMessage(activeTabId, {message: 'arbitrary_message'})
    }

  });
});

// When a message event is recieved
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`Got message from sender to check local storage...`)
  if (request.message === 'check_storage') {
    chrome.storage.local.get("password", value => {
      console.log(value)
    });
    sendResponse({
      message: 'message_recieved'
    })
  }
});
