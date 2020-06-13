chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    clearAllStorage();
    getBlockListFromJson();
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (
      details.url.indexOf("q=") != -1 &&
      details.url.indexOf("as_eq=") == -1
    ) {
      chrome.storage.sync.get((data) => {
        let str = "&as_eq=";
        console.log(data);
        str += data.keyword.join("+");
        str += "+";
        str += data.url.join("+");

        chrome.tabs.update(details.tabId, {
          url: details.url + str,
        });
      });
    }
  },
  { urls: ["*://*/*"], types: ["main_frame", "sub_frame"] }
);

function clearAllStorage() {
  chrome.storage.sync.clear();
}

function getBlockListFromJson() {
  fetch(chrome.extension.getURL("/blocklist.json"))
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.sync.set(data);
    });
}
