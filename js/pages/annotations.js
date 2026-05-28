import { renderHeader } from '../components/header.js';

export function renderAnnotationsPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Annotation Queues', link: '#/annotations' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'createQueueBtn', label: 'Create Queue', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  pageContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">Annotation Queues</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: -1rem;">Routes trace runs to team members for manual review, labeling, and grading verification.</p>

      <div class="empty-state">
        <div class="empty-state-icon">
          <i data-lucide="list-todo"></i>
        </div>
        <h4 class="empty-state-title">No review queues found</h4>
        <p class="empty-state-desc">Set up automated queue rules to triage edge-case traces or low-score runs for manual feedback loops.</p>
        <button class="btn btn-primary btn-sm">
          <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
          <span>Create Queue</span>
        </button>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
