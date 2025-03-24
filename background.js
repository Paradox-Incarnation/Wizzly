// Background script for handling API calls and state management
let activeTab = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('youtube.com/watch')) {
    activeTab = tabId;
    chrome.tabs.sendMessage(tabId, {
      type: 'GET_TRANSCRIPT'
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'PROCESS_MESSAGE') {
    // Here we'll handle processing user messages
    // This will integrate with APIs and speech services
    console.log('Processing message:', request.message);
    sendResponse({ response: 'Message received' });
  }
});