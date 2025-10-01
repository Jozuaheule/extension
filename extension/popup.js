const templates = {
  'code-review': `Please review this code for:
- Code quality and best practices
- Potential bugs or security issues
- Performance optimizations
- Readability and maintainability
- Adherence to coding standards

[Paste your code here]`,

  'bug-fix': `I'm experiencing a bug:

**Description:** [Describe the bug]
**Expected behavior:** [What should happen]
**Actual behavior:** [What actually happens]
**Steps to reproduce:** [List steps]
**Environment:** [Browser, OS, etc.]
**Code snippet:** [Relevant code]

Please help me identify and fix this issue.`,

  'feature': `I want to implement a new feature:

**Feature:** [Feature name]
**Purpose:** [Why this feature is needed]
**Requirements:** [Key requirements]
**User story:** [As a user, I want to...]
**Acceptance criteria:** [What defines success]

Please help me plan and implement this feature.`,

  'refactor': `I need help refactoring this code:

**Current issues:**
- [Issue 1]
- [Issue 2]

**Goals:**
- Improve readability
- Better maintainability
- Follow best practices
- Optimize performance

[Paste your code here]`,

  'explain': `Please explain this code:

**Context:** [What this code does]
**Questions:**
- What is the overall purpose?
- How do the key parts work?
- Are there any potential issues?
- How could it be improved?

[Paste your code here]`
};

let history = [];
let customTemplates = {};
let stats = { promptCount: 0, savedCount: 0 };

function loadData() {
  chrome.storage.local.get(['history', 'customTemplates', 'stats'], (result) => {
    history = result.history || [];
    customTemplates = result.customTemplates || {};
    stats = result.stats || { promptCount: 0, savedCount: 0 };
    updateUI();
  });
}

function saveData() {
  chrome.storage.local.set({ history, customTemplates, stats });
}

function updateUI() {
  document.getElementById('prompt-count').textContent = stats.promptCount;
  document.getElementById('saved-count').textContent = stats.savedCount;

  const historyList = document.getElementById('history-list');
  if (history.length === 0) {
    historyList.innerHTML = '<div class="empty-state">No prompts in history yet</div>';
  } else {
    historyList.innerHTML = history.slice(0, 10).map(item =>
      `<div class="history-item" data-prompt="${escapeHtml(item)}">
        ${truncate(item, 100)}
      </div>`
    ).join('');
  }
}

function truncate(str, length) {
  return str.length > length ? str.substring(0, length) + '...' : str;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!');
  });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

document.querySelectorAll('.template-item').forEach(item => {
  item.addEventListener('click', () => {
    const templateKey = item.dataset.template;
    const templateText = templates[templateKey];

    copyToClipboard(templateText);

    if (!history.includes(templateText)) {
      history.unshift(templateText);
      if (history.length > 50) history.pop();
    }

    stats.promptCount++;
    saveData();
    updateUI();
  });
});

document.getElementById('history-list').addEventListener('click', (e) => {
  const historyItem = e.target.closest('.history-item');
  if (historyItem) {
    const prompt = historyItem.dataset.prompt;
    copyToClipboard(prompt);
  }
});

document.getElementById('save-template').addEventListener('click', () => {
  const name = document.getElementById('custom-name').value.trim();
  const content = document.getElementById('custom-content').value.trim();

  if (!name || !content) {
    showNotification('Please fill in all fields');
    return;
  }

  customTemplates[name] = content;
  stats.savedCount = Object.keys(customTemplates).length;
  saveData();

  document.getElementById('custom-name').value = '';
  document.getElementById('custom-content').value = '';

  showNotification('Template saved successfully!');
  updateUI();
});

document.getElementById('clear-history').addEventListener('click', () => {
  if (confirm('Clear all history?')) {
    history = [];
    saveData();
    updateUI();
    showNotification('History cleared');
  }
});

loadData();
