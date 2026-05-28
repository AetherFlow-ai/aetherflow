import { renderHeader } from '../components/header.js';

const FrameworksData = {
  'claude-agent-sdk': {
    name: 'Claude Agent SDK',
    dependencies: {
      python: "pip install -U 'aetherflow[claude-agent-sdk]'",
      typescript: "npm install aetherflow @anthropic-ai/sdk"
    },
    env: {
      python: `export AETHERFLOW_TRACING=true
export AETHERFLOW_ENDPOINT=https://api.smith.aetherflow.com
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"

export ANTHROPIC_API_KEY=<your-anthropic-api-key>`,
      typescript: `export AETHERFLOW_TRACING=true
export AETHERFLOW_ENDPOINT=https://api.smith.aetherflow.com
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"

export ANTHROPIC_API_KEY=<your-anthropic-api-key>`
    },
    code: {
      python: `import asyncio
from typing import Any
from anthropic import Anthropic
from aetherflow import traceable

client = Anthropic()

@traceable(run_type="chain")
async def run_agent():
    # Automatically records input, execution spans, and tool calls
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": "Analyze the financial report"}]
    )
    return response.content`,
      typescript: `import { Anthropic } from "@anthropic-ai/sdk";
import { traceable } from "aetherflow/traceable";

const client = new Anthropic();

const runAgent = traceable(async () => {
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Analyze the financial report" }]
  });
  return response.content;
}, { name: "Claude Agent Execution" });`
    }
  },
  'openai-agents': {
    name: 'OpenAI Agents SDK',
    dependencies: {
      python: "pip install -U aetherflow openai",
      typescript: "npm install aetherflow openai"
    },
    env: {
      python: `export AETHERFLOW_TRACING=true
export AETHERFLOW_ENDPOINT=https://api.smith.aetherflow.com
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"

export OPENAI_API_KEY=<your-openai-api-key>`,
      typescript: `export AETHERFLOW_TRACING=true
export AETHERFLOW_ENDPOINT=https://api.smith.aetherflow.com
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"

export OPENAI_API_KEY=<your-openai-api-key>`
    },
    code: {
      python: `from openai import OpenAI
from aetherflow.wrappers import wrap_openai

# Wraps client to automatically trace all OpenAI API responses
client = wrap_openai(OpenAI())

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Help me plan a dinner list"}]
)`,
      typescript: `import { OpenAI } from "openai";
import { wrapOpenAI } from "aetherflow/wrappers";

const client = wrapOpenAI(new OpenAI());

async function main() {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Help me plan a dinner list" }]
  });
}`
    }
  },
  'crewai': {
    name: 'CrewAI',
    dependencies: {
      python: "pip install crewai aetherflow",
      typescript: "npm install aetherflow"
    },
    env: {
      python: `export AETHERFLOW_TRACING=true
export AETHERFLOW_ENDPOINT=https://api.smith.aetherflow.com
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"`,
      typescript: `export AETHERFLOW_TRACING=true
export AETHERFLOW_ENDPOINT=https://api.smith.aetherflow.com
export AETHERFLOW_API_KEY=<your-api-key>`
    },
    code: {
      python: `from crewai import Agent, Crew, Process, Task
# CrewAI utilizes OpenTelemetry internally which maps perfectly to AetherFlow
# Simply run your Crew code after setting environment variables.`,
      typescript: `// Integration via HTTP endpoints or telemetry mapping`
    }
  },
  'aethergraph': {
    name: 'AetherGraph',
    dependencies: {
      python: "pip install aethergraph aetherflow",
      typescript: "npm install @aetherflow/aethergraph aetherflow"
    },
    env: {
      python: `export AETHERFLOW_TRACING=true
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"`,
      typescript: `export AETHERFLOW_TRACING=true
export AETHERFLOW_API_KEY=<your-api-key>
export AETHERFLOW_PROJECT="new"`
    },
    code: {
      python: `from aethergraph.graph import StateGraph
# StateGraph operations are tracked down to the node and transition levels.`,
      typescript: `import { StateGraph } from "@aetherflow/aethergraph";
// Nodes and transitions are fully traced auto-instrumented`
    }
  }
};

