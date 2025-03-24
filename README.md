# YouTube Tutorial Companion

A Chrome extension that enhances YouTube tutorials by providing real-time assistance, automatic transcript analysis, and smart note-taking capabilities.

## Features

- 🎥 **Automatic Tutorial Detection**: Seamlessly integrates with YouTube tutorial videos
- 🤖 **Smart Assistance**: Detects when you might need help (e.g., frequent rewinding or long pauses)
- 💬 **Interactive Chat**: Ask questions about any part of the tutorial
- 🗣️ **Voice Support**: Optional voice interactions for hands-free learning
- 📝 **Smart Note-Taking**: Automatically saves important points to Google Docs
- 🎯 **Context-Aware**: Understands where you are in the video and provides relevant help

## Installation

### For Development

1. Clone this repository:
```bash
git clone https://github.com/yourusername/youtube-tutorial-companion.git
cd youtube-tutorial-companion
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

### For Users (Coming Soon)

- The extension will be available on the Chrome Web Store
- Simply click "Add to Chrome" to install

## Usage

1. **Watch a Tutorial**
   - Open any YouTube tutorial video
   - The companion icon will appear in the bottom right

2. **Get Help**
   - Click the companion icon to open the chat interface
   - Ask questions about the current section
   - The assistant will automatically offer help if it notices you're stuck

3. **Voice Assistance**
   - Toggle voice mode in the extension popup
   - Speak your questions naturally
   - Receive spoken responses

4. **Save Notes**
   - Click "Save Notes" to export to Google Docs
   - Notes include timestamps, questions, and key points

## Development

### Project Structure

```
youtube-tutorial-companion/
├── manifest.json        # Extension configuration
├── background.js       # Background service worker
├── content.js         # YouTube page integration
├── content.css       # Styles for YouTube integration
├── popup.html       # Extension popup UI
├── popup.js        # Popup functionality
├── popup.css      # Popup styles
└── assets/       # Icons and resources
```

### Key Components

1. **Content Script (`content.js`)**
   - Injects the companion UI into YouTube pages
   - Monitors video interactions
   - Handles user interactions with the companion

2. **Background Script (`background.js`)**
   - Manages extension state
   - Handles API communications
   - Processes messages between components

3. **Popup (`popup.html`, `popup.js`, `popup.css`)**
   - Provides user settings
   - Shows chat interface
   - Controls voice preferences

### API Integration Points

1. **YouTube Data API**
   - Transcript fetching
   - Video metadata
   - Playback state

2. **Google Docs API**
   - Note saving
   - Document creation
   - Content organization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy & Security

- Only activates on YouTube tutorial videos
- Requires minimal permissions
- No data collection outside of necessary functionality
- All processing happens locally when possible

## License

MIT License - see LICENSE file for details

## Support

- GitHub Issues: [Report a bug](https://github.com/yourusername/youtube-tutorial-companion/issues)
- Email: support@example.com
- Twitter: [@tutorialcompanion](https://twitter.com/tutorialcompanion)

## Roadmap

- [ ] AI-powered answer generation
- [ ] Multiple language support
- [ ] Custom note templates
- [ ] Tutorial progress tracking
- [ ] Community features
- [ ] Integration with learning platforms