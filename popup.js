let linksToOpen = [
	"https://www.youtube.com/",
	"https://www.twitch.tv/",
	"https://www.instagram.com/",
	"https://x.com/home",
	"https://www.reddit.com/",
	"https://bilibili.com/",
	"https://www.linkedin.com/feed/",
];

// Saves the list of links to open to chrome storage
chrome.storage.local.set({ linksToOpen: linksToOpen }, function() {
	if (chrome.runtime.lastError) {
		console.error("Error saving lists:", chrome.runtime.lastError);
	} else {
		console.log("Lists saved successfully!");
	}
});

// Attaches event listener to add link button to add link to list of saved links to open
const addLinkButton = document.getElementById("add-link-button");
addLinkButton.addEventListener("click", () => {
  const url = document.getElementById("add-link").value;
  linksToOpen.push(url);
  chrome.storage.local.set({ linksToOpen: linksToOpen }, function() {
    if (chrome.runtime.lastError) {
      console.error("Error saving lists:", chrome.runtime.lastError);
    } else {
      console.log("Lists saved successfully!");
    }
  });
});

// Attaches event listener to open tabs button and opens all tabs
const openTabsButton = document.getElementById("open-multiple-tabs-button");
openTabsButton.addEventListener("click", () => {
  linksToOpen.forEach((url) => {
    chrome.tabs.create({ url: url });
  });
})

// Retrieves list of links from chrome storage and displays them
chrome.storage.local.get(["linksToOpen"], ({ linksToOpen }) => {
  if (chrome.runtime.lastError) {
		console.error("Error retrieving array:", chrome.runtime.lastError);
  } else {
      console.log("Displaying links:", linksToOpen);
      const tabsList = document.getElementById("tabs-list");
      linksToOpen.forEach((url) => {
      const listItem = document.createElement("li");
      const urlItem = document.createElement("a");
      urlItem.href = url;
      urlItem.textContent = url;
      urlItem.target = "_blank";
      listItem.appendChild(urlItem);
      tabsList.appendChild(listItem);
	  })
  }
});

