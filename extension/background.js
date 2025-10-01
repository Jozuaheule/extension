// Background service worker for API calls
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'callLLM') {
    callLLMAPI(request.prompt, request.instruction, request.apiKey, request.provider)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

async function callLLMAPI(prompt, instruction, apiKey, provider = 'openai') {
  if (!apiKey) {
    throw new Error('API key not configured. Please set it in the extension options.');
  }

  const providers = {
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: instruction || 'You are a helpful assistant that improves prompts to be clearer, more detailed, and more effective.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      extractResponse: (data) => data.choices[0].message.content
    },
    anthropic: {
      url: 'https://api.anthropic.com/v1/messages',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `${instruction || 'You are a helpful assistant that improves prompts to be clearer, more detailed, and more effective.'}\n\n${prompt}`
          }
        ]
      },
      extractResponse: (data) => data.content[0].text
    },
    groq: {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: {
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: instruction || 'You are a helpful assistant that improves prompts to be clearer, more detailed, and more effective.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      extractResponse: (data) => data.choices[0].message.content
    }
  };

  const config = providers[provider];
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  try {
    const response = await fetch(config.url, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(config.body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return config.extractResponse(data);
  } catch (error) {
    throw new Error(`API call failed: ${error.message}`);
  }
}
