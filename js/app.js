import { Router } from './router.js';
import { initChatWidget } from './components/chat-widget.js';

// Page imports
import { renderLandingPage } from './pages/landing.js';
import { renderHomePage } from './pages/home.js';
import { renderTracingPage } from './pages/tracing.js';
import { renderMonitoringPage } from './pages/monitoring.js';
import { renderDatasetsPage } from './pages/datasets.js';
import { renderEvaluatorsPage } from './pages/evaluators.js';
import { renderAnnotationsPage } from './pages/annotations.js';
import { renderPromptsPage } from './pages/prompts.js';
import { renderPlaygroundPage } from './pages/playground.js';
import { renderStudioPage } from './pages/studio.js';
import { renderContextHubPage } from './pages/context-hub.js';
import { renderDeploymentsPage } from './pages/deployments.js';
import { renderSandboxesPage } from './pages/sandboxes.js';
import { renderSettingsPage } from './pages/settings.js';
import { renderPricingPage } from './pages/pricing.js';
import { renderDatasetDetailPage } from './pages/dataset-detail.js';
import { renderKeyboardShortcutsPage } from './pages/keyboard-shortcuts.js';
import { renderDocsPage } from './pages/docs.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize custom router
  const routes = [
    { name: 'landing', path: '#/landing', handler: renderLandingPage },
    { name: 'home', path: '#/home', handler: renderHomePage },
    { name: 'pricing', path: '#/pricing', handler: renderPricingPage },
    { name: 'docs', path: '#/docs', handler: renderDocsPage },
    { name: 'tracing', path: '#/tracing', handler: renderTracingPage },
    { name: 'monitoring', path: '#/monitoring', handler: renderMonitoringPage },
    { name: 'datasets', path: '#/datasets', handler: renderDatasetsPage },
    { name: 'evaluators', path: '#/evaluators', handler: renderEvaluatorsPage },
    { name: 'annotations', path: '#/annotations', handler: renderAnnotationsPage },
    { name: 'prompts', path: '#/prompts', handler: renderPromptsPage },
    { name: 'playground', path: '#/playground', handler: renderPlaygroundPage },
    { name: 'studio', path: '#/studio', handler: renderStudioPage },
    { name: 'context-hub', path: '#/context-hub', handler: renderContextHubPage },
    { name: 'deployments', path: '#/deployments', handler: renderDeploymentsPage },
    { name: 'sandboxes', path: '#/sandboxes', handler: renderSandboxesPage },
    { name: 'settings', path: '#/settings', handler: renderSettingsPage },
    { name: 'datasets', path: '#/datasets/detail*', handler: renderDatasetDetailPage },
    { name: 'keyboard-shortcuts', path: '#/keyboard-shortcuts', handler: renderKeyboardShortcutsPage }
  ];

  new Router(routes, '#/landing');

  // --- Theme (Light / Dark Mode) Controller ---
  function applyTheme(theme) {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeText = themeToggleBtn ? themeToggleBtn.querySelector('.theme-text') : null;
    const darkIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon-dark') : null;
    const lightIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon-light') : null;

    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      if (themeText) themeText.textContent = 'Light Mode';
      if (darkIcon) darkIcon.style.display = 'none';
      if (lightIcon) lightIcon.style.display = 'block';
    } else {
      document.body.classList.remove('dark-mode');
      if (themeText) themeText.textContent = 'Dark Mode';
      if (darkIcon) darkIcon.style.display = 'block';
      if (lightIcon) lightIcon.style.display = 'none';
    }
    localStorage.setItem('theme', theme);
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Bind Sidebar theme toggle click
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  // 2. Initialize chat assistant
  initChatWidget();

  // 3. Global Search Modal (Command Palette) Controller
  const searchOverlay = document.getElementById('searchModalOverlay');
  const modalSearchInput = document.getElementById('modalSearchInput');
  const searchResultsItems = document.querySelectorAll('.search-result-item');
  const globalSearchWrapper = document.querySelector('.sidebar-search-input-wrapper');

  let activeIndex = -1;
  let visibleItems = [];

  function openSearchModal() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('hidden');
    modalSearchInput.value = '';
    modalSearchInput.focus();
    activeIndex = -1;
    filterResults('');
  }

  function closeSearchModal() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('hidden');
    modalSearchInput.blur();
  }

  function filterResults(query) {
    visibleItems = [];
    searchResultsItems.forEach(item => {
      const text = item.querySelector('.result-text').textContent.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        item.style.display = 'flex';
        item.classList.remove('selected');
        visibleItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });

    if (visibleItems.length > 0) {
      activeIndex = 0;
      visibleItems[0].classList.add('selected');
    } else {
      activeIndex = -1;
    }
  }

  // Event listener for opening
  if (globalSearchWrapper) {
    globalSearchWrapper.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchModal();
    });
  }

  const searchInputPlaceholder = document.getElementById('globalSearchInput');
  if (searchInputPlaceholder) {
    searchInputPlaceholder.addEventListener('focus', (e) => {
      e.preventDefault();
      searchInputPlaceholder.blur();
      openSearchModal();
    });
  }

  // Ctrl K & Esc key listeners
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });

  // Modal Input Filtering & Key Navigation
  if (modalSearchInput) {
    modalSearchInput.addEventListener('input', (e) => {
      filterResults(e.target.value);
    });

    modalSearchInput.addEventListener('keydown', (e) => {
      if (visibleItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        visibleItems[activeIndex].classList.remove('selected');
        activeIndex = (activeIndex + 1) % visibleItems.length;
        visibleItems[activeIndex].classList.add('selected');
        visibleItems[activeIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        visibleItems[activeIndex].classList.remove('selected');
        activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
        visibleItems[activeIndex].classList.add('selected');
        visibleItems[activeIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedItem = visibleItems[activeIndex];
        if (selectedItem) {
          const action = selectedItem.getAttribute('data-action');
          if (action === 'toggle-dark') {
            applyTheme('dark');
            closeSearchModal();
          } else if (action === 'toggle-light') {
            applyTheme('light');
            closeSearchModal();
          } else {
            const path = selectedItem.getAttribute('data-path');
            if (path) {
              window.location.hash = path;
              closeSearchModal();
            }
          }
        }
      }
    });
  }

  // Result items clicking
  searchResultsItems.forEach(item => {
    // Settings icon click
    const settingsIcon = item.querySelector('.result-settings-icon');
    if (settingsIcon) {
      settingsIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent triggering row click navigation
        window.location.hash = '#/settings';
        closeSearchModal();
      });
    }

    item.addEventListener('click', (e) => {
      // If setting icon was clicked, do nothing
      if (e.target.closest('.result-settings-icon')) return;

      const action = item.getAttribute('data-action');
      if (action === 'toggle-dark') {
        applyTheme('dark');
        closeSearchModal();
      } else if (action === 'toggle-light') {
        applyTheme('light');
        closeSearchModal();
      } else {
        const path = item.getAttribute('data-path');
        if (path) {
          window.location.hash = path;
          closeSearchModal();
        }
      }
    });
  });

  // Overlay click to close
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearchModal();
      }
    });
  }

  // Render icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
