# How To Build A Chrome Extension (2021 Web Development)

https://www.youtube.com/watch?v=-dhMbVEreII

https://anobjectisa.medium.com/how-does-a-chrome-extension-work-web-development-6e85bd2bccc1

## 01. Start

We gave a:
* `foreground.js` script
  * Runs on the webpage you are currently in
* `background.js` script
  * Runs in the background page (hidden)
* `popup.html`
* `options.html`

These are specified in `manifest.json`.

```json
{
    "name": "obj ext",
    "description": "my ext",
    "version": "1.0",
    "manifest_version": 2,
    "icons": {
        "128": "./obj-icon-128x128.png"
    },
    "background": {
        "scripts": ["./background.js"]
    },
    "options_ui": {
        "page": "./options.html",
        "open_in_tab": true
    },
    "browser_action": {
        "default_popup": "popup.html"
    },
    "permissions": [
        "tabs",
        "https://www.google.com/*"
    ]
}
```

Note that: `"options_page": "./options.html"`  "This manifest key has been deprecated. Use options_ui instead."

We can view the background script by inspecting the browser extension at
[about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) in FireFox
or view background page in [chrome://extensions/](chrome://extensions/) in Chrome.

## 02. Injecting foreground.js

In `background.js`:
```js
chrome.tabs.executeScript(
  null,  // 1, 2, 3, ..., or null for current tab.
  {file: "./foreground.js"},
  () => console.log("I injected a foreground script")
);
```

You might get an error `Unchecked runtime.lastError: Cannot access a chrome:// URL`.

We added permission to google.com, but we still need to do a URL filter on the back-end script (for injecting).

> See [different methods for loading content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts#loading_content_scripts)

With code in `background.js`,

```js
console.log("from background script")

// When a tab is activated
chrome.tabs.onActivated.addListener(tab => {

  // Get tab info
  chrome.tabs.get(tab.tabId, tabInfo => {

    // Tab info (tabId, URL, faviconURL, selected, pinned, etc)
    console.log(tabInfo)
    console.log(/^https:\/\/www\.google.com/.test(tabInfo.url))

    // Inject a script into a webage if it matches a pattern
    if (/^https:\/\/www\.google.com/.test(tabInfo.url)){

      chrome.tabs.executeScript(
        null,  // 1, 2, 3, ..., or null for current tab.
        { file: "./foreground.js" },
        () => console.log("I injected a foreground script")
      );

    }

  });
});
```
We can inject code into the content for (only) specified URLs. The console log message will appear
in the background console, and on the actual visited website/tab.

Methods:
* `content_scripts` in `manifest.json`
  * Lazier
  * Injects to all webpages with matching URL pattern.
* `contentScripts` API
  * Similar to `content_scripts`
  * But allows you to register/unregister scripts at runtime.
* `executeScript()` in `background.js` (current method)
  * Allows you to inject/unregister JS at runtime
  * INTO SPECIFIC TABS
match a specific URL (not just the current one).


## 03. Injecting CSS

We can inject CSS just like with JS.

```js
chrome.tabs.insertCSS(
    null,
    { file: "./mystyles.css" },
    () => console.log("I injected a foreground CSS")
);
```

Webpages will be injected with CSS (as per `background.js`) and if permissions are also enabled
(as per `manifest.json`) it will run our CSS.

## 04. Options & Popup

Options and Popup are just HTML files.

We can use anchor tags to switch between pages.

We can use `target="_blank"` to open a page of the browser extension in a new tab.

## 05. Handling state / storing data

We need storage permissions in `manifest.json`.

For data storage, we have a choice between:
* `chrome.storage.sync`
  * Stores in your Chrome browser account
* `chrome.storage.local`
  * Stores only in the local browser

We will inject two buttons onto the page using our `foreground.js` script - and use it to set state.

## 06. Frontend & Backend communication

The second button we inject will shout a runtime message to the backend.

It can also send a response message back using `sendResponse`.

frontend.js
```js
second.addEventListener('click', e => {
  chrome.runtime.sendMessage({message: 'check_storage'}, res => console.log(res));
  console.log("I SENT THE MESSAGE");
});
```

backend.js
```js
// When a message event is recieved
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`Got message from sender to check local storage...`)
  if (request.message === 'check_storage') {
    chrome.storage.local.get("password", value => {
      console.log(value)
    });
    sendResponse({message: 'message_recieved'})
  }
});
```

## 07. Sending messages to a specific tab

We can also send arbitrary messsages to a specific tab:

```js
chrome.tabs.sendMessage(activeTabId, {message: 'arbitrary_message'})
```
```js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message)
});
```