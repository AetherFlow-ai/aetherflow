import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderHomePage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' }
    ],
    showWorkspaceBadge: true,
    showStatsBar: true,
    actions: [
      { id: 'createProjectHeaderBtn', label: 'New Project', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');
  
  // Prepare Tracing Projects HTML
  let projectsHtml = '';
  if (MockDatabase.projects.length === 0) {
    projectsHtml = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="git-commit"></i>
        </div>
        <h4 class="empty-state-title">No tracing projects found</h4>
        <p class="empty-state-desc">Create a new project to get started with tracing your LLM runs and agent outputs.</p>
        <button class="btn btn-primary btn-sm" id="createProjectBtn">
          <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
          <span>Create Project</span>
        </button>
      </div>
    `;
  } else {
    projectsHtml = `
      <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1px solid var(--color-border);">
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Name</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Total Traces</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Latency (p50)</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Total Cost</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Status</th>
            </tr>
          </thead>
          <tbody>
            ${MockDatabase.projects.map(proj => `
              <tr style="border-bottom: 1px solid var(--color-border); cursor: pointer;" onclick="window.location.hash='#/tracing'">
                <td style="padding: 0.75rem 1rem; font-weight: 500; color: var(--color-brand);">${proj.name}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-primary);">${proj.traces.toLocaleString()}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-primary);">${proj.latency}ms</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-primary);">$${proj.cost.toFixed(2)}</td>
                <td style="padding: 0.75rem 1rem;">
                  <span class="badge ${proj.status === 'active' ? 'badge-success' : 'badge-gray'}">${proj.status}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Prepare Datasets HTML
  let datasetsHtml = '';
  if (MockDatabase.datasets.length === 0) {
    datasetsHtml = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="database"></i>
        </div>
        <h4 class="empty-state-title">No datasets found</h4>
        <p class="empty-state-desc">Create a new dataset to store reference outputs for automated evaluations and comparisons.</p>
        <button class="btn btn-primary btn-sm" id="createDatasetBtn">
          <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
          <span>New Dataset</span>
        </button>
      </div>
    `;
  } else {
    datasetsHtml = `
      <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 1px solid var(--color-border);">
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Name</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Examples</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Experiments</th>
              <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Created Date</th>
            </tr>
          </thead>
          <tbody>
            ${MockDatabase.datasets.map(ds => `
              <tr style="border-bottom: 1px solid var(--color-border); cursor: pointer;" onclick="window.location.hash='#/datasets'">
                <td style="padding: 0.75rem 1rem; font-weight: 500; color: var(--color-brand);">${ds.name}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-primary);">${ds.examples}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-primary);">${ds.experiments}</td>
                <td style="padding: 0.75rem 1rem; color: var(--color-text-muted);">${ds.created}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  pageContainer.innerHTML = `
    <div class="home-grid">
      <!-- Tracing Projects Section -->
      <section class="section-panel">
        <div class="section-title-bar">
          <div class="section-title">
            <i data-lucide="activity" style="width: 18px; height: 18px; color: var(--color-brand);"></i>
            <span>Tracing Projects</span>
          </div>
          <button class="btn btn-secondary btn-xs" onclick="window.location.hash='#/tracing'">
            View all
          </button>
        </div>
        ${projectsHtml}
      </section>

      <!-- Datasets & Experiments Section -->
      <section class="section-panel">
        <div class="section-title-bar">
          <div class="section-title">
            <i data-lucide="database" style="width: 18px; height: 18px; color: var(--color-success);"></i>
            <span>Datasets & Experiments</span>
          </div>
          <button class="btn btn-secondary btn-xs" onclick="window.location.hash='#/datasets'">
            View all
          </button>
        </div>
        ${datasetsHtml}
      </section>

      <!-- Prompts Registry section -->
      <section class="section-panel">
        <div class="section-title-bar">
          <div class="section-title">
            <i data-lucide="message-square" style="width: 18px; height: 18px; color: var(--color-warning);"></i>
            <span>Prompts</span>
          </div>
        </div>
        <div class="prompt-card" onclick="window.location.hash='#/prompts'">
          <div class="prompt-details">
            <span class="prompt-name">Start creating a prompt version in the Playground</span>
            <span class="prompt-meta">Save prompt variations and evaluate them side-by-side with multi-model comparison.</span>
          </div>
          <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--color-text-muted);"></i>
        </div>
      </section>
    </div>
  `;

  // Attach button events
  const createProjBtn = document.getElementById('createProjectBtn') || document.getElementById('createProjectHeaderBtn');
  if (createProjBtn) {
    createProjBtn.addEventListener('click', () => {
      window.location.hash = '#/tracing';
    });
  }

  const createDatasetBtn = document.getElementById('createDatasetBtn');
  if (createDatasetBtn) {
    createDatasetBtn.addEventListener('click', () => {
      window.location.hash = '#/datasets';
    });
  }

  // Trigger icons update
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