export function renderTracingPage() {
  let activeFramework = 'claude-agent-sdk';
  let activeLanguage = 'python'; // 'python' or 'typescript'
  let apiKeyGenerated = false;

  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Tracing', link: '#/tracing' },
      { text: 'new', link: '#/tracing' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'retentionBtn', label: 'Retention: 14d', primary: false },
      { id: 'dashboardBtn', label: 'Dashboard', primary: false, icon: 'bar-chart-2' },
      { id: 'newTraceBtn', label: 'New', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  function updatePageContent() {
    const data = FrameworksData[activeFramework] || FrameworksData['claude-agent-sdk'];
    
    // Replace API key if generated
    let envCode = data.env[activeLanguage];
    if (apiKeyGenerated) {
      envCode = envCode.replace('<your-api-key>', 'lsv2_pt_3f92d4b12c8a149f82bc0e193_773bf2');
    }

    const dependenciesCode = data.dependencies[activeLanguage];
    const quickstartCode = data.code[activeLanguage];

    pageContainer.innerHTML = `
      <div class="tracing-layout">
        <!-- Sub navigation tabs -->
        <div class="tab-container" style="margin: -1.5rem -2rem 1.5rem -2rem;">
          <div class="tab-item active">Tracing</div>
          <div class="tab-item" onclick="window.location.hash='#/evaluators'">Evaluators</div>
          <div class="tab-item" onclick="window.location.hash='#/settings'">Automations</div>
        </div>

        <!-- Tracing Banner -->
        <div style="background-color: var(--color-brand-light); border: 1px solid var(--color-brand-border); border-radius: var(--radius-lg); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i data-lucide="loader" class="spin-animation" style="width: 16px; height: 16px; color: var(--color-brand);"></i>
            <span style="font-size: 0.875rem; font-weight: 500; color: var(--color-text-primary);">Waiting for traces... No traces detected yet. Follow the guide to start tracing your application.</span>
          </div>
          <a href="https://docs.smith.aetherflow.com/" target="_blank" style="font-size: 0.8125rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem;">
            <span>View docs</span>
            <i data-lucide="external-link" style="width: 12px; height: 12px;"></i>
          </a>
        </div>

        <!-- Guide contents -->
        <div class="section-panel" style="margin-bottom: 0;">
          <h2 class="tracing-guide-title">Configure Tracing</h2>
          <p class="tracing-guide-subtitle">Select your framework and language to generate setup instructions.</p>

          <!-- Framework Grid -->
          <div class="framework-grid">
            ${Object.keys(FrameworksData).map(key => {
              const isActive = key === activeFramework;
              return `
                <button class="framework-btn ${isActive ? 'active' : ''}" data-framework="${key}">
                  <span class="framework-icon-placeholder">${FrameworksData[key].name.charAt(0)}</span>
                  <span>${FrameworksData[key].name}</span>
                </button>
              `;
            }).join('')}
            <button class="framework-btn" style="opacity: 0.6; cursor: not-allowed;">
              <span class="framework-icon-placeholder">O</span>
              <span>OpenTelemetry</span>
            </button>
            <button class="framework-btn" style="opacity: 0.6; cursor: not-allowed;">
              <span class="framework-icon-placeholder">P</span>
              <span>Pipecat</span>
            </button>
            <button class="framework-btn" style="opacity: 0.6; cursor: not-allowed;">
              <span class="framework-icon-placeholder">L</span>
              <span>LiveKit</span>
            </button>
          </div>

          <!-- Language Selector -->
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-secondary);">Select a language:</span>
            <div style="display: inline-flex; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; background: #ffffff;">
              <button class="btn btn-xs" id="langPythonBtn" style="padding: 0.375rem 0.75rem; font-weight: 600; background: ${activeLanguage === 'python' ? 'var(--color-brand-light)' : '#ffffff'}; color: ${activeLanguage === 'python' ? 'var(--color-brand)' : 'var(--color-text-secondary)'};">
                Python
              </button>
              <button class="btn btn-xs" id="langTSBtn" style="padding: 0.375rem 0.75rem; font-weight: 600; background: ${activeLanguage === 'typescript' ? 'var(--color-brand-light)' : '#ffffff'}; color: ${activeLanguage === 'typescript' ? 'var(--color-brand)' : 'var(--color-text-secondary)'};">
                TypeScript
              </button>
            </div>
          </div>

          <!-- Install Dependencies -->
          <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--color-text-primary);">Install dependencies</h4>
          <div class="code-block-container">
            <div class="code-block-header">
              <div class="code-block-tabs">
                <span class="code-block-tab active">${activeLanguage === 'python' ? 'pip' : 'npm'}</span>
                ${activeLanguage === 'python' ? '<span class="code-block-tab">uv</span>' : ''}
              </div>
              <span class="code-block-copy-btn" id="copyDepsBtn"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></span>
            </div>
            <pre class="code-block-content"><code id="codeDeps">${dependenciesCode}</code></pre>
          </div>

          <!-- Configure environment -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <h4 style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">Configure environment</h4>
            <button class="btn btn-primary btn-xs" id="genApiKeyBtn" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
              <i data-lucide="key" style="width: 12px; height: 12px;"></i>
              <span>${apiKeyGenerated ? 'Regenerate API Key' : 'Generate API Key'}</span>
            </button>
          </div>
          <div class="code-block-container">
            <div class="code-block-header">
              <div class="code-block-tabs">
                <span class="code-block-tab active">Shell</span>
                <span class="code-block-tab">.env</span>
              </div>
              <span class="code-block-copy-btn" id="copyEnvBtn"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></span>
            </div>
            <pre class="code-block-content"><code id="codeEnv">${envCode}</code></pre>
          </div>

          <!-- Run the quickstart -->
          <h4 style="font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--color-text-primary);">Run the quickstart</h4>
          <div class="code-block-container" style="margin-bottom: 0;">
            <div class="code-block-header">
              <div class="code-block-tabs">
                <span class="code-block-tab active">${activeLanguage === 'python' ? 'quickstart.py' : 'quickstart.ts'}</span>
              </div>
              <span class="code-block-copy-btn" id="copyQuickstartBtn"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></span>
            </div>
            <pre class="code-block-content"><code id="codeQuickstart">${quickstartCode}</code></pre>
          </div>
        </div>
      </div>
    `;

    // Attach local events
    document.querySelectorAll('.framework-btn[data-framework]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const frame = btn.getAttribute('data-framework');
        if (frame) {
          activeFramework = frame;
          updatePageContent();
        }
      });
    });

    document.getElementById('langPythonBtn').addEventListener('click', () => {
      activeLanguage = 'python';
      updatePageContent();
    });

    document.getElementById('langTSBtn').addEventListener('click', () => {
      activeLanguage = 'typescript';
      updatePageContent();
    });

    document.getElementById('genApiKeyBtn').addEventListener('click', () => {
      apiKeyGenerated = true;
      updatePageContent();
    });

    // Copy event handlers
    const setupCopyBtn = (btnId, codeId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', () => {
          const codeText = document.getElementById(codeId).innerText;
          navigator.clipboard.writeText(codeText);
          alert('Copied to clipboard!');
        });
      }
    };
    setupCopyBtn('copyDepsBtn', 'codeDeps');
    setupCopyBtn('copyEnvBtn', 'codeEnv');
    setupCopyBtn('copyQuickstartBtn', 'codeQuickstart');

    // Route dashboardBtn click to monitoring
    const dashBtn = document.getElementById('dashboardBtn');
    if (dashBtn) {
      dashBtn.addEventListener('click', () => {
        window.location.hash = '#/monitoring';
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  updatePageContent();
}
