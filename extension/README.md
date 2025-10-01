# Prompt Enhancer AI - Chrome Extension

An AI-powered Chrome extension that enhances your prompt input with LLM integration, intelligent templates, and smart suggestions.

## Features

### AI-Powered Enhancement
- **Real-time AI improvements**: Use OpenAI, Anthropic Claude, or Groq to enhance your prompts
- **Multiple enhancement modes**:
  - Improve clarity and effectiveness
  - Add context and structure
  - Make prompts more detailed
  - Fix grammar and spelling
- **In-page AI enhancement**: Click the floating button on any text input for instant AI help

### Quick Templates
Pre-built professional templates for:
- Code Review
- Bug Fix Reports
- Feature Requests
- Code Refactoring
- Code Explanations

### Smart History
- Automatically saves your last 50 prompts
- Quick access and reuse
- Click any prompt to copy it

### Custom Templates
- Create your own reusable prompt templates
- Save frequently used prompts
- Build your personal template library

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top-right corner
3. Click "Load unpacked"
4. Select the `extension` folder from this project
5. The extension icon will appear in your toolbar

## Setup

### Configure Your API Key

1. Click the extension icon
2. Click "Configure API Key" button
3. Choose your AI provider:
   - **OpenAI** (GPT-3.5) - Most popular, reliable
   - **Anthropic** (Claude Haiku) - Fast and intelligent
   - **Groq** (Mixtral) - Very fast, free tier available
4. Enter your API key
5. Click "Test Connection" to verify
6. Click "Save Settings"

### Getting API Keys

**OpenAI (Recommended):**
1. Visit [platform.openai.com](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy and paste into extension settings

**Anthropic:**
1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Create an account
3. Generate an API key

**Groq (Free tier):**
1. Visit [console.groq.com](https://console.groq.com/)
2. Sign up for free
3. Get your API key

## Usage

### Popup Interface

**AI Enhance Tab:**
1. Enter your prompt in the text area
2. Choose an enhancement action:
   - **Improve Prompt** - Make it clearer and more effective
   - **Add Context** - Add background and structure
   - **Make Detailed** - Expand with more details
   - **Fix Grammar** - Correct errors
3. Enhanced prompt appears below
4. Click "Copy to Clipboard"

**Templates Tab:**
- Browse pre-built templates
- Click any template to copy it

**History Tab:**
- View recent prompts
- Click to reuse any prompt

**Custom Tab:**
- Create custom templates
- Save for later use
- Clear history

### In-Page Enhancement

When you focus on any text input on any webpage:

1. A purple floating button appears in the top-right corner
2. Click it to open the enhancement panel
3. Choose from:
   - **AI Enhancement** - 4 AI-powered enhancement options
   - **Quick Actions** - Manual enhancement templates
   - **Templates** - Insert pre-built templates

The AI will process your text and replace it with the enhanced version directly in the input field.

## Privacy & Security

- All API keys are stored locally in your browser
- No data is sent to our servers
- API calls go directly from your browser to your chosen AI provider
- Your prompts are only sent to the AI provider you configure
- No tracking or analytics

## Technical Details

### Files
- `manifest.json` - Extension configuration (Manifest V3)
- `background.js` - Service worker for API calls
- `api-service.js` - Shared API utilities
- `popup.html/js` - Extension popup interface
- `content.js/css` - In-page enhancement functionality
- `options.html/js` - Settings page
- `icons/` - Extension icons

### Supported AI Providers
- **OpenAI** - GPT-3.5-turbo
- **Anthropic** - Claude 3 Haiku
- **Groq** - Mixtral-8x7b

### Permissions
- `storage` - Save settings and history locally
- `activeTab` - Detect text inputs on current page
- `host_permissions` - Make API calls to AI providers

## Troubleshooting

**API not working?**
- Verify your API key is correct
- Check you have credits/quota with your provider
- Use "Test Connection" in settings
- Check browser console for errors

**Button doesn't appear?**
- Refresh the page after installing
- Input must be >100px wide and >30px tall
- Check extension is enabled

**Enhancement not applying?**
- Make sure you entered text first
- Verify API key is configured
- Check you have internet connection

## Tips

1. **Save common prompts**: Create custom templates for frequently used prompts
2. **Try different providers**: Each AI has different strengths
3. **Use AI in-page**: The floating button is perfect for quick enhancements
4. **Experiment with actions**: Different enhancement modes give different results
5. **Check history**: Review past prompts to improve future ones

## Costs

- Extension is free
- API usage costs depend on your provider:
  - **OpenAI**: Pay-per-use pricing
  - **Anthropic**: Pay-per-use pricing
  - **Groq**: Free tier available

## Support

For issues or questions:
1. Check your API key is valid
2. Verify you have API credits
3. Check browser console for errors
4. Try a different AI provider

---

**Enjoy AI-powered prompt enhancement!**
