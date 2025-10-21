// Attaches event listener to add link button to add link to list of saved links to open
const addLinkButton = document.getElementById("add-link-button");
addLinkButton.addEventListener("click", () => {
  const url = document.getElementById("add-link").value;
  chrome.storage.local.get(["linksToOpen"], ({ linksToOpen }) => {
    linksToOpen.push(url);
    chrome.storage.local.set({ linksToOpen: linksToOpen }, function () {
      if (chrome.runtime.lastError) {
        console.error("Error saving lists:", chrome.runtime.lastError);
      } else {
        console.log("Lists saved successfully!");
        const tabsList = document.getElementById("tabs-list");
        const listItem = createListItem(url);
        tabsList.appendChild(listItem);
      }
    });
  })
});

// Attaches event listener to open tabs button and opens all tabs
const openTabsButton = document.getElementById("open-multiple-tabs-button");
openTabsButton.addEventListener("click", () => {
  chrome.storage.local.get(["linksToOpen"], ({ linksToOpen }) => {
  linksToOpen.forEach((url) => {
    url = addHTTPSIfMissing(url);
    chrome.tabs.create({ url: url });
	});
  })
})

// Retrieves list of links from chrome storage and displays them
chrome.storage.local.get(["linksToOpen"], ({ linksToOpen }) => {
  if (chrome.runtime.lastError) {
		console.error("Error retrieving array:", chrome.runtime.lastError);
  } else {
    console.log("Displaying links:", linksToOpen);
    const tabsList = document.getElementById("tabs-list");
    linksToOpen.forEach((url) => {
      const listItem = createListItem(url);
      tabsList.appendChild(listItem);
	  })
  }
});


/**
 * Removes a given value from a list stored in chrome storage
 * @param {string} key The key of the list to remove the value from
 * @param {any} valueToRemove The value to remove from the list
 * @returns {Promise<void>} A promise that resolves once the value has been removed from the list
 */
async function removeFromList(key, valueToRemove) {
	const result = await chrome.storage.local.get(key);
	const list = result[key] || [];
	const updatedList = list.filter((item) => item !== valueToRemove);
	await chrome.storage.local.set({ [key]: updatedList });
}

function addHTTPSIfMissing(url) {
  if (!url.includes("https")) {
		url = "https://" + url;
  }
  return url;
}

function createListItem(url) {
  const listItem = document.createElement("li");
  const urlItem = document.createElement("a");
  const removeButton = document.createElement("button");
  urlItem.href = addHTTPSIfMissing(url);
  urlItem.textContent = url;
  urlItem.target = "_blank";
  listItem.appendChild(urlItem);
  removeButton.textContent = "X";
  removeButton.classList.add("remove-button");
  removeButton.addEventListener("click", () => {
		removeFromList("linksToOpen", url);
		listItem.remove();
  });
  listItem.appendChild(removeButton);
  return listItem;
}

