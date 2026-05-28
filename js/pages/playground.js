import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderPlaygroundPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Playground', link: '#/playground' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: []
  });

  const pageContainer = document.getElementById('pageContent');
  
  // Custom styling so playground expands correctly
  pageContainer.style.padding = '0';
  pageContainer.style.maxWidth = '100%';

  // Preset templates database
  const presets = {
    chatbot: {
      system: 'You are a chatbot.',
      human: '{question}',
      inputs: { question: 'What are top 3 things to see in Rome?' }
    },
    travel: {
      system: 'You are a professional travel planner agent. Provide a day-by-day itinerary.',
      human: 'Create a {days}-day itinerary for {destination} focusing on {interests}.',
      inputs: { days: '3', destination: 'Paris', interests: 'art museums and croissants' }
    },
    summarizer: {
      system: 'You are a helpful assistant that summarizes text accurately.',
      human: 'Summarize the following text in {words} words:\n\n{text}',
      inputs: { 
        words: '50', 
        text: 'AetherFlow is a platform for building production-grade LLM applications. It allows developers to trace requests, run evaluations, test prompts, and monitor deployments in one unified dashboard. It integrates seamlessly with AetherFlow and AetherGraph for end-to-end observability.' 
      }
    }
  };

  // State variables
  let currentPresetKey = 'chatbot';
  let systemPrompt = presets.chatbot.system;
  let humanPrompt = presets.chatbot.human;
  let variablesList = ['question'];
  let variableValues = { question: 'What are top 3 things to see in Rome?' };
  let selectedModel = 'gpt-4o';
  let isParametersOpen = false;
  let temperature = 0.7;
  let maxTokens = 2048;
  let topP = 1.0;
  let isGenerating = false;

  // Render main layout structure
  function render() {
    pageContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; height: calc(100vh - 48px); background: var(--color-bg-main); text-align: left;">
        
        <!-- Action Subheader Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding: 0.75rem 1.5rem; background: var(--color-bg-card); flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Playground</h3>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); border-left: 1px solid var(--color-border); padding-left: 0.5rem;">Iterate on and test prompts</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" style="padding: 0.375rem 0.5rem;" title="View History">
              <i data-lucide="history" style="width: 15px; height: 15px;"></i>
            </button>
            <button class="btn btn-secondary btn-sm" id="evalSetupBtn" style="font-weight: 500;">
              <span>Set up Evaluation</span>
            </button>
            <button class="btn btn-secondary btn-sm" style="padding: 0.375rem 0.5rem;" title="Refresh session">
              <i data-lucide="refresh-cw" style="width: 15px; height: 15px;"></i>
            </button>
            <button class="btn btn-secondary btn-sm" style="padding: 0.375rem 0.5rem;" title="Search prompts">
              <i data-lucide="search" style="width: 15px; height: 15px;"></i>
            </button>
            
            <div style="display: flex; align-items: center;">
              <button class="btn btn-primary btn-sm" id="playgroundStartBtn" style="background: #0052cc; border-color: #0052cc; border-top-right-radius: 0; border-bottom-right-radius: 0; font-weight: 600; min-width: 80px;">
                ${isGenerating ? '<span class="spin-loader" style="width:12px; height:12px; border-width:1.5px; border-top-color:transparent; margin-right:4px;"></span> Stop' : 'Start'}
              </button>
              <button class="btn btn-primary btn-sm" style="background: #004bbb; border-color: #004bbb; padding: 0.375rem 0.375rem; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Split Grid Workspace Container -->
        <div style="display: flex; flex: 1; overflow: hidden; width: 100%;">
          
          <!-- Left Column (Prompts Pane) -->
          <div style="flex: 1.2; border-right: 1px solid var(--color-border); display: flex; flex-direction: column; overflow-y: auto; background: var(--color-bg-card);">
            
            <!-- Prompts Section Header -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--color-border); background: var(--color-sidebar-hover); flex-shrink: 0;">
              <div style="display: flex; align-items: center; gap: 0.375rem;">
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.02em;">Prompts</span>
                <i data-lucide="info" style="width: 13px; height: 13px; color: var(--color-text-muted);" title="SYSTEM and HUMAN templates define the model instructions. Use brackets like {variable} to parameterize."></i>
              </div>
              <button class="btn btn-secondary btn-xs" style="font-size: 0.75rem; font-weight: 500; display: flex; align-items: center; gap: 2px;">
                <i data-lucide="plus" style="width: 12px; height: 12px;"></i>
                <span>Prompt</span>
              </button>
            </div>

            <!-- Loader / Model Toolbar Selector -->
            <div style="padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex-shrink: 0; background: var(--color-bg-card);">
              <select id="loadPresetSelect" class="form-input" style="padding: 0.25rem 0.5rem; font-size: 0.8125rem; width: 130px; font-weight: 500; height: 28px; background: var(--color-sidebar-hover);">
                <option value="chatbot" ${currentPresetKey === 'chatbot' ? 'selected' : ''}>Chatbot preset</option>
                <option value="travel" ${currentPresetKey === 'travel' ? 'selected' : ''}>Travel Agent</option>
                <option value="summarizer" ${currentPresetKey === 'summarizer' ? 'selected' : ''}>Document Summarizer</option>
              </select>

              <div style="display: flex; align-items: center; gap: 0.375rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 2px; background: var(--color-sidebar-hover);">
                <button class="btn btn-secondary btn-xs" style="padding: 0.25rem; border: none; background: transparent;"><i data-lucide="sparkles" style="width: 14px; height: 14px; color: var(--color-brand);"></i></button>
                 <select id="playgroundModelSelect" class="form-input" style="border: none; padding: 0 1.25rem 0 0.25rem; font-size: 0.8125rem; font-weight: 600; background: transparent; height: 22px; cursor: pointer; color: var(--color-text-primary);">
                  <optgroup label="OpenAI">
                    <option value="gpt-4o" ${selectedModel === 'gpt-4o' ? 'selected' : ''}>gpt-4o</option>
                  </optgroup>
                  <optgroup label="Anthropic">
                    <option value="claude-3-5-sonnet" ${selectedModel === 'claude-3-5-sonnet' ? 'selected' : ''}>claude-3-5-sonnet</option>
                  </optgroup>
                  <optgroup label="DeepSeek">
                    <option value="deepseek-v3" ${selectedModel === 'deepseek-v3' ? 'selected' : ''}>deepseek-chat (V3)</option>
                  </optgroup>
                  <optgroup label="Google Gemini">
                    <option value="gemini-1.5-pro" ${selectedModel === 'gemini-1.5-pro' ? 'selected' : ''}>gemini-1.5-pro</option>
                  </optgroup>
                  <optgroup label="Hugging Face">
                    <option value="meta-llama/Llama-3-8b-instruct" ${selectedModel === 'meta-llama/Llama-3-8b-instruct' ? 'selected' : ''}>meta-llama/Llama-3-8b-instruct</option>
                    <option value="mistralai/Mixtral-8x7B-Instruct-v0.1" ${selectedModel === 'mistralai/Mixtral-8x7B-Instruct-v0.1' ? 'selected' : ''}>mistralai/Mixtral-8x7B-Instruct-v0.1</option>
                    <option value="microsoft/Phi-3-mini-128k-instruct" ${selectedModel === 'microsoft/Phi-3-mini-128k-instruct' ? 'selected' : ''}>microsoft/Phi-3-mini-128k-instruct</option>
                  </optgroup>
                  <optgroup label="Ollama (Local)">
                    <option value="llama3" ${selectedModel === 'llama3' ? 'selected' : ''}>ollama/llama3 (Local)</option>
                  </optgroup>
                </select>
              </div>

              <button class="btn btn-secondary btn-sm" id="toggleParamsBtn" style="height: 28px; padding: 0 0.5rem; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="sliders" style="width: 14px; height: 14px;"></i>
                <span style="font-size: 0.75rem; font-weight: 500;">Parameters</span>
              </button>

              <button class="btn btn-secondary btn-sm" style="height: 28px; font-weight: 500; margin-left: auto;">Save Prompt</button>
            </div>

            <!-- parameters popover panel -->
            ${isParametersOpen ? `
              <div style="background: var(--color-sidebar-hover); border-bottom: 1px solid var(--color-border); padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; flex-shrink: 0; animation: fadeIn 0.15s ease-out;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                  <div class="config-group">
                    <span class="config-label" style="font-size: 0.65rem;">Temperature (${temperature})</span>
                    <input type="range" class="config-slider" id="paramTemp" min="0" max="2" step="0.1" value="${temperature}">
                  </div>
                  <div class="config-group">
                    <span class="config-label" style="font-size: 0.65rem;">Max Tokens (${maxTokens})</span>
                    <input type="range" class="config-slider" id="paramMaxTokens" min="1" max="8192" step="64" value="${maxTokens}">
                  </div>
                  <div class="config-group">
                    <span class="config-label" style="font-size: 0.65rem;">Top P (${topP})</span>
                    <input type="range" class="config-slider" id="paramTopP" min="0" max="1" step="0.05" value="${topP}">
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- System Prompt container -->
            <div style="border-bottom: 1px solid var(--color-border); display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1.25rem; background: var(--color-bg-main); border-bottom: 1px solid var(--color-border);">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <i data-lucide="arrow-up-down" style="width: 12px; height: 12px; color: var(--color-text-muted);"></i>
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">System</span>
                </div>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px; color: var(--color-text-muted);"></i>
              </div>
              <textarea id="systemTextarea" class="form-input" style="border: none; width: 100%; min-height: 80px; padding: 0.75rem 1.25rem; font-size: 0.8125rem; color: var(--color-text-primary); resize: vertical; line-height: 1.45; background: transparent;" placeholder="System prompt instructions...">${systemPrompt}</textarea>
            </div>

            <!-- Human Prompt container -->
            <div style="border-bottom: 1px solid var(--color-border); display: flex; flex-direction: column;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1.25rem; background: var(--color-bg-main); border-bottom: 1px solid var(--color-border);">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <i data-lucide="arrow-up-down" style="width: 12px; height: 12px; color: var(--color-text-muted);"></i>
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">Human</span>
                </div>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px; color: var(--color-text-muted);"></i>
              </div>
              <textarea id="humanTextarea" class="form-input" style="border: none; width: 100%; min-height: 120px; padding: 0.75rem 1.25rem; font-size: 0.8125rem; color: var(--color-text-primary); resize: vertical; line-height: 1.45; background: transparent; font-family: var(--font-sans);" placeholder="Enter user message. Use brackets like {question} to create input variables...">${humanPrompt}</textarea>
            </div>

            <!-- Bottom Prompt Action Buttons -->
            <div style="padding: 0.75rem 1.25rem; display: flex; gap: 0.5rem; flex-wrap: wrap; background: var(--color-bg-card); flex-shrink: 0; align-items: center; border-top: 1px solid var(--color-border); margin-top: auto;">
              <button class="btn btn-secondary btn-xs" style="font-weight: 500; height: 26px;"><i data-lucide="plus" style="width: 12px; height: 12px; margin-right: 2px;"></i> Message</button>
              <button class="btn btn-secondary btn-xs" style="font-weight: 500; height: 26px;"><i data-lucide="plus" style="width: 12px; height: 12px; margin-right: 2px;"></i> Output Schema</button>
              <button class="btn btn-secondary btn-xs" style="font-weight: 500; height: 26px;"><i data-lucide="plus" style="width: 12px; height: 12px; margin-right: 2px;"></i> Tool</button>
              
              <div style="margin-left: auto; display: flex; align-items: center; gap: 4px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 1px 4px; background: var(--color-sidebar-hover); height: 26px; cursor: pointer;">
                <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary); font-family: var(--font-mono);">{ x } f-string</span>
                <i data-lucide="chevron-down" style="width: 12px; height: 12px; color: var(--color-text-muted);"></i>
              </div>
            </div>

          </div>

          <!-- Right Column (Inputs & Output Splits) -->
          <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--color-bg-main);">
            
            <!-- Inputs Panel (Top Half) -->
            <div style="flex: 0.8; border-bottom: 1px solid var(--color-border); display: flex; flex-direction: column; overflow-y: auto; background: var(--color-bg-card);">
              <div style="display: flex; align-items: center; gap: 0.375rem; padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--color-border); background: var(--color-sidebar-hover); flex-shrink: 0;">
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.02em;">Inputs</span>
                <i data-lucide="info" style="width: 13px; height: 13px; color: var(--color-text-muted);" title="Input variables will populate the brackets {} defined in System and Human prompts."></i>
              </div>

              <!-- Live Parsed Inputs List -->
              <div id="playgroundInputsContainer" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
                ${renderVariablesInputs()}
              </div>
            </div>

            <!-- Output Panel (Bottom Half) -->
            <div style="flex: 1.2; display: flex; flex-direction: column; overflow: hidden; background: var(--color-bg-card);">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--color-border); background: var(--color-sidebar-hover); flex-shrink: 0;">
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.02em;">Output</span>
                <i data-lucide="chevron-down" style="width: 14px; height: 14px; color: var(--color-text-muted);"></i>
              </div>

              <!-- Output Screen -->
              <div style="flex: 1; padding: 1.25rem; overflow-y: auto; display: flex; flex-direction: column;" id="playgroundOutputBox">
                <div id="outputContentPlaceholder" style="background: var(--color-bg-main); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; color: var(--color-text-muted); font-size: 0.8125rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-sans); width: 100%;">
                  <span style="font-weight: 600; background: var(--color-border); border-radius: 4px; padding: 2px 6px; font-size: 0.7rem; color: var(--color-text-secondary); font-family: var(--font-sans);">Ctrl ↵</span>
                  <span>or click <strong>Start</strong> to generate...</span>
                </div>
                <div id="outputContentLive" style="display: none; font-size: 0.8125rem; line-height: 1.5; color: var(--color-text-primary); font-family: var(--font-mono); white-space: pre-wrap; width: 100%;"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    bindEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Generates input textboxes dynamically for parsed brackets
  function renderVariablesInputs() {
    if (variablesList.length === 0) {
      return `<span style="font-size: 0.8125rem; color: var(--color-text-muted); text-align: center; display: block; padding: 1rem;">No input variables detected. Use brackets like {question} in your human prompt templates.</span>`;
    }

    return variablesList.map(v => {
      const val = variableValues[v] || '';
      return `
        <div style="display: flex; flex-direction: column; gap: 0.375rem; text-align: left;">
          <label style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted);">${v}</label>
          <input type="text" class="form-input variable-input-field" data-variable="${v}" placeholder="Enter variable value..." value="${val}" style="font-size: 0.8125rem; background: var(--color-bg-card); width: 100%;">
        </div>
      `;
    }).join('');
  }

  // Parses brackets from templates
  function parseVariables() {
    const sysMatches = systemPrompt.match(/\{([a-zA-Z0-9_]+)\}/g) || [];
    const humMatches = humanPrompt.match(/\{([a-zA-Z0-9_]+)\}/g) || [];
    const merged = [...sysMatches, ...humMatches].map(m => m.replace(/\{|\}/g, ''));
    
    // Unique list
    const newList = Array.from(new Set(merged));
    
    // Sync values dictionary
    newList.forEach(v => {
      if (variableValues[v] === undefined) {
        variableValues[v] = '';
      }
    });

    variablesList = newList;
  }

  // Live bindings Setup
  function bindEvents() {
    // SYSTEM textarea
    const sysArea = document.getElementById('systemTextarea');
    if (sysArea) {
      sysArea.addEventListener('input', (e) => {
        systemPrompt = e.target.value;
        parseVariables();
        
        // Re-render only inputs list dynamically to prevent text cursor loss
        const container = document.getElementById('playgroundInputsContainer');
        if (container) {
          container.innerHTML = renderVariablesInputs();
          bindVariableInputs();
        }
      });
    }

    // HUMAN textarea
    const humArea = document.getElementById('humanTextarea');
    if (humArea) {
      humArea.addEventListener('input', (e) => {
        humanPrompt = e.target.value;
        parseVariables();
        
        const container = document.getElementById('playgroundInputsContainer');
        if (container) {
          container.innerHTML = renderVariablesInputs();
          bindVariableInputs();
        }
      });
    }

    // Bind inputs inside variables pane
    bindVariableInputs();

    // Preset dropdown select
    const presetSelect = document.getElementById('loadPresetSelect');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        currentPresetKey = e.target.value;
        const config = presets[currentPresetKey];
        if (config) {
          systemPrompt = config.system;
          humanPrompt = config.human;
          variableValues = { ...config.inputs };
          parseVariables();
          render();
        }
      });
    }

    // Model Selector change
    const modelSelect = document.getElementById('playgroundModelSelect');
    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        selectedModel = e.target.value;
      });
    }

    // Parameters panel trigger
    const toggleParams = document.getElementById('toggleParamsBtn');
    if (toggleParams) {
      toggleParams.addEventListener('click', () => {
        isParametersOpen = !isParametersOpen;
        render();
      });
    }

    // Bind parameter ranges if panel open
    if (isParametersOpen) {
      const tempRange = document.getElementById('paramTemp');
      if (tempRange) {
        tempRange.addEventListener('input', (e) => {
          temperature = parseFloat(e.target.value);
        });
      }

      const tokensRange = document.getElementById('paramMaxTokens');
      if (tokensRange) {
        tokensRange.addEventListener('input', (e) => {
          maxTokens = parseInt(e.target.value);
        });
      }

      const topPRange = document.getElementById('paramTopP');
      if (topPRange) {
        topPRange.addEventListener('input', (e) => {
          topP = parseFloat(e.target.value);
        });
      }
    }

    // Start / Generate Button Click
    const startBtn = document.getElementById('playgroundStartBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (isGenerating) {
          isGenerating = false;
          render();
        } else {
          runSimulation();
        }
      });
    }

    // Ctrl + Enter execute listener
    const keydownHandler = (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        if (!isGenerating) runSimulation();
      }
    };
    document.addEventListener('keydown', keydownHandler);

    // Save cleanup references
    window.addEventListener('hashchange', function cleanup() {
      pageContainer.removeAttribute('style');
      document.removeEventListener('keydown', keydownHandler);
      window.removeEventListener('hashchange', cleanup);
    });
  }

  // Bind values typed inside inputs fields
  function bindVariableInputs() {
    const fields = document.querySelectorAll('.variable-input-field');
    fields.forEach(f => {
      f.addEventListener('input', (e) => {
        const v = f.getAttribute('data-variable');
        variableValues[v] = e.target.value;
      });
    });
  }

  // Run LLM Generation Simulation with live variables merging
  function runSimulation() {
    isGenerating = true;
    render();

    const placeholder = document.getElementById('outputContentPlaceholder');
    const liveBox = document.getElementById('outputContentLive');
    if (placeholder) placeholder.style.display = 'none';
    if (liveBox) {
      liveBox.style.display = 'block';
      liveBox.textContent = '';
    }

    // Build the merged prompts
    let mergedPrompt = humanPrompt;
    variablesList.forEach(v => {
      const val = variableValues[v] || `[${v} missing]`;
      mergedPrompt = mergedPrompt.replace(new RegExp(`\\{${v}\\}`, 'g'), val);
    });

    // Check if Hugging Face model is selected
    const isHFModel = selectedModel.includes('/') || selectedModel.includes('llama-3') || selectedModel.includes('mixtral') || selectedModel.includes('phi-3');
    
    // Check connection status
    const hfKey = (MockDatabase.providerKeys || []).find(k => k.provider.replace(/\s+/g, '').toLowerCase() === 'huggingface');
    const isHfConnected = !!hfKey;
    const hfTokenPreview = isHfConnected ? (hfKey.value.substring(0, 8) + '...' + hfKey.value.substring(hfKey.value.length - 4)) : 'NONE (Running on Demo Gateway)';

    let connectionHeader = 'Connecting to provider API endpoint using configured settings...\n';
    let tokenStatusHeader = '';

    if (isHFModel) {
      connectionHeader = `Connecting to Hugging Face Inference Hub API...\n`;
      tokenStatusHeader = `[Access Token Status: ${isHfConnected ? 'ACTIVE (' + hfTokenPreview + ')' : 'DEMO MODE (Rate limits apply. Configure Hugging Face User Access Token in Settings > Provider Secrets)'}]\n`;
    }

    // Formulate streaming response
    const outputLines = [
      connectionHeader,
      tokenStatusHeader,
      `[Model: ${selectedModel}] [Temperature: ${temperature}] [Max Tokens: ${maxTokens}]\n`,
      `>>> SYSTEM: "${systemPrompt}"\n`,
      `>>> HUMAN: "${mergedPrompt}"\n\n`,
      `--- Simulated Model Response --- \n`,
      `Hello! Processing your instruction in playground context.\n\n`,
      `Here is a custom completion tailored to your variables:\n`
    ];

    if (currentPresetKey === 'travel') {
      const dest = variableValues.destination || 'Paris';
      const daysVal = variableValues.days || '3';
      const interestsVal = variableValues.interests || 'art and culture';
      outputLines.push(
        `Here is a custom ${daysVal}-day itinerary for ${dest} focusing on ${interestsVal}:\n\n`,
        `Day 1: Explore the historic center of ${dest}. Grab lunch at a local bistro and spend the afternoon discovering nearby sights.\n`,
        `Day 2: Focus on ${interestsVal}. Allocate 3-4 hours for major galleries or neighborhood walks, then relax at a café.\n`,
        `Day 3: Take a leisure walk around local landmarks, pick up souvenirs, and wrap up with a memorable dinner.`
      );
    } else if (currentPresetKey === 'summarizer') {
      const words = variableValues.words || '50';
      outputLines.push(
        `Here is a summary of the text in approximately ${words} words:\n\n`,
        `AetherFlow is an end-to-end platform providing complete observability, prompt testing in playgrounds, and automated trace evaluation. It integrates with AetherFlow/AetherGraph to help developers debug and transition agents from local codebases to secure production environments.`
      );
    } else {
      const ques = variableValues.question || 'What are top 3 things to see in Rome?';
      outputLines.push(
        `Regarding your query: "${ques}"\n\n`,
        `1. Colosseum: The spectacular ancient amphitheater.\n`,
        `2. Vatican Museums & Sistine Chapel: Housing the world's most famous renaissance frescoes.\n`,
        `3. Trevi Fountain: A masterpiece of baroque design. Be sure to throw a coin!`
      );
    }

    const fullResponse = outputLines.join('');
    let idx = 0;
    
    function stream() {
      if (!isGenerating) return;
      if (idx < fullResponse.length) {
        // Stream 2-3 characters at a time to look fast but realistic
        const chunk = fullResponse.substring(idx, idx + 3);
        liveBox.textContent += chunk;
        idx += 3;
        
        // Scroll output pane to bottom
        const outContainer = document.getElementById('playgroundOutputBox');
        if (outContainer) outContainer.scrollTop = outContainer.scrollHeight;

        setTimeout(stream, 15);
      } else {
        isGenerating = false;
        render();
      }
    }

    setTimeout(stream, 200);
  }

  // Trigger initial render setup
  parseVariables();
  render();
}
