# Prompt Enhancer Chrome Extension

A powerful Chrome extension that enhances your prompt writing experience across any website.

## Quick Start

### Install the Extension

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Toggle "Developer mode" ON (top-right corner)
4. Click "Load unpacked" button
5. Select the `/extension` folder from this project
6. Done! The extension is now active

## Features Overview

### 1. Popup Interface (Click Extension Icon)

**Templates Tab**
- 5 pre-built professional templates:
  - Code Review - Request thorough code analysis
  - Bug Fix - Structured bug reporting
  - New Feature - Feature planning template
  - Refactor Code - Code improvement requests
  - Explain Code - Get detailed code explanations
- Click any template to copy it to clipboard
- Real-time statistics: prompts used & templates saved

**History Tab**
- Automatically saves your last 50 prompts
- Quick access to recent prompts
- Click to copy any historical prompt

**Custom Tab**
- Create your own reusable templates
- Save templates with custom names
- Clear history when needed

### 2. In-Page Enhancement (On Any Text Input)

When you focus on a text input field:
- A floating purple button appears
- Click it to access enhancement tools

**Quick Actions:**
- Improve Clarity - Restructure for better understanding
- Add Details - Add contextual placeholders
- Add Structure - Add requirements and expected outcomes
- Add Context - Add background and goals

**Template Insertion:**
- Insert full templates directly into the input field
- No need to switch tabs or copy/paste

## Usage Examples

### Using Templates via Popup

1. Click the extension icon
2. Click "Code Review" template
3. Template is copied to clipboard
4. Paste into any text field (Ctrl/Cmd + V)

### Using In-Page Enhancement

1. Click on any textarea or text input
2. Click the purple floating button
3. Select "Add Structure"
4. Your prompt is enhanced with structured formatting

### Creating Custom Templates

1. Click extension icon
2. Go to "Custom" tab
3. Enter template name (e.g., "API Documentation")
4. Write your template content
5. Click "Save Template"
6. Use it anytime from the Templates dropdown

## Features in Detail

### Smart History Management
- Automatically saves prompts when you use templates
- Stores up to 50 recent prompts
- Displays 10 most recent in History tab
- Click any prompt to reuse it

### Universal Compatibility
- Works on all websites
- Detects textareas, text inputs, and contenteditable elements
- Responsive positioning based on input field location

### Privacy First
- All data stored locally in your browser
- No external servers or tracking
- No data collection whatsoever
- Complete privacy guaranteed

## Technical Details

**Extension Structure:**
```
extension/
├── manifest.json       # Extension configuration
├── popup.html         # Popup interface
├── popup.js           # Popup functionality
├── content.js         # In-page enhancements
├── content.css        # Styling for in-page UI
├── icons/             # Extension icons
└── README.md          # Detailed documentation
```

**Technologies Used:**
- Manifest V3 (latest Chrome extension format)
- Vanilla JavaScript (no dependencies)
- Chrome Storage API
- Content Scripts for page integration

## Tips & Best Practices

1. **Use Templates as Starting Points**: Modify templates to fit your specific needs
2. **Create Domain-Specific Templates**: Save templates for your most common tasks
3. **Leverage History**: Review past prompts to improve future ones
4. **Quick Actions for Polish**: Use enhancement actions to refine prompts before sending
5. **Clear History Regularly**: Keep your history relevant and manageable

## Troubleshooting

**Button doesn't appear on input field?**
- Refresh the page after installing
- Make sure the input field is large enough (>100px width, >30px height)

**Template not copying?**
- Check clipboard permissions in Chrome settings
- Try clicking the template again

**Extension not loading?**
- Verify Developer Mode is enabled
- Check for errors in `chrome://extensions/`
- Reload the extension

## Future Enhancements (Potential)

- AI-powered prompt suggestions
- Template categories and filtering
- Import/export templates
- Keyboard shortcuts
- Dark mode support
- Multi-language support

## Support

This extension is designed to work seamlessly across all websites and text inputs. If you encounter any issues, verify that:
- Developer mode is enabled
- The extension is loaded and active
- You've refreshed pages after installation

---

**Enjoy enhanced prompt writing!**
