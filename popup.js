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
  linksToOpen.forEach((link) => {
    chrome.tabs.create({ url: link });
  });
})

const tabsList = document.getElementById("tabs-list");
linksToOpen.forEach((link) => {
  const listItem = document.createElement("li");
  listItem.textContent = link;
  tabsList.appendChild(listItem);
});