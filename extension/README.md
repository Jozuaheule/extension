# Prompt Enhancer - Chrome Extension

A Chrome extension that enhances your prompt input experience with templates, history tracking, and intelligent suggestions.

## Features

- **Quick Templates**: Pre-built templates for common tasks like code reviews, bug fixes, feature requests, refactoring, and code explanations
- **Prompt History**: Automatically saves your recent prompts for easy reuse
- **Custom Templates**: Create and save your own prompt templates
- **Smart Enhancement**: Quick actions to improve clarity, add details, structure, and context to your prompts
- **Universal Integration**: Works on any text input field across all websites
- **Statistics Tracking**: Keep track of how many prompts you've used and saved

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top-right corner
3. Click "Load unpacked"
4. Select the `extension` folder from this project
5. The Prompt Enhancer icon should now appear in your extensions bar

## Usage

### Popup Interface

Click the extension icon in your browser toolbar to access:

- **Templates Tab**: Browse and use pre-built prompt templates
  - Code Review
  - Bug Fix
  - New Feature
  - Refactor Code
  - Explain Code

- **History Tab**: View and reuse your recent prompts (last 10 shown)

- **Custom Tab**: Create your own custom templates and manage history

### In-Page Enhancement

When you focus on any text input field on a webpage:

1. A floating enhancer button appears in the top-right corner of the input
2. Click the button to open the enhancement panel
3. Choose from:
   - **Quick Actions**: Improve Clarity, Add Details, Add Structure, Add Context
   - **Templates**: Insert pre-built templates directly into your input

## How It Works

- **Content Script**: Automatically detects text inputs and adds enhancement capabilities
- **Popup**: Provides a quick access interface for templates and history
- **Storage**: Uses Chrome's local storage to save your history, custom templates, and statistics

## Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- No tracking or analytics

## Tips

- Click any template to automatically copy it to your clipboard
- Use custom templates for frequently used prompts
- The history automatically saves prompts when you use templates
- Clear history anytime from the Custom tab

## Development

The extension consists of:

- `manifest.json` - Extension configuration
- `popup.html/js` - Extension popup interface
- `content.js/css` - In-page enhancement functionality
- `icons/` - Extension icons

## License

This extension is provided as-is for personal use.
