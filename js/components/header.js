import { MockDatabase } from '../mock-data.js';

export function renderHeader(config) {
  const header = document.getElementById('topHeader');
  if (!header) return;

  // Render left side: breadcrumbs (with folder icon if it's the home/app context)
  const isHomeOrMain = config.breadcrumbs && config.breadcrumbs.length > 0 && 
    (config.breadcrumbs[0].text === 'Personal' || config.breadcrumbs[0].text === 'My First App' || config.breadcrumbs[0].text === MockDatabase.workspaceName);

  let breadcrumbsHtml = '';
  if (isHomeOrMain) {
    breadcrumbsHtml += `
      <div class="breadcrumb-item font-semibold" style="display: flex; align-items: center; gap: 0.5rem;">
        <i data-lucide="folder" style="width: 14px; height: 14px; color: var(--color-brand);"></i>
        <a href="#/home" class="breadcrumb-link" style="font-weight: 600; color: var(--color-text-primary); text-decoration: none;">${MockDatabase.workspaceName}</a>
      </div>
    `;
    
    // Add additional breadcrumbs if any
    if (config.breadcrumbs.length > 1) {
      config.breadcrumbs.slice(1).forEach(bc => {
        breadcrumbsHtml += `
          <div class="breadcrumb-item" style="display: flex; align-items: center; gap: 0.5rem; margin-left: 0.5rem;">
            <span style="color: var(--color-text-muted);">/</span>
            <a href="${bc.link || '#'}" class="breadcrumb-link" style="text-decoration: none; color: var(--color-text-secondary); font-weight: 500;">${bc.text}</a>
          </div>
        `;
      });
    }
  } else {
    breadcrumbsHtml = config.breadcrumbs.map((bc, idx) => {
      const isLast = idx === config.breadcrumbs.length - 1;
      if (isLast) {
        return `<div class="breadcrumb-item active" style="font-weight: 600; color: var(--color-text-primary);">${bc.text}</div>`;
      }
      return `
        <div class="breadcrumb-item" style="display: flex; align-items: center; gap: 0.5rem;">
          <a href="${bc.link || '#'}" class="breadcrumb-link" style="text-decoration: none; color: var(--color-text-secondary);">${bc.text}</a>
          <span style="color: var(--color-text-muted); margin: 0 0.25rem;">/</span>
        </div>
      `;
    }).join('');
  }

  let actionsHtml = '';
  
  // Render workspace selector & Traces indicator
  if (config.showWorkspaceBadge) {
    actionsHtml += `
      <div class="header-badge-group" style="display: flex; align-items: center; gap: 0.5rem; border-right: none; padding-right: 0; margin-right: 0.5rem;">
        <!-- User avatar and Personal workspace selector -->
        <div class="workspace-user-selector" style="display: flex; align-items: center; gap: 0.5rem; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); cursor: pointer; font-size: 0.8125rem;">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" style="width: 18px; height: 18px; border-radius: 50%;">
          <span style="font-weight: 600; color: var(--color-text-primary);">Personal</span>
          <span class="workspace-id-link" style="color: var(--color-text-muted); font-size: 0.75rem; display: flex; align-items: center; gap: 2px;" onclick="event.stopPropagation(); navigator.clipboard.writeText('ashutoshkumarsingh0x-f219'); alert('Workspace ID copied!')">
            <span style="font-weight: 700; background: #e2e8f0; padding: 1px 3px; border-radius: 3px;">ID</span>
            <i data-lucide="link" style="width: 10px; height: 10px;"></i>
          </span>
        </div>
        
        <!-- Traces 0/5000 Badge -->
        <a href="#/home" class="workspace-id-badge" style="background-color: #f1f5f9; color: var(--color-text-primary); border: 1px solid var(--color-border); text-decoration: none; display: flex; align-items: center; gap: 0.25rem; font-weight: 500; font-family: var(--font-sans); font-size: 0.75rem;">
          <span style="color: var(--color-text-secondary);">Traces</span>
          <span style="font-weight: 600;">0/5000</span>
          <i data-lucide="arrow-up-right" style="width: 10px; height: 10px; color: var(--color-text-muted);"></i>
        </a>
      </div>
    `;
  }

  // Render stats bar/quickstarts inside the header actions to match screenshot
  if (config.showStatsBar) {
    actionsHtml += `
      <div class="header-quickstarts" style="display: flex; align-items: center; gap: 0.5rem; margin-right: 0.5rem;">
        <button class="header-btn header-btn-secondary" onclick="window.location.hash='#/studio'" style="padding: 0.25rem 0.625rem; border-radius: var(--radius-md); font-size: 0.75rem;">
          <i data-lucide="layout-grid" style="width: 12px; height: 12px; color: var(--color-brand);"></i>
          <span>Studio quickstart</span>
        </button>
        <button class="header-btn header-btn-secondary" onclick="window.location.hash='#/tracing'" style="padding: 0.25rem 0.625rem; border-radius: var(--radius-md); font-size: 0.75rem;">
          <i data-lucide="activity" style="width: 12px; height: 12px; color: var(--color-success);"></i>
          <span>Tracing quickstart</span>
        </button>
        <button class="header-btn header-btn-secondary" onclick="window.location.hash='#/evaluators'" style="padding: 0.25rem 0.625rem; border-radius: var(--radius-md); font-size: 0.75rem;">
          <i data-lucide="check-square" style="width: 12px; height: 12px; color: var(--color-warning);"></i>
          <span>Evaluation quickstart</span>
        </button>
      </div>
    `;
  }

  if (config.actions) {
    actionsHtml += config.actions.map(action => {
      const btnClass = action.primary ? 'header-btn-primary' : 'header-btn-secondary';
      const iconHtml = action.icon ? `<i data-lucide="${action.icon}" style="width: 14px; height: 14px;"></i>` : '';
      return `
        <button class="header-btn ${btnClass}" id="${action.id || ''}" style="padding: 0.25rem 0.625rem; border-radius: var(--radius-md); font-size: 0.75rem;">
          ${iconHtml}
          <span>${action.label}</span>
        </button>
      `;
    }).join('');
  }

  header.innerHTML = `
    <div class="header-breadcrumbs" style="display: flex; align-items: center;">
      ${breadcrumbsHtml}
    </div>
    <div class="header-actions" style="display: flex; align-items: center; gap: 0.5rem;">
      ${actionsHtml}
    </div>
  `;

  // Hide the quickStatsBar DOM since we are moving quickstarts directly into the header
  const quickStats = document.getElementById('quickStatsBar');
  if (quickStats) {
    quickStats.classList.add('hidden');
    quickStats.style.display = 'none';
  }

  // Trigger Lucide icons rendering
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
