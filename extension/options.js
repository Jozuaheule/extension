const providerHints = {
  openai: 'Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI</a>',
  anthropic: 'Get your API key from <a href="https://console.anthropic.com/" target="_blank">Anthropic Console</a>',
  groq: 'Get your API key from <a href="https://console.groq.com/" target="_blank">Groq Console</a>'
};

function loadSettings() {
  chrome.storage.local.get(['apiKey', 'provider'], (result) => {
    if (result.provider) {
      document.getElementById('provider').value = result.provider;
      updateHint(result.provider);
    }
    if (result.apiKey) {
      document.getElementById('api-key').value = result.apiKey;
    }
  });
}

function updateHint(provider) {
  document.getElementById('api-hint').innerHTML = providerHints[provider] || providerHints.openai;
}

function showMessage(type, message) {
  const successEl = document.getElementById('success-message');
  const errorEl = document.getElementById('error-message');

  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  if (type === 'success') {
    successEl.textContent = message;
    successEl.style.display = 'block';
    setTimeout(() => {
      successEl.style.display = 'none';
    }, 5000);
  } else {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

function saveSettings() {
  const apiKey = document.getElementById('api-key').value.trim();
  const provider = document.getElementById('provider').value;

  if (!apiKey) {
    showMessage('error', 'Please enter an API key');
    return;
  }

  chrome.storage.local.set({ apiKey, provider }, () => {
    showMessage('success', 'Settings saved successfully!');
  });
}

async function testConnection() {
  const apiKey = document.getElementById('api-key').value.trim();
  const provider = document.getElementById('provider').value;

  if (!apiKey) {
    showMessage('error', 'Please enter an API key first');
    return;
  }

  const testBtn = document.getElementById('test-btn');
  testBtn.disabled = true;
  testBtn.textContent = 'Testing...';

  try {
    const response = await new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          action: 'callLLM',
          prompt: 'Say "Hello" and nothing else.',
          instruction: 'You are a test. Respond with exactly one word: Hello',
          apiKey,
          provider
        },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response.success) {
            resolve(response.result);
          } else {
            reject(new Error(response.error));
          }
        }
      );
    });

    showMessage('success', 'Connection successful! API is working correctly.');
  } catch (error) {
    showMessage('error', `Connection failed: ${error.message}`);
  } finally {
    testBtn.disabled = false;
    testBtn.textContent = 'Test Connection';
  }
}

document.getElementById('provider').addEventListener('change', (e) => {
  updateHint(e.target.value);
});

document.getElementById('save-btn').addEventListener('click', saveSettings);
document.getElementById('test-btn').addEventListener('click', testConnection);

loadSettings();
