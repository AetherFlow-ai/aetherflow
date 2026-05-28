import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderSandboxesPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Sandboxes', link: '#/sandboxes' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'createSandboxBtn', label: 'Create Sandbox', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  pageContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">Sandboxes</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: -1rem;">Run unsafe/dynamic tool calls and custom python code blocks in isolated Firecracker microVMs.</p>

      <div class="deployments-list">
        ${MockDatabase.sandboxes.map(sb => `
          <div class="deployment-card">
            <div class="deployment-info">
              <div class="deployment-name-row">
                <span class="deployment-name">${sb.name}</span>
                <span class="badge ${sb.status === 'Running' ? 'badge-success' : 'badge-gray'}">${sb.status}</span>
              </div>
              <div class="deployment-meta" style="margin-top: 0.5rem;">
                <span>CPU: ${sb.cpu}</span>
                <span>•</span>
                <span>RAM: ${sb.ram}</span>
                <span>•</span>
                <span>Uptime: ${sb.uptime}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" ${sb.status === 'Running' ? '' : 'disabled'} style="${sb.status === 'Running' ? '' : 'opacity: 0.5; cursor: not-allowed;'}">
              <i data-lucide="terminal" style="width: 14px; height: 14px;"></i>
              <span>SSH Connect</span>
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
