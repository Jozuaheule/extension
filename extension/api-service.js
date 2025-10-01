// Shared API service utilities
class APIService {
  static async getConfig() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['apiKey', 'provider'], (result) => {
        resolve({
          apiKey: result.apiKey || '',
          provider: result.provider || 'openai'
        });
      });
    });
  }

  static async callLLM(prompt, instruction) {
    const config = await this.getConfig();

    if (!config.apiKey) {
      throw new Error('API key not configured. Please set it in the extension options.');
    }

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          action: 'callLLM',
          prompt,
          instruction,
          apiKey: config.apiKey,
          provider: config.provider
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
  }

  static async improvePrompt(prompt) {
    return this.callLLM(
      prompt,
      'Improve this prompt to be clearer, more specific, and more effective. Return only the improved prompt without any explanations or meta-commentary.'
    );
  }

  static async addContext(prompt) {
    return this.callLLM(
      prompt,
      'Add helpful context, background information, and structure to this prompt. Include sections for context, requirements, and expected outcomes. Return only the enhanced prompt.'
    );
  }

  static async makeConcise(prompt) {
    return this.callLLM(
      prompt,
      'Make this prompt more concise while keeping the essential information. Remove redundancy and improve clarity. Return only the revised prompt.'
    );
  }

  static async makeDetailed(prompt) {
    return this.callLLM(
      prompt,
      'Expand this prompt with more details, examples, and specific requirements. Make it comprehensive. Return only the expanded prompt.'
    );
  }

  static async fixGrammar(prompt) {
    return this.callLLM(
      prompt,
      'Fix any grammar, spelling, or punctuation errors in this prompt. Improve sentence structure. Return only the corrected prompt.'
    );
  }

  static async generateSuggestions(prompt) {
    return this.callLLM(
      prompt,
      'Based on this prompt, suggest 3 alternative ways to phrase it that might be more effective. Return as a JSON array of strings: ["suggestion1", "suggestion2", "suggestion3"]'
    );
  }
}
