import { renderHeader } from '../components/header.js';

export function renderDocsPage() {
  // Hide top header and quick stats bar on docs page
  const header = document.getElementById('topHeader');
  const quickStats = document.getElementById('quickStatsBar');
  if (header) header.style.display = 'none';
  if (quickStats) quickStats.classList.add('hidden');

  // Hide sidebar on docs page since it is a public landing subpage
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = 'none';

  const pageContainer = document.getElementById('pageContent');
  pageContainer.style.padding = '0';
  pageContainer.style.maxWidth = '100%';

  // Define some key documentation pages extracted from llms.txt to enable the interactive explorer
  const docsIndex = [
    { title: 'Create Connection', path: '/api-reference/agent-connections-v2/create-connection.md', desc: 'Create a new integration connection for Agent Servers.', category: 'API Reference' },
    { title: 'List Connections', path: '/api-reference/agent-connections-v2/list-connections.md', desc: 'List active third-party auth and tool connections.', category: 'API Reference' },
    { title: 'Authenticate', path: '/api-reference/auth-service-v2/authenticate.md', desc: 'Get OAuth tokens or trigger authentication flow.', category: 'API Reference' },
    { title: 'Create Deployment', path: '/api-reference/deployments-v2/create-deployment.md', desc: 'Deploy an agent server dynamically from git.', category: 'API Reference' },
    { title: 'List Deployments', path: '/api-reference/deployments-v2/list-deployments.md', desc: 'List all running agent deployments in the workspace.', category: 'API Reference' },
    { title: 'Access Current Span', path: '/aetherflow/access-current-span.md', desc: 'Access active run traces programmatically from inside a python function.', category: 'AetherFlow' },
    { title: 'Add Metadata and Tags', path: '/aetherflow/add-metadata-tags.md', desc: 'Tag run traces with metadata to filter experiments.', category: 'AetherFlow' },
    { title: 'Agent Server', path: '/aetherflow/agent-server.md', desc: 'durable checkpointing and async execution specifications.', category: 'AetherFlow' },
    { title: 'Use Server-side Caching', path: '/aetherflow/caching.md', desc: 'Cache tool response values server-side for performance.', category: 'AetherFlow' },
    { title: 'AetherGraph CLI', path: '/aetherflow/cli.md', desc: 'Command line tool to deploy and manage local servers.', category: 'AetherFlow' },
    { title: 'Compare Experiment Results', path: '/aetherflow/compare-experiment-results.md', desc: 'Side-by-side evaluator score matrix comparison.', category: 'AetherFlow' },
    { title: 'Cost Tracking', path: '/aetherflow/cost-tracking.md', desc: 'Track spending thresholds for LLMs and endpoints.', category: 'AetherFlow' },
    { title: 'LLM Gateway', path: '/aetherflow/llm-gateway.md', desc: 'Proxy LLM calls, redact secrets, and apply spend limits.', category: 'AetherFlow' },
    { title: 'Evaluate Chatbots', path: '/aetherflow/evaluate-chatbot-tutorial.md', desc: 'End-to-end tutorial on testing conversational flow.', category: 'AetherFlow' },
    { title: 'Evaluation Quickstart', path: '/aetherflow/evaluation-quickstart.md', desc: 'Set up automated grading flows with models and regex.', category: 'AetherFlow' },
    { title: 'Arcade Integration', path: '/aetherflow/fleet/arcade.md', desc: 'Connect Fleet agents to Gmail, Slack, and third-party tools.', category: 'Fleet' },
    { title: 'AetherFlow Fleet', path: '/aetherflow/fleet/index.md', desc: 'Visual AI agent orchestration, scheduling, andMCP integration.', category: 'Fleet' },
    { title: 'Skills Catalog', path: '/aetherflow/fleet/skills.md', desc: 'Register prompt schemas and python packages as agent skills.', category: 'Fleet' },
    { title: 'Slack Agent App', path: '/aetherflow/fleet/slack-app.md', desc: 'Configure Slack webhooks to let agents reply in channels.', category: 'Fleet' },
    { title: 'AetherFlow MCP Server', path: '/aetherflow/aetherflow-mcp-server.md', desc: 'Let models fetch history, runs, and datasets via MCP.', category: 'AetherFlow' }
  ];

  // Inject beautiful dark-themed landing page CSS and layout
  pageContainer.innerHTML = `
    <div class="landing-body docs-page-body">
      <!-- 1. Top Announcement Bar -->
      <div class="announcement-bar">
        <span>Catch up on everything we shipped at Interrupt</span>
        <a href="https://www.aetherflow.com/blog/interrupt-2026-overview" target="_blank" class="announcement-link">
          Explore the launches <svg class="sidebar-footer-icon" style="width:12px; height:12px; display:inline; fill:none; stroke:currentColor; stroke-width:2.5;" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </a>
      </div>

      <!-- 2. Navbar -->
      <nav class="landing-navbar">
        <div class="navbar-left" style="cursor: pointer;" onclick="window.location.hash='#/landing'">
          <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2b26acc19233c104b1cd_logo.svg" alt="AetherFlow Logo" class="brand-logo">
          <span class="brand-name">AetherFlow</span>
        </div>

        <div class="navbar-center">
          <a href="#/landing" class="nav-link">Products</a>
          <a href="#/landing" class="nav-link">Learn</a>
          <a href="#/docs" class="nav-link active" style="color: var(--nav-active-color);">Docs</a>
          <a href="#/landing" class="nav-link">Company</a>
          <a href="#/pricing" class="nav-link">Pricing</a>
        </div>

        <div class="navbar-right">
          <!-- Theme Toggle for Docs page -->
          <button id="docsThemeToggleBtn" class="nav-theme-btn" title="Toggle Theme" style="cursor: pointer; padding: 0.5rem; display: flex; align-items: center; border-radius: var(--radius-md); border: 1px solid var(--nav-border-color); color: var(--nav-text-color);">
            <svg class="theme-icon-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; display: block;"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
            <svg class="theme-icon-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; display: none;"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
          </button>
          <button class="nav-btn-secondary" id="tryAetherFlowBtn">Try AetherFlow</button>
          <button class="nav-btn-primary" id="getDemoBtn">Get a demo</button>
        </div>
      </nav>

      <!-- 3. Documentation Hero -->
      <section class="docs-hero">
        <div class="hero-glow"></div>
        <div class="docs-hero-content">
          <span class="docs-pretitle">Developer Guides</span>
          <h1 class="docs-title">AetherFlow Docs</h1>
          <p class="docs-subtitle">AetherFlow is a framework-agnostic platform for building, debugging, and deploying AI agents and LLM applications.</p>
          
          <!-- Interactive Search bar for Docs -->
          <div class="docs-search-wrapper">
            <svg class="docs-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="docsSearchInput" class="docs-search-input" placeholder="Search documentation index...">
          </div>
        </div>
      </section>

      <div class="docs-main-container">
        <!-- 4. Get Started steps -->
        <section class="docs-section">
          <h2 class="docs-section-title">Get Started</h2>
          <div class="steps-container">
            <!-- Step 1 -->
            <div class="step-card">
              <div class="step-badge">1</div>
              <div class="step-content">
                <div class="step-header">
                  <svg class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                  <h4>Create an account</h4>
                </div>
                <p>Sign up at <a href="https://smith.aetherflow.com" target="_blank">smith.aetherflow.com</a> (no credit card required). You can log in with <strong>Google</strong>, <strong>GitHub</strong>, or <strong>email</strong>.</p>
              </div>
            </div>
            <!-- Step 2 -->
            <div class="step-card">
              <div class="step-badge">2</div>
              <div class="step-content">
                <div class="step-header">
                  <svg class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                  <h4>Create an API key</h4>
                </div>
                <p>Go to your Settings page &rarr; <strong>API Keys</strong> &rarr; <strong>Create API Key</strong>. Copy the key and save it securely.</p>
              </div>
            </div>
            <!-- Step 3 -->
            <div class="step-card">
              <div class="step-badge">3</div>
              <div class="step-content">
                <div class="step-header">
                  <svg class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5M9 17h6M12 13V2M7 8h10M5 5h14"/></svg>
                  <h4>Choose your integration</h4>
                </div>
                <p>AetherFlow works with many frameworks and providers. Browse integrations to connect your model stack.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. Core Services Quickstarts -->
        <section class="docs-section">
          <h2 class="docs-section-title">Core Services</h2>
          <div class="docs-grid-3">
            <!-- Observability -->
            <div class="docs-feature-card">
              <div class="feature-icon-wrapper">
                <img src="https://mintcdn.com/aetherflow-5e9cc07a/nQm-sjd_MByLhgeW/images/brand/observability-icon-dark.png?fit=max&auto=format&n=nQm-sjd_MByLhgeW&q=85&s=ccbc183bca2a5e4ca78d30149e3836cc" alt="Observability">
              </div>
              <h3>Observability</h3>
              <p>Gain visibility into every step your application takes to debug faster, examine prompts, and improve reliability.</p>
              <a href="#/tracing" class="docs-cta-link">Start tracing &rarr;</a>
            </div>
            <!-- Evaluation -->
            <div class="docs-feature-card">
              <div class="feature-icon-wrapper">
                <img src="https://mintcdn.com/aetherflow-5e9cc07a/nQm-sjd_MByLhgeW/images/brand/evaluation-icon-dark.png?fit=max&auto=format&n=nQm-sjd_MByLhgeW&q=85&s=4918f932fff73a33d6a24e2fcf68f6a4" alt="Evaluation">
              </div>
              <h3>Evaluation</h3>
              <p>Measure and track quality over time to ensure your AI applications are consistent, robust, and trustworthy.</p>
              <a href="#/evaluators" class="docs-cta-link">Evaluate your app &rarr;</a>
            </div>
            <!-- Deployment -->
            <div class="docs-feature-card">
              <div class="feature-icon-wrapper">
                <img src="https://mintcdn.com/aetherflow-5e9cc07a/nQm-sjd_MByLhgeW/images/brand/deployment-icon-dark.png?fit=max&auto=format&n=nQm-sjd_MByLhgeW&q=85&s=024e3712d388bfa55f4f160cc9d6a85b" alt="Deployment">
              </div>
              <h3>Deployment</h3>
              <p>Deploy your agents as high-performance Agent Servers, ready to scale in production with memory checkpointing.</p>
              <a href="#/deployments" class="docs-cta-link">Deploy your agents &rarr;</a>
            </div>
          </div>
        </section>

        <!-- 6. More Ways to Build & Infrastructure -->
        <section class="docs-section">
          <h2 class="docs-section-title">More Ways to Build</h2>
          <div class="docs-grid-4">
            <!-- Fleet -->
            <div class="docs-subfeature-card">
              <img src="https://mintcdn.com/aetherflow-5e9cc07a/_jaNDz0QENsVkDXY/images/brand/fleet-icon-dark.png?fit=max&auto=format&n=_jaNDz0QENsVkDXY&q=85&s=98e3bbb4ae01325a8ff867e80681778f" class="subfeature-icon" alt="Fleet">
              <h4>Fleet</h4>
              <p>Design and deploy AI agents visually without writing code.</p>
              <a href="#/home">Build an agent &rarr;</a>
            </div>
            <!-- Prompt Engineering -->
            <div class="docs-subfeature-card">
              <img src="https://mintcdn.com/aetherflow-5e9cc07a/nQm-sjd_MByLhgeW/images/brand/prompt-engineering-icon.png?fit=max&auto=format&n=nQm-sjd_MByLhgeW&q=85&s=eaa7ac978bebe5a7cd84d8eeaaef84c2" class="subfeature-icon" alt="Prompt Hub">
              <h4>Prompt Hub</h4>
              <p>Iterate on prompts with versioning and playground testing.</p>
              <a href="#/prompts">Test your prompts &rarr;</a>
            </div>
            <!-- CLI -->
            <div class="docs-subfeature-card">
              <div class="subfeature-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              </div>
              <h4>AetherFlow CLI</h4>
              <p>Query and manage traces, datasets, and threads from the terminal.</p>
              <a href="#/keyboard-shortcuts">Use the CLI &rarr;</a>
            </div>
            <!-- Studio -->
            <div class="docs-subfeature-card">
              <div class="subfeature-icon-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
              </div>
              <h4>Studio</h4>
              <p>Visual canvas interface to build and trace graphs locally.</p>
              <a href="#/studio">Develop with Studio &rarr;</a>
            </div>
          </div>
        </section>

        <!-- 7. Infrastructure -->
        <section class="docs-section">
          <h2 class="docs-section-title">Infrastructure</h2>
          <div class="docs-grid-2">
            <div class="infra-card">
              <svg class="infra-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              <div>
                <h4>Platform setup</h4>
                <p>Use AetherFlow in managed cloud, in a self-hosted environment, or hybrid to match your compliance needs.</p>
                <a href="#/settings" class="docs-inline-cta">Choose platform setup</a>
              </div>
            </div>
            <div class="infra-card">
              <svg class="infra-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <div>
                <h4>Security & compliance</h4>
                <p>AetherFlow meets the highest standards with SOC 2 Type II, HIPAA, and GDPR compliance registries.</p>
                <a href="https://trust.aetherflow.com" target="_blank" class="docs-inline-cta">Visit Trust Center &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        <!-- 8. Interactive Documentation Index Explorer -->
        <section class="docs-section" style="border-top: 1px solid var(--docs-border-color); padding-top: 4rem;">
          <div class="index-header-bar">
            <div>
              <h2 class="docs-section-title" style="margin-bottom: 0.25rem;">Documentation Index</h2>
              <p style="color: var(--docs-muted-color); font-size: 0.875rem;">Fetch the complete documentation index at <a href="https://docs.aetherflow.com/llms.txt" target="_blank" style="color: #60a5fa; text-decoration: underline;">docs.aetherflow.com/llms.txt</a>. Search or select a page below to preview its guide.</p>
            </div>
          </div>

          <div class="index-explorer-layout">
            <!-- Left side list of matches -->
            <div class="index-explorer-sidebar">
              <div class="index-filter-tabs">
                <button class="filter-tab active" data-cat="all">All Pages</button>
                <button class="filter-tab" data-cat="API Reference">API Reference</button>
                <button class="filter-tab" data-cat="AetherFlow">AetherFlow</button>
                <button class="filter-tab" data-cat="Fleet">Fleet</button>
              </div>
              <div class="index-list-wrapper" id="docsIndexList">
                <!-- Dynamically populated -->
              </div>
            </div>

            <!-- Right side simulated preview panel -->
            <div class="index-explorer-preview" id="docsPreviewPanel">
              <div class="preview-empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; color: var(--docs-muted-color);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <h4 style="margin-top: 1rem; font-weight: 600;">Select a page to read</h4>
                <p style="font-size: 0.75rem; color: var(--docs-muted-color); max-width: 240px; margin-top: 0.25rem;">Click on any guide in the index list to view the mock official documentation content.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 9. Workflow Diagram -->
        <section class="docs-section" style="border-top: 1px solid var(--docs-border-color); padding-top: 4rem; text-align: center;">
          <h2 class="docs-section-title">Workflow</h2>
          <p style="color: var(--docs-muted-color); max-width: 700px; margin: 0 auto 2.5rem auto;">AetherFlow combines observability, evaluation, deployment, and platform setup in one integrated workflow—from local development to production.</p>
          
          <div class="workflow-img-container">
            <!-- Light theme workflow diagram -->
            <img class="workflow-img-light" src="https://mintcdn.com/aetherflow-5e9cc07a/ihKLTR9qUJ2_xg3v/aetherflow/images/overview-light.png?fit=max&auto=format&n=ihKLTR9qUJ2_xg3v&q=85&s=43b537cc73859d51521b6d78a5802b15" alt="AetherFlow Workflow Diagram Light" style="max-width: 100%; height: auto; border-radius: var(--radius-lg); border: 1px solid var(--docs-border-color);">
            <!-- Dark theme workflow diagram -->
            <img class="workflow-img-dark" src="https://mintcdn.com/aetherflow-5e9cc07a/ihKLTR9qUJ2_xg3v/aetherflow/images/overview-dark.png?fit=max&auto=format&n=ihKLTR9qUJ2_xg3v&q=85&s=fa519fc59d872d67ae282aac499ad2aa" alt="AetherFlow Workflow Diagram Dark" style="max-width: 100%; height: auto; border-radius: var(--radius-lg); border: 1px solid var(--docs-border-color); display: none;">
          </div>
        </section>

        <!-- 10. Callouts -->
        <section class="docs-section" style="margin-bottom: 6rem;">
          <div class="docs-callout-grid">
            <div class="docs-callout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="callout-icon" style="color: #60a5fa;"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <span>Connect these docs to Claude, VSCode, and more via MCP for real-time answers. <a href="#/evaluators" style="color: #60a5fa; text-decoration: underline;">Connect via MCP</a></span>
            </div>
            <div class="docs-callout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="callout-icon" style="color: #10b981;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              <span>Edit this page on GitHub or file an issue in our tracking system. <a href="https://github.com/aetherflow-ai/docs" target="_blank" style="color: #10b981; text-decoration: underline;">Contribute on GitHub</a></span>
            </div>
          </div>
        </section>
      </div>

      <!-- 11. Footer -->
      <footer class="landing-footer">
        <div class="footer-bottom">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #10b981;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
            <span>All systems operational</span>
          </div>
          <div style="display: flex; gap: 1rem; color: var(--docs-muted-color); font-size: 0.75rem;">
            <span>Privacy policy</span>
            <span>Terms of service</span>
          </div>
        </div>
      </footer>

      <!-- Login Modal Overlay (Re-used for Navbar Buttons) -->
      <div class="login-modal-overlay hidden" id="loginModalOverlay">
        <div class="login-modal-card">
          <button class="login-modal-close" id="closeLoginModalBtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2b26acc19233c104b1cd_logo.svg" alt="AetherFlow" style="height: 32px; width: auto; margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">Sign In to AetherFlow</h3>
            <p style="font-size: 0.8125rem; color: #64748b;">Choose a sign in provider to access your workspaces.</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn btn-secondary" id="googleOauthBtn" style="background: #ffffff; color: #0f172a; border-color: #cbd5e1; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-weight: 600; font-size: 0.875rem;">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.62v3.02h3.87c2.26-2.08 3.58-5.14 3.58-8.49z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.27v3.13C3.25 21.28 7.37 24 12 24z"/>
                <path fill="#FBBC05" d="M5.24 14.22A7.16 7.16 0 0 1 4.8 12c0-.79.13-1.57.38-2.31V6.56H1.27A11.96 11.96 0 0 0 0 12c0 2.05.52 4 1.27 5.75l3.97-3.53z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.37 0 3.25 2.72 1.27 6.56l3.97 3.53c.95-2.88 3.61-5.01 6.76-5.01z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button class="btn btn-secondary" id="githubOauthBtn" style="background: #24292f; color: #ffffff; border-color: #24292f; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-weight: 600; font-size: 0.875rem;">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; color: #94a3b8; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; margin: 1rem 0;">
            <span style="height: 1px; background: #e2e8f0; flex: 1;"></span>
            <span>OR</span>
            <span style="height: 1px; background: #e2e8f0; flex: 1;"></span>
          </div>
          <form style="display: flex; flex-direction: column; gap: 0.75rem;" onsubmit="event.preventDefault(); document.getElementById('modalEmailSubmitBtn').click();">
            <input type="email" class="form-input" placeholder="Work Email" style="width: 100%;" required>
            <button class="btn btn-primary" id="modalEmailSubmitBtn" style="width: 100%; font-weight: 600;">
              Continue with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  // Inject Docs Page specific styling variables and structure layout rules
  const styleEl = document.createElement('style');
  styleEl.id = 'docsPageStyles';
  styleEl.innerHTML = `
    :root {
      --docs-bg-color: #030712;
      --docs-card-bg: #090d16;
      --docs-text-color: #ffffff;
      --docs-muted-color: #94a3b8;
      --docs-border-color: rgba(255, 255, 255, 0.05);
      --nav-active-color: #ffffff;
      --nav-border-color: rgba(255, 255, 255, 0.1);
      --nav-text-color: #94a3b8;
    }

    body:not(.dark-mode) .docs-page-body {
      --docs-bg-color: #f8fafc;
      --docs-card-bg: #ffffff;
      --docs-text-color: #0f172a;
      --docs-muted-color: #475569;
      --docs-border-color: #e2e8f0;
      --nav-active-color: #1d4ed8;
      --nav-border-color: #cbd5e1;
      --nav-text-color: #475569;
    }

    .docs-page-body {
      background-color: var(--docs-bg-color);
      color: var(--docs-text-color);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: var(--font-sans);
      transition: background-color 0.2s, color 0.2s;
    }

    .docs-hero {
      position: relative;
      padding: 6rem 2rem 4rem 2rem;
      text-align: center;
      overflow: hidden;
      background: radial-gradient(circle at top, rgba(37,99,235,0.06) 0%, transparent 60%);
    }

    .docs-hero-content {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .docs-pretitle {
      font-size: 0.8125rem;
      font-weight: 700;
      color: #3b82f6;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .docs-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin: 0.5rem 0 1.5rem 0;
      background: linear-gradient(135deg, var(--docs-text-color) 40%, var(--docs-muted-color) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .docs-subtitle {
      font-size: 1.15rem;
      color: var(--docs-muted-color);
      max-width: 600px;
      margin: 0 auto 2.5rem auto;
      line-height: 1.5;
    }

    .docs-search-wrapper {
      position: relative;
      max-width: 480px;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }

    .docs-search-icon {
      position: absolute;
      left: 1rem;
      width: 16px;
      height: 16px;
      color: var(--docs-muted-color);
      pointer-events: none;
    }

    .docs-search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      background-color: var(--docs-card-bg);
      color: var(--docs-text-color);
      outline: none;
      font-size: 0.875rem;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .docs-search-input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }

    .docs-main-container {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .docs-section {
      padding: 3rem 0;
    }

    .docs-section-title {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 2rem;
      letter-spacing: -0.02em;
    }

    /* Steps Layout */
    .steps-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .step-card {
      background: var(--docs-card-bg);
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      transition: transform 0.2s, border-color 0.2s;
    }

    .step-card:hover {
      transform: translateY(-2px);
      border-color: rgba(37, 99, 235, 0.3);
    }

    .step-badge {
      background-color: #2563eb;
      color: #ffffff;
      font-size: 0.8125rem;
      font-weight: 700;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .step-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-align: left;
    }

    .step-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .step-icon {
      width: 16px;
      height: 16px;
      color: #2563eb;
    }

    .step-content h4 {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--docs-text-color);
      margin: 0;
    }

    .step-content p {
      font-size: 0.8125rem;
      color: var(--docs-muted-color);
      line-height: 1.5;
    }

    .step-content a {
      color: #3b82f6;
      text-decoration: underline;
    }

    /* Grids */
    .docs-grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .docs-grid-4 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
    }

    .docs-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    /* Core Card styling */
    .docs-feature-card {
      background: var(--docs-card-bg);
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      padding: 2.25rem 2rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
    }

    .docs-feature-card:hover {
      transform: translateY(-4px);
      border-color: rgba(37, 99, 235, 0.4);
      box-shadow: var(--shadow-md);
    }

    .feature-icon-wrapper {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background-color: rgba(37, 99, 235, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon-wrapper img {
      width: 24px;
      height: 24px;
    }

    .docs-feature-card h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0;
    }

    .docs-feature-card p {
      font-size: 0.875rem;
      color: var(--docs-muted-color);
      line-height: 1.6;
    }

    .docs-cta-link {
      color: #60a5fa;
      font-weight: 600;
      font-size: 0.875rem;
      text-decoration: none;
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .docs-cta-link:hover {
      text-decoration: underline;
    }

    /* Subfeatures (More Ways to Build) */
    .docs-subfeature-card {
      background: var(--docs-card-bg);
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: transform 0.2s;
    }

    .docs-subfeature-card:hover {
      transform: translateY(-2px);
      border-color: rgba(255,255,255,0.1);
    }

    .subfeature-icon {
      width: 24px;
      height: 24px;
    }

    .subfeature-icon-placeholder {
      width: 24px;
      height: 24px;
      color: #3b82f6;
    }

    .docs-subfeature-card h4 {
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0;
    }

    .docs-subfeature-card p {
      font-size: 0.8125rem;
      color: var(--docs-muted-color);
      line-height: 1.45;
    }

    .docs-subfeature-card a {
      font-size: 0.8125rem;
      color: #60a5fa;
      font-weight: 600;
      text-decoration: none;
      margin-top: auto;
    }

    /* Infrastructure Cards */
    .infra-card {
      background: var(--docs-card-bg);
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      padding: 1.75rem 1.5rem;
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
      text-align: left;
      transition: border-color 0.2s;
    }

    .infra-card:hover {
      border-color: rgba(255,255,255,0.1);
    }

    .infra-icon {
      width: 24px;
      height: 24px;
      color: #2563eb;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .infra-card h4 {
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    .infra-card p {
      font-size: 0.8125rem;
      color: var(--docs-muted-color);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    .docs-inline-cta {
      font-size: 0.8125rem;
      color: #60a5fa;
      font-weight: 600;
      text-decoration: none;
    }

    .docs-inline-cta:hover {
      text-decoration: underline;
    }

    /* Index Explorer Layout */
    .index-explorer-layout {
      display: grid;
      grid-template-columns: 1fr;
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      background-color: var(--docs-card-bg);
      overflow: hidden;
      height: 540px;
    }

    @media (min-width: 768px) {
      .index-explorer-layout {
        grid-template-columns: 280px 1fr;
      }
    }

    .index-explorer-sidebar {
      border-right: 1px solid var(--docs-border-color);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .index-filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      padding: 0.75rem;
      border-bottom: 1px solid var(--docs-border-color);
      background-color: rgba(0,0,0,0.05);
    }

    .filter-tab {
      background: transparent;
      border: none;
      padding: 0.375rem 0.625rem;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 4px;
      color: var(--docs-muted-color);
      cursor: pointer;
    }

    .filter-tab:hover {
      color: var(--docs-text-color);
    }

    .filter-tab.active {
      background-color: rgba(37,99,235,0.15);
      color: #3b82f6;
    }

    .index-list-wrapper {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .index-list-item {
      padding: 0.625rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      text-align: left;
      font-size: 0.8125rem;
      transition: background-color 0.15s;
    }

    .index-list-item:hover {
      background-color: rgba(255,255,255,0.03);
    }

    .index-list-item.active {
      background-color: rgba(37,99,235,0.1);
      color: #3b82f6;
      font-weight: 600;
    }

    .index-list-item-title {
      display: block;
      color: var(--docs-text-color);
    }

    .index-list-item-path {
      display: block;
      font-size: 0.6875rem;
      color: var(--docs-muted-color);
      margin-top: 0.125rem;
      font-family: var(--font-mono);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .index-explorer-preview {
      padding: 2.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-align: left;
    }

    .preview-empty-state {
      margin: auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--docs-muted-color);
    }

    .preview-header {
      border-bottom: 1px solid var(--docs-border-color);
      padding-bottom: 1rem;
      margin-bottom: 1.5rem;
    }

    .preview-category-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      color: #3b82f6;
      background: rgba(37,99,235,0.1);
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      align-self: flex-start;
      margin-bottom: 0.5rem;
      display: inline-block;
    }

    .preview-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--docs-text-color);
      margin: 0 0 0.25rem 0;
    }

    .preview-path {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--docs-muted-color);
    }

    .preview-body {
      font-size: 0.875rem;
      color: var(--docs-muted-color);
      line-height: 1.6;
    }

    .preview-body p {
      margin-bottom: 1rem;
    }

    .preview-body pre {
      background-color: rgba(0,0,0,0.2);
      border: 1px solid var(--docs-border-color);
      border-radius: 6px;
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      overflow-x: auto;
      margin: 1.25rem 0;
      color: #cbd5e1;
    }

    .preview-body code {
      font-family: var(--font-mono);
      background-color: rgba(255,255,255,0.05);
      padding: 0.125rem 0.25rem;
      border-radius: 3px;
      font-size: 0.8125rem;
    }

    /* Workflow image container */
    .workflow-img-container {
      margin: 2rem 0;
      width: 100%;
    }

    body.dark-mode .workflow-img-light {
      display: none !important;
    }

    body.dark-mode .workflow-img-dark {
      display: block !important;
    }

    body:not(.dark-mode) .workflow-img-light {
      display: block !important;
    }

    body:not(.dark-mode) .workflow-img-dark {
      display: none !important;
    }

    /* Callouts */
    .docs-callout-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .docs-callout {
      border: 1px solid var(--docs-border-color);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.5rem;
      background-color: var(--docs-card-bg);
      display: flex;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }

    .callout-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .docs-callout span {
      font-size: 0.875rem;
      line-height: 1.45;
    }

    .docs-callout a {
      font-weight: 600;
      text-decoration: underline;
    }
  `;
  document.head.appendChild(styleEl);

  // Set initial theme states
  const updateThemeState = () => {
    const isDark = document.body.classList.contains('dark-mode');
    const docsThemeBtn = document.getElementById('docsThemeToggleBtn');
    if (docsThemeBtn) {
      const darkIcon = docsThemeBtn.querySelector('.theme-icon-dark');
      const lightIcon = docsThemeBtn.querySelector('.theme-icon-light');
      if (isDark) {
        if (darkIcon) darkIcon.style.display = 'none';
        if (lightIcon) lightIcon.style.display = 'block';
      } else {
        if (darkIcon) darkIcon.style.display = 'block';
        if (lightIcon) lightIcon.style.display = 'none';
      }
    }
  };
  updateThemeState();

  // Bind Navbar Login Actions
  const overlay = document.getElementById('loginModalOverlay');
  const closeBtn = document.getElementById('closeLoginModalBtn');
  const tryBtn = document.getElementById('tryAetherFlowBtn');
  const getDemoBtn = document.getElementById('getDemoBtn');

  if (tryBtn) tryBtn.addEventListener('click', () => overlay.classList.remove('hidden'));
  if (getDemoBtn) getDemoBtn.addEventListener('click', () => overlay.classList.remove('hidden'));
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

  const handleOauthLogin = () => {
    overlay.classList.add('hidden');
    alert('Logged in to AetherFlow workspace successfully!');
    sidebar.style.display = 'flex';
    header.style.display = 'flex';
    window.location.hash = '#/home';
  };

  const gBtn = document.getElementById('googleOauthBtn');
  const ghBtn = document.getElementById('githubOauthBtn');
  const emSubmit = document.getElementById('modalEmailSubmitBtn');
  if (gBtn) gBtn.addEventListener('click', handleOauthLogin);
  if (ghBtn) ghBtn.addEventListener('click', handleOauthLogin);
  if (emSubmit) emSubmit.addEventListener('click', handleOauthLogin);

  // Bind Theme Toggle inside the navbar
  const themeToggle = document.getElementById('docsThemeToggleBtn');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      if (isDark) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeState();
      
      // Update global sidebar classes as well
      const mainThemeToggle = document.getElementById('themeToggleBtn');
      if (mainThemeToggle) {
        const themeText = mainThemeToggle.querySelector('.theme-text');
        const darkIcon = mainThemeToggle.querySelector('.theme-icon-dark');
        const lightIcon = mainThemeToggle.querySelector('.theme-icon-light');
        if (!isDark) {
          if (themeText) themeText.textContent = 'Light Mode';
          if (darkIcon) darkIcon.style.display = 'none';
          if (lightIcon) lightIcon.style.display = 'block';
        } else {
          if (themeText) themeText.textContent = 'Dark Mode';
          if (darkIcon) darkIcon.style.display = 'block';
          if (lightIcon) lightIcon.style.display = 'none';
        }
      }
    });
  }

  // Interactive documentation explorer controller
  const docsListEl = document.getElementById('docsIndexList');
  const previewPanelEl = document.getElementById('docsPreviewPanel');
  const searchInputEl = document.getElementById('docsSearchInput');
  const filterButtons = document.querySelectorAll('.filter-tab');

  let activeCategory = 'all';
  let searchQuery = '';

  const renderDocsList = () => {
    let filtered = docsIndex;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.path.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      docsListEl.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--docs-muted-color); font-size: 0.75rem;">
          No matching guides found
        </div>
      `;
      return;
    }

    docsListEl.innerHTML = filtered.map(item => `
      <div class="index-list-item" data-path="${item.path}">
        <span class="index-list-item-title">${item.title}</span>
        <span class="index-list-item-path">${item.path}</span>
      </div>
    `).join('');

    // Bind item clicks
    docsListEl.querySelectorAll('.index-list-item').forEach(el => {
      el.addEventListener('click', () => {
        docsListEl.querySelectorAll('.index-list-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
        const targetPath = el.getAttribute('data-path');
        const docItem = docsIndex.find(item => item.path === targetPath);
        if (docItem) renderPreview(docItem);
      });
    });
  };

  const renderPreview = (item) => {
    let codeSnippet = '';
    let explanationHtml = '';

    if (item.category === 'API Reference') {
      codeSnippet = `curl -X POST "https://api.smith.aetherflow.com/v2${item.path.replace('.md', '')}" \\
  -H "Authorization: Bearer \$AETHERFLOW_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "support_agent_v2",
    "git_url": "https://github.com/myorg/support-agent.git",
    "version": "latest"
  }'`;
      explanationHtml = `
        <p>This API endpoint is hosted by the AetherFlow Control Plane. It allows external orchestrators, CI/CD runners, and client SDKs to interface dynamically with your deployed systems.</p>
        <h5>Query Parameters</h5>
        <ul>
          <li><code>workspace_id</code>: Optional query path to filter scopes.</li>
          <li><code>limit</code>: Int representing max list length (defaults to 50).</li>
        </ul>
      `;
    } else if (item.category === 'Fleet') {
      codeSnippet = `from aetherflow import Client

client = Client()
# Invoke agent dynamically via Fleet REST gateway
run = client.run_agent(
    agent_id="my-visual-agent-id",
    inputs={"prompt": "Summarize outstanding Salesforce invoices"}
)
print("Run logs completed:", run.logs)`;
      explanationHtml = `
        <p>Fleet visual workflows compile down into optimized agent pipelines. Once configured, you can call them seamlessly in Python/TypeScript code or bind them to background schedules (e.g. cron triggers).</p>
      `;
    } else {
      codeSnippet = `import os
from aetherflow import traceable

# Configure environment keys
os.environ["AETHERFLOW_TRACING_V2"] = "true"
os.environ["AETHERFLOW_API_KEY"] = "lsv2_pt_..."

@traceable(name="Agent Solver Loop")
def solve_task(prompt):
    # Traced execution happens automatically
    return "Solution generated"

solve_task("Calculate 125 * 40")`;
      explanationHtml = `
        <p>This tutorial details how to instrument your code to start logging traces to the AetherFlow Dashboard. Logging traces requires minimal setup and gives immediate granular timelines of nested tool call executions.</p>
      `;
    }

    previewPanelEl.innerHTML = `
      <div class="preview-category-badge">${item.category}</div>
      <h3 class="preview-title">${item.title}</h3>
      <span class="preview-path">docs.aetherflow.com${item.path}</span>
      
      <div class="preview-body" style="margin-top: 1.5rem;">
        <p><strong>Overview:</strong> ${item.desc}</p>
        ${explanationHtml}
        
        <h5 style="margin-top: 1.5rem; font-weight: 700; color: var(--docs-text-color);">Example Code</h5>
        <pre><code>${codeSnippet}</code></pre>

        <a href="https://docs.smith.aetherflow.com" target="_blank" class="btn btn-secondary btn-sm" style="margin-top: 1rem; width: fit-content; background: var(--docs-card-bg); border-color: var(--docs-border-color); color: var(--docs-text-color);">
          Read full official guide &rarr;
        </a>
      </div>
    `;
  };

  // Bind index explorer interactions
  searchInputEl.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderDocsList();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderDocsList();
    });
  });

  // Run initial render of list
  renderDocsList();

  // Cleanup handler when leaving docs page
  window.addEventListener('hashchange', function cleanup() {
    if (sidebar) sidebar.style.display = 'flex';
    if (header) header.style.display = 'flex';
    pageContainer.removeAttribute('style');
    const styles = document.getElementById('docsPageStyles');
    if (styles) styles.remove();
    window.removeEventListener('hashchange', cleanup);
  });
}
