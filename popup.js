let linksToOpen = [
	"https://www.youtube.com/",
	"https://www.twitch.tv/",
	"https://www.instagram.com/",
	"https://x.com/home",
	"https://www.reddit.com/",
	"https://bilibili.com/",
	"https://www.linkedin.com/feed/",
];

const openTabsButton = document.getElementById("open-multiple-tabs");
openTabsButton.addEventListener("click", () => {
  linksToOpen.forEach((url) => {
    chrome.tabs.create({ url: url });
  });
})

const tabsList = document.getElementById("tabs-list");
linksToOpen.forEach((url) => {
  const listItem = document.createElement("li");
  const urlItem = document.createElement("a");
  urlItem.href = url;
  urlItem.textContent = url;
  urlItem.target = "_blank";
  listItem.appendChild(urlItem);
  tabsList.appendChild(listItem);
});