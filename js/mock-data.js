// Mock database for the AetherFlow Dashboard clone
// Load from localStorage if present to ensure state persistence across pages and reloads
const getStored = (key, fallback) => {
  const val = localStorage.getItem(key);
  try {
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const MockDatabase = {
  projects: getStored('aetherflow_projects', [
    { id: 'proj-1', name: 'claude-agent-travel', traces: 1420, errors: 12, cost: 4.82, latency: 1240, status: 'active' },
    { id: 'proj-2', name: 'customer-support-main', traces: 9482, errors: 312, cost: 28.91, latency: 980, status: 'active' },
    { id: 'proj-3', name: 'deep-researcher-rust', traces: 125, errors: 4, cost: 18.44, latency: 14200, status: 'idle' }
  ]),
  
  datasets: getStored('aetherflow_datasets', [
    { id: 'ds-1', name: 'travel-golden-eval-set', examples: 120, experiments: 4, created: '2026-05-18' },
    { id: 'ds-2', name: 'hallucination-adversarial-tests', examples: 45, experiments: 2, created: '2026-05-22' },
    { id: 'ds-3', name: 'sql-agent-benchmark', examples: 250, experiments: 8, created: '2026-05-25' }
  ]),

  prompts: getStored('aetherflow_prompts', [
    { id: 'prm-1', name: 'travel-planner-system', versions: 5, lastModified: '2026-05-27', author: 'Ashutosh' },
    { id: 'prm-2', name: 'rag-document-summarizer', versions: 2, lastModified: '2026-05-26', author: 'Ashutosh' },
    { id: 'prm-3', name: 'mcp-tool-router', versions: 12, lastModified: '2026-05-28', author: 'Ashutosh' }
  ]),

  deployments: getStored('aetherflow_deployments', [
    { id: 'dep-1', name: 'travel-agent-prod', url: 'https://travel-agent-f3a2.aetherflow.run', status: 'Active', threads: 14, uptime: '6d 12h' },
    { id: 'dep-2', name: 'support-bot-staging', url: 'https://support-staging-a1b2.aetherflow.run', status: 'Paused', threads: 0, uptime: '14d 2h' }
  ]),

  sandboxes: getStored('aetherflow_sandboxes', [
    { id: 'sb-1', name: 'py-exec-env-1', status: 'Running', cpu: '0.4 vCPU', ram: '512 MB', uptime: '1h 12m' },
    { id: 'sb-2', name: 'node-sandbox-safe', status: 'Terminated', cpu: '1 vCPU', ram: '1 GB', uptime: '0h' }
  ]),

  dataset_examples: getStored('aetherflow_dataset_examples', {
    'travel-golden-eval-set': [
      { id: 'ex-1', input: '{"user_query": "Book a ticket to Paris"}', output: '{"status": "booked", "destination": "Paris"}', referenceOutput: '{"success": true}', split: 'base' },
      { id: 'ex-2', input: '{"user_query": "Find flight to Tokyo"}', output: '{"flights": []}', referenceOutput: '{"success": true}', split: 'base' }
    ],
    'hallucination-adversarial-tests': [],
    'sql-agent-benchmark': []
  }),

  dataset_evaluators: getStored('aetherflow_dataset_evaluators', {
    'travel-golden-eval-set': [
      { id: 'ev-1', name: 'PII Leakage', key: 'pii_leakage', model: 'gpt-5.5', responseFormat: 'Boolean', description: 'Did the input or output contain PII following ALL stipulations of the Golden Rule and rubric?' }
    ],
    'hallucination-adversarial-tests': [],
    'sql-agent-benchmark': []
  }),

  workspaceName: localStorage.getItem('aetherflow_workspace_name') || 'My First App',

  apiKeys: getStored('aetherflow_api_keys', [
    { id: 'key-1', name: 'default-api-key', value: 'ls__personal_key_ab12cd34ef56gh78ij90kl', created: '2026-05-20', lastUsed: '2026-05-28' }
  ]),

  providerKeys: getStored('aetherflow_provider_keys', [
    { id: 'prov-key-1', provider: 'OpenAI', value: 'sk-proj-U8dfH7vCq2kLxZnP9wT3bY5qR1e4sZ7m6a8c9e0x', created: '2026-05-22' },
    { id: 'prov-key-2', provider: 'Anthropic', value: 'sk-ant-api03-P9wT3bY5qR1e4sZ7m6a8c9e0xU8dfH7vCq', created: '2026-05-24' }
  ]),

  modelConfigurations: getStored('aetherflow_model_configurations', [
    { id: 'mc-1', name: 'Default GPT-4o Config', provider: 'OpenAI', model: 'gpt-4o', features: ['Playground', 'Evaluators'], created: '2026-05-22' },
    { id: 'mc-2', name: 'Claude Travel Assistant', provider: 'Anthropic', model: 'claude-3-5-sonnet', features: ['Playground', 'Assistant'], created: '2026-05-25' }
  ]),

  integrations: getStored('aetherflow_integrations', {
    slackWebhook: '',
    githubRepo: '',
    githubToken: '',
    pagerdutyKey: ''
  }),

  save() {
    localStorage.setItem('aetherflow_projects', JSON.stringify(this.projects));
    localStorage.setItem('aetherflow_datasets', JSON.stringify(this.datasets));
    localStorage.setItem('aetherflow_prompts', JSON.stringify(this.prompts));
    localStorage.setItem('aetherflow_deployments', JSON.stringify(this.deployments));
    localStorage.setItem('aetherflow_sandboxes', JSON.stringify(this.sandboxes));
    localStorage.setItem('aetherflow_dataset_examples', JSON.stringify(this.dataset_examples));
    localStorage.setItem('aetherflow_dataset_evaluators', JSON.stringify(this.dataset_evaluators));
    localStorage.setItem('aetherflow_api_keys', JSON.stringify(this.apiKeys));
    localStorage.setItem('aetherflow_provider_keys', JSON.stringify(this.providerKeys));
    localStorage.setItem('aetherflow_model_configurations', JSON.stringify(this.modelConfigurations));
    localStorage.setItem('aetherflow_integrations', JSON.stringify(this.integrations));
    localStorage.setItem('aetherflow_workspace_name', this.workspaceName);
  },

  generateTimeSeriesMetrics(days = 7) {
    const labels = [];
    const successData = [];
    const errorData = [];
    const latencyP50 = [];
    const latencyP95 = [];
    const errorRates = [];
    
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
      
      const success = Math.floor(Math.random() * 400) + 600;
      const error = Math.floor(Math.random() * 40) + 10;
      successData.push(success);
      errorData.push(error);
      
      latencyP50.push(Math.floor(Math.random() * 200) + 400); // 400 - 600ms
      latencyP95.push(Math.floor(Math.random() * 600) + 1200); // 1200 - 1800ms
      
      errorRates.push(((error / (success + error)) * 100).toFixed(2));
    }

    return {
      labels,
      successData,
      errorData,
      latencyP50,
      latencyP95,
      errorRates
    };
  }
};
