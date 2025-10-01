let enhancerButton = null;
let enhancerPanel = null;

function createEnhancerButton() {
  const button = document.createElement('div');
  button.id = 'prompt-enhancer-btn';
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  `;
  button.title = 'Prompt Enhancer';
  return button;
}

function createEnhancerPanel() {
  const panel = document.createElement('div');
  panel.id = 'prompt-enhancer-panel';
  panel.innerHTML = `
    <div class="enhancer-header">
      <h3>Prompt Enhancer</h3>
      <button class="enhancer-close">&times;</button>
    </div>
    <div class="enhancer-content">
      <div class="enhancer-section">
        <h4>Quick Actions</h4>
        <div class="action-buttons">
          <button data-action="improve">Improve Clarity</button>
          <button data-action="expand">Add Details</button>
          <button data-action="structure">Add Structure</button>
          <button data-action="context">Add Context</button>
        </div>
      </div>
      <div class="enhancer-section">
        <h4>Templates</h4>
        <select id="template-select">
          <option value="">Select a template...</option>
          <option value="code-review">Code Review</option>
          <option value="bug-fix">Bug Fix</option>
          <option value="feature">New Feature</option>
          <option value="refactor">Refactor Code</option>
          <option value="explain">Explain Code</option>
        </select>
      </div>
    </div>
  `;
  return panel;
}

function findTextInputs() {
  const selectors = [
    'textarea',
    'input[type="text"]',
    '[contenteditable="true"]',
    '[role="textbox"]'
  ];

  return document.querySelectorAll(selectors.join(','));
}

function attachEnhancer(input) {
  if (input.dataset.enhancerAttached) return;
  input.dataset.enhancerAttached = 'true';

  const rect = input.getBoundingClientRect();
  if (rect.width < 100 || rect.height < 30) return;

  const button = createEnhancerButton();
  button.style.position = 'absolute';
  button.style.zIndex = '9999';

  const updatePosition = () => {
    const rect = input.getBoundingClientRect();
    button.style.top = `${window.scrollY + rect.top + 8}px`;
    button.style.right = `${window.innerWidth - rect.right + 8}px`;
  };

  updatePosition();
  document.body.appendChild(button);

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    showEnhancerPanel(input);
  });

  input.addEventListener('focus', () => {
    button.style.display = 'flex';
    updatePosition();
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      if (!enhancerPanel || !enhancerPanel.contains(document.activeElement)) {
        button.style.display = 'none';
      }
    }, 200);
  });
}

function showEnhancerPanel(input) {
  if (enhancerPanel) {
    enhancerPanel.remove();
  }

  enhancerPanel = createEnhancerPanel();
  document.body.appendChild(enhancerPanel);

  const rect = input.getBoundingClientRect();
  enhancerPanel.style.top = `${window.scrollY + rect.bottom + 8}px`;
  enhancerPanel.style.left = `${window.scrollX + rect.left}px`;

  enhancerPanel.querySelector('.enhancer-close').addEventListener('click', () => {
    enhancerPanel.remove();
    enhancerPanel = null;
  });

  enhancerPanel.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      enhancePrompt(input, action);
    });
  });

  enhancerPanel.querySelector('#template-select').addEventListener('change', (e) => {
    if (e.target.value) {
      insertTemplate(input, e.target.value);
      e.target.value = '';
    }
  });
}

function enhancePrompt(input, action) {
  const currentText = getInputValue(input);

  const enhancements = {
    improve: `Please provide a clear and detailed response for: ${currentText}`,
    expand: `${currentText}\n\nAdditional context:\n- \n- \n- `,
    structure: `${currentText}\n\nRequirements:\n1. \n2. \n3. \n\nExpected outcome:`,
    context: `Context: [Add relevant background]\n\n${currentText}\n\nGoal: [What you want to achieve]`
  };

  setInputValue(input, enhancements[action] || currentText);
  input.focus();
}

function insertTemplate(input, templateKey) {
  const templates = {
    'code-review': 'Please review this code for best practices, potential bugs, performance, and maintainability:\n\n[Your code here]',
    'bug-fix': 'Bug Report:\n\nDescription: \nExpected: \nActual: \nSteps to reproduce:\n1. \n\nCode snippet:',
    'feature': 'Feature Request:\n\nName: \nPurpose: \nRequirements:\n- \n\nUser story: As a user, I want to...',
    'refactor': 'Refactoring Request:\n\nCurrent issues:\n- \n\nGoals:\n- Improve readability\n- Better maintainability\n\nCode:\n',
    'explain': 'Please explain this code:\n\n[Your code here]\n\nSpecifically:\n- Overall purpose\n- Key components\n- Potential improvements'
  };

  setInputValue(input, templates[templateKey] || '');
  input.focus();
}

function getInputValue(input) {
  if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
    return input.value;
  }
  return input.textContent || input.innerText || '';
}

function setInputValue(input, value) {
  if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  } else {
    input.textContent = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

function init() {
  const observer = new MutationObserver(() => {
    findTextInputs().forEach(input => attachEnhancer(input));
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  findTextInputs().forEach(input => attachEnhancer(input));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
