const blockKeywordTextArea = document.getElementById("blockKeyword");
const blockUrlTextArea = document.getElementById("blockUrl");
const restoreButton = document.getElementById("restoreButton");
const submitButton = document.getElementById("submitButton");

setTextArea();

function setTextArea() {
  chrome.storage.sync.get((data) => {
    blockKeywordTextArea.value = data.keyword.join("\n");
    blockUrlTextArea.value = data.url.join("\n");
  });
}

restoreButton.addEventListener("click", () => {
  getBlockListFromJson();
});

submitButton.addEventListener("click", () => {
  saveToStorage();
});

function getBlockListFromJson() {
  fetch(chrome.extension.getURL("/blocklist.json"))
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.sync.set(data);
    })
    .then(() => {
      this.setTextArea();
    });
}

function saveToStorage() {
  data = {
    keyword: blockKeywordTextArea.value.split("\n"),
    url: blockUrlTextArea.value.split("\n"),
  };
  chrome.storage.sync.set(data);
}
