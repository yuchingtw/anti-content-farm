const searchTextBox = document.getElementsByClassName("gLFyf gsfi")[0];

chrome.storage.sync.get((data) => {
  data.keyword.forEach((x) => {
    searchTextBox.value = searchTextBox.value.replace(" -" + x, "");
  });
  data.url.forEach((x) => {
    searchTextBox.value = searchTextBox.value.replace(" -" + x, "");
  });
});
