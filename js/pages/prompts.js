import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderPromptsPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Prompts', link: '#/prompts' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'createPromptBtn', label: 'New Prompt', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  pageContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">Prompts Registry</h2>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: -1rem;">Centrally manage system messages and prompt templates with semantic versioning.</p>

      <div class="prompts-list">
        ${MockDatabase.prompts.map(prm => `
          <div class="prompt-card" onclick="window.location.hash='#/playground'">
            <div class="prompt-details">
              <span class="prompt-name">${prm.name}</span>
              <div class="prompt-meta">
                <span>Versions: ${prm.versions}</span>
                <span>•</span>
                <span>Modified: ${prm.lastModified}</span>
                <span>•</span>
                <span>Owner: ${prm.author}</span>
              </div>
            </div>
            <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--color-text-muted);"></i>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
