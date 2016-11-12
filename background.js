"use strict";

// Note: chrome.runtime.onMessage only receive message from *this* erxtension
chrome.runtime.onMessage.addListener(
  function(selectionStatus, sender, sendResponse) {
    var statusDisplay = selectionStatusDisplay(selectionStatus)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      var activeTab = tabs[0]
      chrome.browserAction.setBadgeText({text: statusDisplay.badgeText, tabId: activeTab.id});
      chrome.browserAction.setBadgeBackgroundColor({color: statusDisplay.badgeColor, tabId: activeTab.id});
      chrome.browserAction.setIcon({path: statusDisplay.statusIcon, tabId: activeTab.id});
    });
  }
);
