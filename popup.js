document.addEventListener('DOMContentLoaded', () => {
  const voiceToggle = document.getElementById('voiceToggle');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');
  const saveNotesButton = document.getElementById('saveNotes');
  const chatMessages = document.getElementById('chatMessages');

  // Load saved settings
  chrome.storage.sync.get(['voiceEnabled'], (result) => {
    voiceToggle.checked = result.voiceEnabled ?? false;
  });

  // Save voice preference
  voiceToggle.addEventListener('change', () => {
    chrome.storage.sync.set({ voiceEnabled: voiceToggle.checked });
  });

  // Handle sending messages
  const sendMessage = () => {
    const message = userInput.value.trim();
    if (message) {
      addMessage('You', message);
      // Send message to content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'USER_MESSAGE',
          message: message
        });
      });
      userInput.value = '';
    }
  };

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Save notes to Google Docs
  saveNotesButton.addEventListener('click', () => {
    // This will be implemented when Google Docs API is integrated
    console.log('Saving notes...');
  });

  function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.style.marginBottom = '8px';
    messageDiv.style.padding = '8px';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.backgroundColor = sender === 'You' ? '#f0f4fe' : '#f8f9fa';
    
    messageDiv.innerHTML = `
      <strong>${sender}:</strong>
      <div>${text}</div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});