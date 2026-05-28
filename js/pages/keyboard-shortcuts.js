import { renderHeader } from '../components/header.js';

export function renderKeyboardShortcutsPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'My First App', link: '#/home' },
      { text: 'Keyboard Shortcuts', link: '#/keyboard-shortcuts' }
    ],
    showWorkspaceBadge: true,
    showStatsBar: false
  });

  const pageContainer = document.getElementById('pageContent');

  pageContainer.innerHTML = `
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto; text-align: left;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="keyboard" style="width: 20px; height: 20px; color: var(--color-brand);"></i>
        <span>Keyboard Shortcuts</span>
      </h2>
      <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin-bottom: 2.0rem;">
        Use these shortcuts to navigate quickly and trigger actions across the AetherFlow workspace.
      </p>

      <div class="section-panel" style="padding: 0;">
        <div style="display: flex; flex-direction: column;">
          <!-- Item 1 -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border);">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">Search / Command Palette</span>
              <span style="font-size: 0.75rem; color: var(--color-text-secondary);">Open the global search overlays and navigate options</span>
            </div>
            <kbd class="search-esc-kbd" style="font-size: 0.8125rem;">Ctrl K</kbd>
          </div>
          <!-- Item 2 -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border);">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">Close Modals & Popups</span>
              <span style="font-size: 0.75rem; color: var(--color-text-secondary);">Dismiss search overlays, wizards, and configuration forms</span>
            </div>
            <kbd class="search-esc-kbd" style="font-size: 0.8125rem;">Esc</kbd>
          </div>
          <!-- Item 3 -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border);">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">Navigate Up / Down</span>
              <span style="font-size: 0.75rem; color: var(--color-text-secondary);">Move selection inside command palette or dropdown lists</span>
            </div>
            <div style="display: flex; gap: 0.25rem;">
              <kbd class="search-esc-kbd" style="font-size: 0.8125rem;">&uarr;</kbd>
              <kbd class="search-esc-kbd" style="font-size: 0.8125rem;">&darr;</kbd>
            </div>
          </div>
          <!-- Item 4 -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border);">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">Select Highlighted Item</span>
              <span style="font-size: 0.75rem; color: var(--color-text-secondary);">Execute current active row action</span>
            </div>
            <kbd class="search-esc-kbd" style="font-size: 0.8125rem;">Enter</kbd>
          </div>
          <!-- Item 5 -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem;">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <span style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">Toggle Light / Dark Mode</span>
              <span style="font-size: 0.75rem; color: var(--color-text-secondary);">Switch theme colors instantly</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); font-style: italic;">Sidebar Toggle</span>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
