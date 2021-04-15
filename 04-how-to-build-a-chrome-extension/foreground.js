console.log("from foreground script")

// Define buttons
const first = document.createElement('button')
first.innerText = "SET DATA";
first.id = "first";

const second = document.createElement('button')
second.innerText = "SHOUT TO BACKEND";
second.id = "second";

// Add to DOM
document.body.appendChild(first);
document.body.appendChild(second);

// Add click listeners
first.addEventListener('click', e => {
  chrome.storage.local.set({password: "123"});
  console.log("I SET DATA")
});

second.addEventListener('click', e => {
  chrome.runtime.sendMessage({message: 'check_storage'}, res => console.log(res));
  console.log("I SENT THE MESSAGE");
});

// Listen to arbitrary messages to specific tab
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message)
});