import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderDeploymentsPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Deployments', link: '#/deployments' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'createDeploymentBtn', label: 'New Deployment', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  pageContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">Deployments</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: -1rem;">Deploy persistent, durable agent runtimes from Git repositories with state checkpointing.</p>

      <div class="deployments-list">
        ${MockDatabase.deployments.map(dep => `
          <div class="deployment-card">
            <div class="deployment-info">
              <div class="deployment-name-row">
                <span class="deployment-name">${dep.name}</span>
                <span class="badge ${dep.status === 'Active' ? 'badge-success' : 'badge-warning'}">${dep.status}</span>
              </div>
              <span class="deployment-url">${dep.url}</span>
              <div class="deployment-meta">
                <span>Active Threads: ${dep.threads}</span>
                <span>•</span>
                <span>Uptime: ${dep.uptime}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText('${dep.url}'); alert('Endpoint copied!')">
              <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
              <span>Copy URL</span>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
