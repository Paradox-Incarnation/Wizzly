class Wizzly {
  constructor() {
    this.transcript = null;
    this.currentTime = 0;
    this.rewindCount = 0;
    this.lastPauseTime = 0;
    this.chatVisible = false;
    
    this.initialize();
  }

  initialize() {
    this.injectUI();
    this.setupVideoEventListeners();
    this.setupMessageListeners();
  }

  injectUI() {
    const chatHTML = `
      <div id="wizzly-container" class="wizzly-container hidden">
        <div class="wizzly-header">
          <h2>Wizzly</h2>
          <div class="wizzly-header-actions">
            <button class="wizzly-header-button" id="wizzly-export">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M3 17v.01M7 17v.01M11 17v.01M15 17v.01M19 17v.01M3 21v.01M7 21v.01M11 21v.01M15 21v.01M19 21v.01"></path>
              </svg>
            </button>
            <button class="wizzly-header-button" id="wizzly-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="wizzly-messages"></div>
        <div class="wizzly-input">
          <textarea placeholder="Ask anything about the tutorial..." rows="1"></textarea>
          <button class="wizzly-send-button" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </div>
      </div>
      <button id="wizzly-toggle" class="wizzly-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </button>
    `;

    const container = document.createElement('div');
    container.innerHTML = chatHTML;
    document.body.appendChild(container);

    this.setupEventListeners();
  }

  setupEventListeners() {
    const toggle = document.getElementById('wizzly-toggle');
    const container = document.getElementById('wizzly-container');
    const closeBtn = document.getElementById('wizzly-close');
    const exportBtn = document.getElementById('wizzly-export');
    const textarea = container.querySelector('textarea');
    const sendBtn = container.querySelector('.wizzly-send-button');

    toggle.addEventListener('click', () => {
      container.classList.toggle('hidden');
      this.chatVisible = !container.classList.contains('hidden');
    });

    closeBtn.addEventListener('click', () => {
      container.classList.add('hidden');
      this.chatVisible = false;
    });

    exportBtn.addEventListener('click', () => {
      // Handle export to Google Docs
      console.log('Exporting to Google Docs...');
    });

    const sendMessage = () => {
      const message = textarea.value.trim();
      if (message) {
        this.handleUserMessage(message);
        textarea.value = '';
        textarea.style.height = 'auto';
        sendBtn.disabled = true;
      }
    };

    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      sendBtn.disabled = !textarea.value.trim();
    });

    sendBtn.addEventListener('click', sendMessage);
    textarea.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  setupVideoEventListeners() {
    const video = document.querySelector('video');
    if (!video) return;

    video.addEventListener('pause', () => {
      this.lastPauseTime = video.currentTime;
      this.checkIfUserNeedsHelp();
    });

    video.addEventListener('timeupdate', () => {
      if (this.currentTime > video.currentTime) {
        this.rewindCount++;
        this.checkIfUserNeedsHelp();
      }
      this.currentTime = video.currentTime;
    });
  }

  setupMessageListeners() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'GET_TRANSCRIPT') {
        this.fetchTranscript();
      }
    });
  }

  async fetchTranscript() {
    // Implementation for fetching transcript will go here
    console.log('Fetching transcript...');
  }

  checkIfUserNeedsHelp() {
    if (this.rewindCount >= 2 || (Date.now() - this.lastPauseTime > 10000)) {
      this.suggestHelp();
    }
  }

  suggestHelp() {
    if (!this.chatVisible) {
      const container = document.getElementById('wizzly-container');
      container.classList.remove('hidden');
      this.chatVisible = true;
      
      this.addMessage('assistant', 'Looks like you might need help with this part. What can I explain?');
    }
  }

  handleUserMessage(message) {
    this.addMessage('user', message);
    
    // Send message to background script for processing
    chrome.runtime.sendMessage({
      type: 'PROCESS_MESSAGE',
      message: message
    }, response => {
      // Handle response from background script
      setTimeout(() => {
        this.addMessage('assistant', `I received your message: "${message}"`);
      }, 500);
    });
  }

  addMessage(sender, text) {
    const messagesContainer = document.querySelector('.wizzly-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Initialize Wizzly when the page loads
window.addEventListener('load', () => {
  new Wizzly();
});