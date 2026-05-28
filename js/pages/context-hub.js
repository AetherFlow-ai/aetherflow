import { renderHeader } from '../components/header.js';

export function renderContextHubPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Context Hub', link: '#/context-hub' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'createContextBtn', label: 'Create Context', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  pageContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">Context Hub</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: -1rem;">Manage shared agent context, knowledge reference files, and long-term memory schemas.</p>

      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="layers"></i>
        </div>
        <h4 class="empty-state-title">No context documents found</h4>
        <p class="empty-state-desc">Upload reference documents or link vector stores to inject dynamic session context schemas into your runtime agents.</p>
        <button class="btn btn-primary btn-sm">
          <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
          <span>Upload File</span>
        </button>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
