import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

function getProviderLogoSvg(provider, size = 18) {
  const prov = (provider || '').toLowerCase();
  if (prov === 'openai') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.72 10.3A5.4 5.4 0 0 0 18 4.2a5.55 5.55 0 0 0-4.63 1.25A5.44 5.44 0 0 0 7.8 2.64a5.55 5.55 0 0 0-3.64 3.09A5.41 5.41 0 0 0 2.27 12a5.5 5.5 0 0 0 3.73 6.13A5.55 5.55 0 0 0 10.63 18.5a5.44 5.44 0 0 0 5.56 2.87 5.55 5.55 0 0 0 3.64-3.09 5.41 5.41 0 0 0 1.89-7.98ZM13.37 6.47a3.46 3.46 0 0 1 1.77-.5c.78 0 1.54.26 2.16.74l-4.7 2.72v-3ZM6 8.52a3.44 3.44 0 0 1 .42-1.8A3.48 3.48 0 0 1 8.2 5.3l4.7 2.71v5.43ZM6.9 15.65a3.46 3.46 0 0 1-1.34-1.3A3.44 3.44 0 0 1 5.15 12l4.7-2.72v5.43Zm9.1 2.83a3.46 3.46 0 0 1-1.77.5 3.48 3.48 0 0 1-2.16-.74l4.7-2.72v3Zm5.6-4.96a3.44 3.44 0 0 1-.42 1.8A3.48 3.48 0 0 1 19 16.7l-4.7-2.71V8.56ZM12 13.56l-4.7-2.71 4.7-2.71 4.7 2.71-4.7 2.71Z" fill="#10A37F"/>
    </svg>`;
  } else if (prov === 'anthropic') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#E0B8A5" />
      <path d="M12 5L7 17H9.2L10.2 14.5H13.8L14.8 17H17L12 5ZM10.9 12.7L12 9.8L13.1 12.7H10.9Z" fill="#191919"/>
    </svg>`;
  } else if (prov === 'deepseek') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1845FD"/>
      <path d="M7 6H13.5C16.5 6 18.5 7.5 18.5 10.5C18.5 13.5 16.5 15 13.5 15H9V18H7V6ZM9 8V13H13.2C15.2 13 16.5 12.2 16.5 10.5C16.5 8.8 15.2 8 13.2 8H9Z" fill="white"/>
      <circle cx="13" cy="10.5" r="1.5" fill="#FFC80A"/>
    </svg>`;
  } else if (prov === 'gemini' || prov === 'google gemini') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 12.5 8.5 15.5 11.5C18.5 14.5 22 15 22 15C22 15 18.5 15.5 15.5 18.5C12.5 21.5 12 22 12 22C12 22 11.5 21.5 8.5 18.5C5.5 15.5 2 15 2 15C2 15 5.5 14.5 8.5 11.5C11.5 8.5 12 2 12 2Z" fill="url(#gemini_grad_settings)"/>
      <defs>
        <linearGradient id="gemini_grad_settings" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#4E89FF"/>
          <stop offset="0.5" stop-color="#916BFF"/>
          <stop offset="1" stop-color="#FF7D9E"/>
        </linearGradient>
      </defs>
    </svg>`;
  } else if (prov === 'ollama') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C8.5 3 6.5 4.5 6.5 7.5C6.5 9 7.5 10 9 10.5C9 10.5 8 12.5 7.5 14C6.8 16 5 17 5 17C5 17 7.5 17.5 9.5 15.5C10.5 14.5 11 13 11 13H13C13 13 13.5 14.5 14.5 15.5C16.5 17.5 19 17 19 17C19 17 17.2 16 16.5 14C16 12.5 15 10.5 15 10.5C16.5 10 17.5 9 17.5 7.5C17.5 4.5 15.5 3 12 3Z" fill="#1C1917" stroke="#1C1917" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M10 7.5H10.01M14 7.5H14.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  } else if (prov === 'huggingface' || prov === 'hugging face') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 475 439" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M235.793 396.126a187.281 187.281 0 00187.285-187.284A187.283 187.283 0 00235.793 21.558 187.287 187.287 0 0048.509 208.842a187.286 187.286 0 00187.284 187.284z" fill="#FFD21E"/>
      <path d="M423.078 208.842a187.283 187.283 0 00-187.285-187.284 187.283 187.283 0 00-187.284 187.284 187.283 187.283 0 00319.714 132.43c22.955-22.956 39.467-52.548 54.855-132.43zm-396.127 0a208.842 208.842 0 11417.685 0 208.842 208.842 0 01-417.685 0z" fill="#FF9D0B"/>
      <path d="M296.641 157.912c6.898 2.371 9.593 16.491 16.545 12.827a26.946 26.946 0 008.24-40.841 26.952 26.952 0 00-28.632-8.767 26.942 26.942 0 00-19.055 23.099 26.943 26.943 0 003.014 15.352c3.288 6.198 13.744-3.88 19.941-1.724l-.053.054zm-126.923 0c-6.898 2.371-9.647 16.491-16.545 12.827a26.946 26.946 0 01-8.24-40.841 26.952 26.952 0 0128.632-8.767 26.944 26.944 0 0116.041 38.451c-3.288 6.198-13.797-3.88-19.941-1.724l.053.054z" fill="#3A3B45"/>
      <path d="M234.446 287.205c52.979 0 70.063-47.212 70.063-71.464 0-12.612-8.461-8.624-22.043-1.941-12.557 6.198-29.426 14.768-47.966 14.768-38.75 0-70.063-37.08-70.063-12.827 0 24.252 17.031 71.464 70.063 71.464h-.054z" fill="#FF323D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M193.863 274.863a46.895 46.895 0 0128.565-24.199c2.155-.646 4.365 3.072 6.682 6.899 2.156 3.665 4.42 7.384 6.683 7.384 2.426 0 4.851-3.665 7.168-7.276 2.426-3.773 4.797-7.438 7.115-6.737a46.403 46.403 0 0126.947 22.474c20.103-15.845 27.486-41.715 27.486-57.667 0-12.612-8.461-8.624-22.043-1.941l-.754.378c-12.45 6.198-29.05 14.39-47.266 14.39-18.216 0-34.762-8.192-47.266-14.39-14.012-6.953-22.797-11.318-22.797 1.563 0 16.438 7.869 43.439 29.48 59.122z" fill="#3A3B45"/>
      <path d="M362.446 183.242a17.515 17.515 0 10.002-35.03 17.515 17.515 0 00-.002 35.03zm-250.61 0a17.515 17.515 0 100-35.03 17.515 17.515 0 000 35.03zM75.78 242.526c-8.731 0-16.492 3.557-21.935 10.079a32.173 32.173 0 00-7.168 20.264 38.275 38.275 0 00-10.456-1.617c-8.353 0-15.899 3.18-21.234 8.947a31.257 31.257 0 00-4.312 37.726 28.566 28.566 0 00-9.647 15.198 31.512 31.512 0 004.312 25.546 28.136 28.136 0 00-1.995 27.056c5.498 12.503 19.24 22.312 45.919 32.875 16.545 6.576 31.744 10.779 31.851 10.833a238.92 238.92 0 0058.907 8.623c31.583 0 54.165-9.701 67.153-28.779 20.911-30.666 17.947-58.746-9.162-85.801-14.929-14.983-24.899-37.025-26.947-41.876-4.204-14.336-15.306-30.289-33.684-30.289a30.716 30.716 0 00-24.792 13.258c-5.389-6.79-10.671-12.126-15.414-15.198a39.885 39.885 0 00-21.396-6.845zm0 21.558c2.749 0 6.144 1.186 9.809 3.503 11.533 7.33 33.684 45.434 41.822 60.255 2.695 4.958 7.384 7.06 11.534 7.06 8.353 0 14.821-8.246.808-18.755-21.127-15.792-13.743-41.607-3.665-43.17.431-.108.916-.108 1.294-.108 9.162 0 13.204 15.791 13.204 15.791s11.857 29.75 32.229 50.122c20.318 20.319 21.396 36.649 6.575 58.368-10.132 14.821-29.48 19.295-49.368 19.295-20.533 0-41.66-4.851-53.463-7.869-.593-.162-72.489-20.48-63.38-37.726 1.509-2.911 4.042-4.096 7.222-4.096 12.826 0 36.11 19.078 46.187 19.078 2.21 0 3.773-.916 4.474-3.233 4.257-15.36-64.997-21.828-59.177-44.032 1.078-3.935 3.827-5.498 7.761-5.498 16.923 0 54.973 29.804 62.95 29.804.592 0 1.077-.161 1.293-.539 3.988-6.467 1.778-10.994-26.409-28.025-28.079-17.031-47.858-27.271-36.648-39.505 1.293-1.401 3.126-2.048 5.39-2.048 17.084 0 57.451 36.756 57.451 36.756s10.887 11.318 17.516 11.318c1.509 0 2.802-.539 3.665-2.048 4.635-7.868-43.44-44.301-46.134-59.338-1.833-10.24 1.293-15.36 7.06-15.36z" fill="#FF9D0B"/>
      <path d="M189.39 397.15c14.821-21.773 13.743-38.103-6.575-58.422-20.372-20.318-32.229-50.122-32.229-50.122s-4.419-17.246-14.498-15.629c-10.078 1.617-17.462 27.378 3.665 43.169 21.073 15.792-4.204 26.517-12.342 11.696-8.084-14.821-30.289-52.925-41.822-60.255-11.48-7.276-19.564-3.233-16.87 11.857 2.696 15.037 50.824 51.47 46.135 59.284-4.689 7.923-21.181-9.216-21.181-9.216s-51.577-46.942-62.841-34.708c-11.21 12.234 8.569 22.474 36.648 39.505 28.187 17.031 30.397 21.558 26.409 28.025-4.042 6.468-66.183-45.972-72.004-23.713-5.82 22.15 63.434 28.564 59.177 43.924-4.312 15.36-48.829-28.996-57.883-11.749-9.162 17.3 62.787 37.618 63.38 37.78 23.175 6.036 82.189 18.809 102.831-11.426z" fill="#FFD21E"/>
      <path d="M398.502 242.526c8.731 0 16.545 3.557 21.935 10.079a32.173 32.173 0 017.168 20.264 38.272 38.272 0 0110.509-1.617c8.354 0 15.899 3.18 21.235 8.947a31.257 31.257 0 014.311 37.726 28.564 28.564 0 019.594 15.198 31.513 31.513 0 01-4.312 25.546 28.142 28.142 0 011.994 27.056c-5.497 12.503-19.24 22.312-45.864 32.875-16.6 6.576-31.798 10.779-31.906 10.833a238.914 238.914 0 01-58.907 8.623c-31.582 0-54.164-9.701-67.153-28.779-20.911-30.667-17.947-58.746 9.162-85.801 14.983-14.983 24.954-37.026 27.002-41.876 4.203-14.336 15.252-30.289 33.63-30.289a30.716 30.716 0 0124.792 13.258c5.389-6.791 10.671-12.126 15.467-15.198a39.888 39.888 0 0121.343-6.845zm0 21.558c-2.749 0-6.09 1.186-9.809 3.503-11.48 7.33-33.684 45.434-41.822 60.255a13.106 13.106 0 01-11.534 7.06c-8.3 0-14.821-8.246-.754-18.756 21.072-15.791 13.689-41.606 3.61-43.169a8.233 8.233 0 00-1.293-.108c-9.162 0-13.204 15.791-13.204 15.791s-11.857 29.75-32.175 50.122c-20.373 20.319-21.45 36.649-6.576 58.368 10.079 14.821 29.481 19.295 49.314 19.295 20.588 0 41.661-4.851 53.518-7.869.539-.162 72.488-20.48 63.38-37.726-1.563-2.911-4.042-4.096-7.222-4.096-12.827 0-36.163 19.078-46.188 19.078-2.263 0-3.826-.916-4.473-3.233-4.312-15.36 64.943-21.828 59.122-44.032-1.024-3.935-3.772-5.498-7.76-5.498-16.923 0-54.973 29.804-62.949 29.804-.539 0-1.024-.161-1.24-.539-3.988-6.467-1.832-10.994 26.301-28.025 28.187-17.031 47.966-27.271 36.648-39.505-1.24-1.401-3.072-2.048-5.282-2.048-17.138 0-57.505 36.756-57.505 36.756s-10.887 11.318-17.462 11.318a3.99 3.99 0 01-3.665-2.048c-4.689-7.868 43.385-44.301 46.08-59.338 1.832-10.24-1.294-15.36-7.06-15.36z" fill="#FF9D0B"/>
      <path d="M284.945 397.15c-14.821-21.773-13.797-38.103 6.576-58.422 20.318-20.318 32.175-50.122 32.175-50.122s4.419-17.246 14.551-15.629c10.025 1.617 17.408 27.378-3.664 43.169-21.127 15.792 4.203 26.517 12.287 11.696 8.139-14.821 30.343-52.925 41.823-60.255 11.479-7.276 19.617-3.233 16.869 11.857-2.695 15.037-50.769 51.47-46.08 59.284 4.635 7.923 21.127-9.216 21.127-9.216s51.631-46.942 62.841-34.708c11.21 12.234-8.515 22.474-36.649 39.505-28.186 17.031-30.342 21.558-26.408 28.025 4.042 6.468 66.183-45.972 72.003-23.713 5.821 22.15-63.38 28.564-59.122 43.924 4.311 15.36 48.775-28.996 57.883-11.749 9.108 17.3-62.788 37.618-63.38 37.78-23.229 6.036-82.244 18.809-102.832-11.426z" fill="#FFD21E"/>
    </svg>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>`;
}

let selectedProvider = 'OpenAI';
let providerKeyValue = '';
let providerKeyVisible = false;
let providerKeyToTarget = null;

let newConfigName = '';
let configSelectedProvider = 'OpenAI';
let configModelName = 'gpt-4o';
let configSelectedFeatures = ['Playground'];
let configToTarget = null;

export function renderSettingsPage() {
  // Local state for active settings section
  let activeTab = localStorage.getItem('settings_active_tab') || 'profile';
  let activeModal = null; // 'create-key', 'key-created-success', 'confirm-rotate', 'confirm-revoke', 'create-provider-key', 'confirm-revoke-provider'
  
  // Modal state variables
  let newKeyName = '';
  let generatedKeyToShow = '';
  let keyToTarget = null; // Stores key ID for rotate/revoke confirmations

  function applyWorkspaceBreadcrumbs() {
    renderHeader({
      breadcrumbs: [
        { text: MockDatabase.workspaceName, link: '#/home' },
        { text: 'Settings', link: '#/settings' }
      ],
      showWorkspaceBadge: false,
      showStatsBar: false,
      actions: []
    });
  }

  applyWorkspaceBreadcrumbs();

  const pageContainer = document.getElementById('pageContent');

  function render() {
    let rightPaneHtml = '';

    if (activeTab === 'profile') {
      rightPaneHtml = `
        <div class="section-panel" style="margin-bottom: 0;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">Profile Settings</h4>
          <form id="profileSettingsForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Display Name</label>
              <input type="text" id="profileDisplayName" class="form-input" value="Personal" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; color: var(--color-text-primary);">
            </div>
            
            <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Contact Email</label>
              <input type="email" class="form-input" value="ashutoshkumarsingh0x@gmail.com" readonly style="background: var(--color-sidebar-hover); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; color: var(--color-text-muted); cursor: not-allowed;">
              <span style="font-size: 0.7rem; color: var(--color-text-muted);">Emails are managed via identity providers.</span>
            </div>

            <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Workspace Scope</label>
              <select class="form-input" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem; font-size: 0.8125rem; color: var(--color-text-primary);">
                <option value="developer">Developer (Default)</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary btn-sm" style="align-self: flex-start; margin-top: 0.5rem; font-weight: 600;">Save Changes</button>
          </form>
        </div>
      `;
    } else if (activeTab === 'apikeys') {
      const keys = MockDatabase.apiKeys || [];
      
      rightPaneHtml = `
        <div class="section-panel" style="margin-bottom: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">API Keys</h4>
            <button class="btn btn-primary btn-sm" id="createApiKeyBtn" style="font-weight: 600;">
              <i data-lucide="plus" style="width: 14px; height: 14px; margin-right: 4px;"></i>
              <span>Create API Key</span>
            </button>
          </div>
          
          <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.4; margin-bottom: 1.5rem;">
            API keys authenticate requests from the AetherFlow SDK or client libraries to your workspace traces. Store them securely.
          </p>

          ${keys.length === 0 ? `
            <div style="background: var(--color-bg-main); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); padding: 2rem; text-align: center; color: var(--color-text-muted); font-size: 0.8125rem;">
              No API Keys configured. Click 'Create API Key' to generate one.
            </div>
          ` : `
            <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-card);">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
                <thead>
                  <tr style="background: var(--color-sidebar-hover); border-bottom: 1px solid var(--color-border);">
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Name</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Key Preview</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Created</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Last Used</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); text-align: right; width: 150px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${keys.map(k => {
                    const masked = k.value.substring(0, 10) + '...' + k.value.substring(k.value.length - 4);
                    return `
                      <tr style="border-bottom: 1px solid var(--color-border);">
                        <td style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-primary);">${k.name}</td>
                        <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--color-text-secondary);">${masked}</td>
                        <td style="padding: 0.75rem 1rem; color: var(--color-text-muted);">${k.created}</td>
                        <td style="padding: 0.75rem 1rem; color: var(--color-text-muted);">${k.lastUsed}</td>
                        <td style="padding: 0.75rem 1rem; text-align: right;">
                          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                            <button class="btn btn-secondary btn-xs rotate-key-action" data-id="${k.id}" title="Rotate Key">Rotate</button>
                            <button class="btn btn-secondary btn-xs revoke-key-action" data-id="${k.id}" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.2);" title="Revoke Key">Revoke</button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
    } else if (activeTab === 'org') {
      rightPaneHtml = `
        <div class="section-panel" style="margin-bottom: 0;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">Organization Settings</h4>
          <form id="orgSettingsForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Organization Name</label>
              <input type="text" id="orgNameInput" class="form-input" value="Personal Organization" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; color: var(--color-text-primary);">
            </div>

            <div style="background-color: var(--color-sidebar-hover); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-primary);">Active Plan</span>
                <span class="badge badge-blue">Developer</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.4; margin: 0;">
                Includes up to 5k base traces/month. Standard community support (1 seat limit).
              </p>
              <a href="#/pricing" style="font-size: 0.75rem; font-weight: 600; color: var(--color-brand); text-decoration: none; margin-top: 0.25rem; display: inline-flex; align-items: center; gap: 2px;">
                <span>Upgrade organization plan</span>
                <i data-lucide="arrow-up-right" style="width: 12px; height: 12px;"></i>
              </a>
            </div>

            <button type="submit" class="btn btn-primary btn-sm" style="align-self: flex-start; font-weight: 600;">Save Changes</button>
          </form>
        </div>
      `;
    } else if (activeTab === 'workspaces') {
      rightPaneHtml = `
        <div class="section-panel" style="margin-bottom: 0;">
          <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">Workspace Settings</h4>
          <form id="workspaceSettingsForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Workspace Name</label>
              <input type="text" id="workspaceNameInput" class="form-input" value="${MockDatabase.workspaceName}" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; color: var(--color-text-primary);">
              <span style="font-size: 0.7rem; color: var(--color-text-muted);">This name is displayed in your sidebar and header breadcrumbs.</span>
            </div>

            <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Workspace ID</label>
              <input type="text" class="form-input" value="ashutoshkumarsingh0x-f219" readonly style="background: var(--color-sidebar-hover); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; color: var(--color-text-muted); cursor: not-allowed;">
            </div>

            <button type="submit" class="btn btn-primary btn-sm" style="align-self: flex-start; font-weight: 600;">Save Changes</button>
          </form>
        </div>
      `;
    } else if (activeTab === 'providerkeys') {
      const keys = MockDatabase.providerKeys || [];
      
      rightPaneHtml = `
        <div class="section-panel" style="margin-bottom: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Provider Secrets</h4>
            <button class="btn btn-primary btn-sm" id="addProviderKeyBtn" style="font-weight: 600;">
              <i data-lucide="plus" style="width: 14px; height: 14px; margin-right: 4px;"></i>
              <span>Add Provider Key</span>
            </button>
          </div>
          
          <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.4; margin-bottom: 1.5rem;">
            Configure API credentials and endpoints for external LLM hosts. Saved credentials allow evaluations, testing, and playground runs.
          </p>

          ${keys.length === 0 ? `
            <div style="background: var(--color-bg-main); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); padding: 2rem; text-align: center; color: var(--color-text-muted); font-size: 0.8125rem;">
              No LLM Provider Keys configured. Click 'Add Provider Key' to add one.
            </div>
          ` : `
            <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-card);">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
                <thead>
                  <tr style="background: var(--color-sidebar-hover); border-bottom: 1px solid var(--color-border);">
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); width: 180px;">Provider</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Credentials / Host Preview</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); width: 120px;">Created</th>
                    <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); text-align: right; width: 100px;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${keys.map(k => {
                    const preview = k.value.startsWith('http') ? k.value : (k.value.substring(0, 8) + '...' + k.value.substring(k.value.length - 4));
                    const logoHtml = getProviderLogoSvg(k.provider, 16);
                    return `
                      <tr style="border-bottom: 1px solid var(--color-border);">
                        <td style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-primary);">
                          <div style="display: flex; align-items: center; gap: 0.5rem;">
                            ${logoHtml}
                            <span>${k.provider}</span>
                          </div>
                        </td>
                        <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--color-text-secondary);">${preview}</td>
                        <td style="padding: 0.75rem 1rem; color: var(--color-text-muted);">${k.created}</td>
                        <td style="padding: 0.75rem 1rem; text-align: right;">
                          <button class="btn btn-secondary btn-xs revoke-provider-key-action" data-id="${k.id}" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.2);" title="Revoke Key">Revoke</button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
    } else if (activeTab === 'modelconfigs') {
      const configs = MockDatabase.modelConfigurations || [];
      const providersCount = new Set(configs.map(c => c.provider)).size;
      const modelsCount = new Set(configs.map(c => c.model)).size;

      rightPaneHtml = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="section-panel" style="margin-bottom: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
              <div style="text-align: left;">
                <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Model Configurations</h4>
                <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 4px 0 0 0;">Manage configurations and control model availability across dashboard features.</p>
              </div>
              <button class="btn btn-primary btn-sm" id="createModelConfigBtn" style="font-weight: 600;">
                <i data-lucide="plus" style="width: 14px; height: 14px; margin-right: 4px;"></i>
                <span>Create Configuration</span>
              </button>
            </div>

            <!-- Feature Access Metrics Grid -->
            <div style="margin-bottom: 1.5rem;">
              <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.75rem; display: block;">Feature Access Control</span>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem;">
                <div style="background: var(--color-sidebar-hover); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-primary);">Playground</span>
                    <span class="badge badge-blue">Active</span>
                  </div>
                  <span style="font-size: 0.7rem; color: var(--color-text-muted); display: block;">
                    ${providersCount} providers &middot; ${modelsCount} custom configurations
                  </span>
                </div>
                <div style="background: var(--color-sidebar-hover); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-primary);">Evaluators</span>
                    <span class="badge badge-blue">Active</span>
                  </div>
                  <span style="font-size: 0.7rem; color: var(--color-text-muted); display: block;">
                    ${configs.filter(c => c.features.includes('Evaluators')).length} active model graders enabled
                  </span>
                </div>
                <div style="background: var(--color-sidebar-hover); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-primary);">Assistant</span>
                    <span class="badge badge-blue">Active</span>
                  </div>
                  <span style="font-size: 0.7rem; color: var(--color-text-muted); display: block;">
                    ${configs.filter(c => c.features.includes('Assistant')).length} Copilot configurations
                  </span>
                </div>
              </div>
            </div>

            <!-- Configurations List Table -->
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.5rem; display: block;">Active Configurations (${configs.length})</span>
            ${configs.length === 0 ? `
              <div style="background: var(--color-bg-main); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); padding: 2rem; text-align: center; color: var(--color-text-muted); font-size: 0.8125rem;">
                No configurations yet. Click 'Create Configuration' to configure a model.
              </div>
            ` : `
              <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-card);">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
                  <thead>
                    <tr style="background: var(--color-sidebar-hover); border-bottom: 1px solid var(--color-border);">
                      <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Name</th>
                      <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); width: 140px;">Provider</th>
                      <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); width: 140px;">Model ID</th>
                      <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary);">Feature Access</th>
                      <th style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-secondary); text-align: right; width: 100px;">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${configs.map(c => {
                      const logoHtml = getProviderLogoSvg(c.provider, 14);
                      return `
                        <tr style="border-bottom: 1px solid var(--color-border);">
                          <td style="padding: 0.75rem 1rem; font-weight: 600; color: var(--color-text-primary);">${c.name}</td>
                          <td style="padding: 0.75rem 1rem; color: var(--color-text-secondary);">
                            <div style="display: flex; align-items: center; gap: 0.375rem;">
                              ${logoHtml}
                              <span>${c.provider}</span>
                            </div>
                          </td>
                          <td style="padding: 0.75rem 1rem; font-family: var(--font-mono); color: var(--color-text-secondary); font-size: 0.75rem;">${c.model}</td>
                          <td style="padding: 0.75rem 1rem;">
                            <div style="display: flex; gap: 0.25rem; flex-wrap: wrap;">
                              ${c.features.map(f => `<span class="badge" style="font-size: 0.65rem; background: var(--color-sidebar-hover); border: 1px solid var(--color-border); color: var(--color-text-primary);">${f}</span>`).join('')}
                            </div>
                          </td>
                          <td style="padding: 0.75rem 1rem; text-align: right;">
                            <button class="btn btn-secondary btn-xs revoke-model-config-action" data-id="${c.id}" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.2);" title="Revoke Configuration">Revoke</button>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      `;
    } else if (activeTab === 'alerts') {
      const integrations = MockDatabase.integrations || {
        slackWebhook: '',
        githubRepo: '',
        githubToken: '',
        pagerdutyKey: ''
      };

      const isSlackConnected = !!integrations.slackWebhook;
      const isGithubConnected = !!(integrations.githubRepo && integrations.githubToken);
      const isPagerdutyConnected = !!integrations.pagerdutyKey;

      rightPaneHtml = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="section-panel" style="margin-bottom: 0;">
            <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
              <h4 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Integrations & Alerts</h4>
              <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 4px 0 0 0;">Connect third-party platforms to export datasets, sync prompts, and trigger alert responses.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              
              <!-- Slack Card -->
              <div class="integration-card" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; transition: border-color 0.2s;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                  <div style="display: flex; gap: 0.75rem; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--color-sidebar-hover); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                      <svg width="24" height="24" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg">
                        <g fill-rule="evenodd">
                          <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/>
                          <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/>
                          <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/>
                          <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <h5 style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                        <span>Slack Alerts</span>
                        <span class="badge ${isSlackConnected ? 'badge-success' : 'badge-gray'}">${isSlackConnected ? 'Connected' : 'Not Connected'}</span>
                      </h5>
                      <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 2px 0 0 0;">Receive trace anomaly alerts and evaluation feedback notifications directly in a channel.</p>
                    </div>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                    <label class="form-label" style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Incoming Webhook URL</label>
                    <input type="text" id="slackWebhookInput" class="form-input" placeholder="https://hooks.slack.com/services/your-webhook-url" value="${integrations.slackWebhook || ''}" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-primary);">
                  </div>
                  <div style="display: flex; gap: 0.5rem; justify-content: flex-start; margin-top: 0.25rem;">
                    <button class="btn btn-primary btn-sm save-slack-btn" style="font-weight: 600;">${isSlackConnected ? 'Save Webhook' : 'Connect Slack'}</button>
                    ${isSlackConnected ? `
                      <button class="btn btn-secondary btn-sm test-slack-btn" style="font-weight: 600;">Test Connection</button>
                      <button class="btn btn-secondary btn-sm disconnect-slack-btn" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.2); font-weight: 600;">Disconnect</button>
                    ` : ''}
                  </div>
                </div>
              </div>

              <!-- GitHub Card -->
              <div class="integration-card" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; transition: border-color 0.2s;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                  <div style="display: flex; gap: 0.75rem; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--color-sidebar-hover); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <h5 style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                        <span>GitHub Sync</span>
                        <span class="badge ${isGithubConnected ? 'badge-success' : 'badge-gray'}">${isGithubConnected ? 'Connected' : 'Not Connected'}</span>
                      </h5>
                      <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 2px 0 0 0;">Synchronize prompts automatically and export evaluation datasets back to your codebase.</p>
                    </div>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                    <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                      <label class="form-label" style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Repository Path</label>
                      <input type="text" id="githubRepoInput" class="form-input" placeholder="owner/repo" value="${integrations.githubRepo || ''}" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-primary);">
                    </div>
                    <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                      <label class="form-label" style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Personal Access Token</label>
                      <input type="password" id="githubTokenInput" class="form-input" placeholder="github_pat_..." value="${integrations.githubToken || ''}" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-primary);">
                    </div>
                  </div>
                  <div style="display: flex; gap: 0.5rem; justify-content: flex-start; margin-top: 0.25rem;">
                    <button class="btn btn-primary btn-sm save-github-btn" style="font-weight: 600;">${isGithubConnected ? 'Save Details' : 'Connect GitHub'}</button>
                    ${isGithubConnected ? `
                      <button class="btn btn-secondary btn-sm test-github-btn" style="font-weight: 600;">Test Connection</button>
                      <button class="btn btn-secondary btn-sm disconnect-github-btn" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.2); font-weight: 600;">Disconnect</button>
                    ` : ''}
                  </div>
                </div>
              </div>

              <!-- PagerDuty Card -->
              <div class="integration-card" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; transition: border-color 0.2s;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                  <div style="display: flex; gap: 0.75rem; align-items: center;">
                    <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--color-sidebar-hover); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                      <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2">
                        <g fill="#06ac38">
                          <path d="M83.57 372.751h73.287v133.25H83.57z"/>
                          <path d="M359.585 30.429C320.245 9.489 292.961 6 228.557 6H83.57v303.3h144.353c57.424 0 100.253-3.49 138.007-28.554 41.244-27.284 62.5-72.652 62.5-125 0-56.79-26.332-102.157-68.845-125.317zM244.737 245.848h-87.88V71.038l82.804-.634c75.508-.952 113.262 25.698 113.262 85.977 0 64.72-46.637 89.467-108.186 89.467z" fill-rule="nonzero"/>
                        </g>
                      </svg>
                    </div>
                    <div>
                      <h5 style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); margin: 0; display: flex; align-items: center; gap: 8px;">
                        <span>PagerDuty Alerts</span>
                        <span class="badge ${isPagerdutyConnected ? 'badge-success' : 'badge-gray'}">${isPagerdutyConnected ? 'Connected' : 'Not Connected'}</span>
                      </h5>
                      <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 2px 0 0 0;">Create incident pages for severe rate/error limits, system latency spikes, or failed evaluators.</p>
                    </div>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                    <label class="form-label" style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Integration Routing Key</label>
                    <input type="password" id="pagerdutyKeyInput" class="form-input" placeholder="PagerDuty Routing Key (e.g. pd_routing_key)" value="${integrations.pagerdutyKey || ''}" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem; font-family: var(--font-mono); color: var(--color-text-primary);">
                  </div>
                  <div style="display: flex; gap: 0.5rem; justify-content: flex-start; margin-top: 0.25rem;">
                    <button class="btn btn-primary btn-sm save-pagerduty-btn" style="font-weight: 600;">${isPagerdutyConnected ? 'Save Key' : 'Connect PagerDuty'}</button>
                    ${isPagerdutyConnected ? `
                      <button class="btn btn-secondary btn-sm test-pagerduty-btn" style="font-weight: 600;">Test Connection</button>
                      <button class="btn btn-secondary btn-sm disconnect-pagerduty-btn" style="color: var(--color-error); border-color: rgba(239, 68, 68, 0.2); font-weight: 600;">Disconnect</button>
                    ` : ''}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      `;
    }

    // Modal forms HTML
    let modalHtml = '';
    if (activeModal === 'create-key') {
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Create API Key</h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
              <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Key Name</label>
                <input type="text" id="newKeyNameInput" class="form-input" placeholder="e.g. production-server" style="font-size: 0.8125rem; padding: 0.5rem;">
              </div>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="submitCreateKeyBtn" style="font-weight: 600;">Create Key</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'key-created-success') {
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 500px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">API Key Generated</h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
              <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">
                <strong style="color: var(--color-warning);">Warning:</strong> For security reasons, you will not be able to view this key again. Copy it now to a secure place.
              </p>

              <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--color-bg-main); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem;">
                <code style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-primary); word-break: break-all; flex: 1;" id="rawGeneratedKey">${generatedKeyToShow}</code>
                <button class="btn btn-secondary btn-xs" id="copyRawKeyBtn" style="padding: 0.375rem; display: flex; align-items: center;"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
              </div>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end;">
              <button class="btn btn-primary btn-sm" id="closeModalBtn" style="font-weight: 600;">Done</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'confirm-rotate') {
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-error); margin: 0; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="alert-triangle" style="width: 16px; height: 16px;"></i>
                <span>Rotate API Key</span>
              </h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem;">
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); line-height: 1.45; margin: 0;">
                Are you sure you want to rotate this API key?
                <br><br>
                This action will immediately invalidate the existing token. Any applications, background jobs, or SDKs currently authenticating with this key will fail.
              </p>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="confirmRotateBtn" style="background: var(--color-error); border-color: var(--color-error); font-weight: 600;">Rotate Key</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'confirm-revoke') {
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-error); margin: 0; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                <span>Revoke API Key</span>
              </h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem;">
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); line-height: 1.45; margin: 0;">
                Are you sure you want to revoke this API key?
                <br><br>
                This is a permanent action. The key will be destroyed and cannot be restored. Any integrations using this key will immediately lose access.
              </p>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="confirmRevokeBtn" style="background: var(--color-error); border-color: var(--color-error); font-weight: 600;">Revoke Key</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'create-provider-key') {
      const activeLogoSvg = getProviderLogoSvg(selectedProvider, 24);
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Add LLM Provider Key</h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
              <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-sidebar-hover);">
                <div id="modalProviderLogoContainer" style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: var(--color-bg-card); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                  ${activeLogoSvg}
                </div>
                <div style="flex: 1;">
                  <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; display: block; margin-bottom: 0.25rem;">Select LLM Provider</span>
                  <select id="providerSelect" class="form-input" style="width: 100%; background: var(--color-bg-card); padding: 0.25rem 0.5rem; font-size: 0.8125rem; font-weight: 600;">
                    <option value="OpenAI" ${selectedProvider === 'OpenAI' ? 'selected' : ''}>OpenAI</option>
                    <option value="Anthropic" ${selectedProvider === 'Anthropic' ? 'selected' : ''}>Anthropic</option>
                    <option value="DeepSeek" ${selectedProvider === 'DeepSeek' ? 'selected' : ''}>DeepSeek</option>
                    <option value="Gemini" ${selectedProvider === 'Gemini' ? 'selected' : ''}>Google Gemini</option>
                    <option value="HuggingFace" ${selectedProvider === 'HuggingFace' ? 'selected' : ''}>Hugging Face</option>
                    <option value="Ollama" ${selectedProvider === 'Ollama' ? 'selected' : ''}>Ollama (Local)</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                <label id="providerKeyLabel" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">
                  ${selectedProvider === 'Ollama' ? 'Base URL / Host Endpoint' : (selectedProvider === 'HuggingFace' ? 'User Access Token' : 'API Key')}
                </label>
                <div style="display: flex; position: relative; align-items: center;">
                  <input type="${(providerKeyVisible || selectedProvider === 'Ollama') ? 'text' : 'password'}" id="providerKeyInput" class="form-input" placeholder="${selectedProvider === 'Ollama' ? 'http://localhost:11434' : (selectedProvider === 'HuggingFace' ? 'hf_...' : 'Enter key (e.g. sk-...)')}" value="${providerKeyValue}" style="width: 100%; padding-right: 2.25rem; font-size: 0.8125rem; font-family: var(--font-mono);">
                  ${selectedProvider === 'Ollama' ? '' : `
                    <button id="toggleProviderKeyVisibility" class="btn btn-secondary btn-xs" style="position: absolute; right: 4px; height: calc(100% - 8px); border: none; padding: 0 0.5rem; display: flex; align-items: center; justify-content: center; background: transparent;" type="button">
                      <i data-lucide="${providerKeyVisible ? 'eye-off' : 'eye'}" style="width: 14px; height: 14px; color: var(--color-text-secondary);"></i>
                    </button>
                  `}
                </div>
                <span id="providerKeyHint" style="font-size: 0.7rem; color: var(--color-text-muted);">
                  ${selectedProvider === 'Ollama' ? 'Specify Ollama connection path (defaults to standard local port).' : (selectedProvider === 'HuggingFace' ? 'Enter a Hugging Face user access token (read or write scope) for model inference.' : 'Configure credentials to allow requests to this provider.')}
                </span>
              </div>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="submitCreateProviderKeyBtn" style="font-weight: 600;">Save Key</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'create-model-config') {
      const activeLogoSvg = getProviderLogoSvg(configSelectedProvider, 24);
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">Create Model Configuration</h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
              <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Configuration Name</label>
                <input type="text" id="configNameInput" class="form-input" placeholder="e.g. GPT-4o Production Default" value="${newConfigName}" style="font-size: 0.8125rem;">
              </div>

              <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-sidebar-hover);">
                <div id="modalConfigProviderLogoContainer" style="display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: var(--color-bg-card); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                  ${activeLogoSvg}
                </div>
                <div style="flex: 1;">
                  <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; display: block; margin-bottom: 0.25rem;">Select Provider</span>
                  <select id="configProviderSelect" class="form-input" style="width: 100%; background: var(--color-bg-card); padding: 0.25rem 0.5rem; font-size: 0.8125rem; font-weight: 600;">
                    <option value="OpenAI" ${configSelectedProvider === 'OpenAI' ? 'selected' : ''}>OpenAI</option>
                    <option value="Anthropic" ${configSelectedProvider === 'Anthropic' ? 'selected' : ''}>Anthropic</option>
                    <option value="DeepSeek" ${configSelectedProvider === 'DeepSeek' ? 'selected' : ''}>DeepSeek</option>
                    <option value="Gemini" ${configSelectedProvider === 'Gemini' ? 'selected' : ''}>Google Gemini</option>
                    <option value="Hugging Face" ${configSelectedProvider === 'Hugging Face' ? 'selected' : ''}>Hugging Face</option>
                    <option value="Ollama" ${configSelectedProvider === 'Ollama' ? 'selected' : ''}>Ollama (Local)</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="display: flex; flex-direction: column; gap: 0.375rem;">
                <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Model ID / Model Identifier</label>
                <input type="text" id="configModelInput" class="form-input" placeholder="e.g. gpt-4o or llama3" value="${configModelName}" style="font-size: 0.8125rem; font-family: var(--font-mono);">
              </div>

              <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem;">
                <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Feature Enablement</label>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--color-text-primary); cursor: pointer;">
                    <input type="checkbox" class="feature-checkbox" value="Playground" ${configSelectedFeatures.includes('Playground') ? 'checked' : ''}>
                    <span>Playground</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--color-text-primary); cursor: pointer;">
                    <input type="checkbox" class="feature-checkbox" value="Evaluators" ${configSelectedFeatures.includes('Evaluators') ? 'checked' : ''}>
                    <span>Evaluators</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--color-text-primary); cursor: pointer;">
                    <input type="checkbox" class="feature-checkbox" value="Assistant" ${configSelectedFeatures.includes('Assistant') ? 'checked' : ''}>
                    <span>Assistant</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="submitCreateModelConfigBtn" style="font-weight: 600;">Create Configuration</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'confirm-revoke-config') {
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-error); margin: 0; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                <span>Revoke Model Configuration</span>
              </h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem;">
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); line-height: 1.45; margin: 0;">
                Are you sure you want to delete this Model Configuration?
                <br><br>
                This model configuration will be deleted and disabled across the enabled dashboard features (Playground, Evaluators, Assistant).
              </p>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="confirmRevokeConfigBtn" style="background: var(--color-error); border-color: var(--color-error); font-weight: 600;">Revoke Configuration</button>
            </div>
          </div>
        </div>
      `;
    } else if (activeModal === 'confirm-revoke-provider') {
      modalHtml = `
        <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
          <div class="search-modal" style="max-width: 480px; text-align: left;">
            <div class="search-modal-header" style="justify-content: space-between;">
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-error); margin: 0; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                <span>Revoke Provider Key</span>
              </h3>
              <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
            </div>
            
            <div class="search-modal-body" style="padding: 1.5rem;">
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); line-height: 1.45; margin: 0;">
                Are you sure you want to revoke this LLM Provider API key?
                <br><br>
                This action is permanent and cannot be undone. Playground runs and evaluators that depend on this provider key will no longer function until a new key is provided.
              </p>
            </div>

            <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
              <button class="btn btn-secondary btn-sm" id="closeModalBtn">Cancel</button>
              <button class="btn btn-primary btn-sm" id="confirmRevokeProviderBtn" style="background: var(--color-error); border-color: var(--color-error); font-weight: 600;">Revoke Key</button>
            </div>
          </div>
        </div>
      `;
    }

    // Two-column layout container
    pageContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%;">
        <!-- Upper Title Banner -->
        <div style="padding: 2rem 2rem 1rem 2rem; border-bottom: 1px solid var(--color-border); background: var(--color-bg-card); display: flex; flex-direction: column; gap: 0.5rem; text-align: left;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); margin: 0;">Settings</h2>
          <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 0;">
            Manage workspace options, active API authentication tokens, plan tiers, and profiles.
          </p>
        </div>

        <!-- Split settings container -->
        <div class="settings-container" style="max-width: 1200px; width: 100%;">
          <!-- Left Navigation Pane -->
          <div class="settings-subnav">
            <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; padding: 0.5rem 0.75rem 0.25rem 0.75rem; display: block;">Access and Security</span>
            <div class="settings-subnav-item ${activeTab === 'apikeys' ? 'active' : ''}" data-target="apikeys">
              <i data-lucide="key" style="width: 16px; height: 16px;"></i>
              <span>API Keys</span>
            </div>
            <div class="settings-subnav-item ${activeTab === 'providerkeys' ? 'active' : ''}" data-target="providerkeys">
              <i data-lucide="shield-check" style="width: 16px; height: 16px;"></i>
              <span>Provider Secrets</span>
            </div>

            <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; padding: 1rem 0.75rem 0.25rem 0.75rem; display: block;">Integrations</span>
            <div class="settings-subnav-item ${activeTab === 'modelconfigs' ? 'active' : ''}" data-target="modelconfigs">
              <i data-lucide="sliders" style="width: 16px; height: 16px;"></i>
              <span>Model Configurations</span>
            </div>
            <div class="settings-subnav-item ${activeTab === 'alerts' ? 'active' : ''}" data-target="alerts">
              <i data-lucide="bell" style="width: 16px; height: 16px;"></i>
              <span>Integrations & Alerts</span>
            </div>

            <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; padding: 1rem 0.75rem 0.25rem 0.75rem; display: block;">Profile</span>
            <div class="settings-subnav-item ${activeTab === 'profile' ? 'active' : ''}" data-target="profile">
              <i data-lucide="user" style="width: 16px; height: 16px;"></i>
              <span>Profile Settings</span>
            </div>
            <div class="settings-subnav-item ${activeTab === 'org' ? 'active' : ''}" data-target="org">
              <i data-lucide="building" style="width: 16px; height: 16px;"></i>
              <span>Organizations</span>
            </div>
            <div class="settings-subnav-item ${activeTab === 'workspaces' ? 'active' : ''}" data-target="workspaces">
              <i data-lucide="briefcase" style="width: 16px; height: 16px;"></i>
              <span>Workspaces</span>
            </div>
          </div>

          <!-- Right Content Pane -->
          <div class="settings-pane">
            ${rightPaneHtml}
          </div>
        </div>
      </div>

      <!-- Render Modals overlay target -->
      <div id="modalTargetContainer">${modalHtml}</div>
    `;

    bindEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function bindEvents() {
    // Tab switching clicks
    const subnavItems = document.querySelectorAll('.settings-subnav-item');
    subnavItems.forEach(item => {
      item.addEventListener('click', () => {
        activeTab = item.getAttribute('data-target');
        localStorage.setItem('settings_active_tab', activeTab);
        render();
      });
    });

    // Handle Forms Submission (Save Profile)
    const profileForm = document.getElementById('profileSettingsForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Profile details saved successfully!');
      });
    }

    // Handle Organizations Save
    const orgForm = document.getElementById('orgSettingsForm');
    if (orgForm) {
      orgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Organization details updated!');
      });
    }

    // Handle Workspace Renaming Save
    const workspaceForm = document.getElementById('workspaceSettingsForm');
    if (workspaceForm) {
      workspaceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('workspaceNameInput').value;
        if (newName.trim()) {
          MockDatabase.workspaceName = newName.trim();
          MockDatabase.save();
          
          // Instantly update sidebar folder label
          const sidebarLabel = document.querySelector('.sidebar-dropdown-trigger span');
          if (sidebarLabel) {
            sidebarLabel.textContent = newName.trim();
          }

          // Re-render breadcrumbs
          applyWorkspaceBreadcrumbs();
          alert('Workspace renamed successfully!');
          render();
        }
      });
    }

    // Create API Key click trigger
    const createBtn = document.getElementById('createApiKeyBtn');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        activeModal = 'create-key';
        render();
      });
    }

    // API Key generation submit
    const submitCreateKeyBtn = document.getElementById('submitCreateKeyBtn');
    if (submitCreateKeyBtn) {
      submitCreateKeyBtn.addEventListener('click', () => {
        const nameVal = document.getElementById('newKeyNameInput').value;
        if (!nameVal.trim()) {
          alert('Please enter a key name.');
          return;
        }

        const keys = MockDatabase.apiKeys || [];
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const generatedKey = `ls__key_${randomString}`;

        keys.push({
          id: `key-${Date.now()}`,
          name: nameVal.trim(),
          value: generatedKey,
          created: new Date().toISOString().split('T')[0],
          lastUsed: 'Never'
        });

        MockDatabase.apiKeys = keys;
        MockDatabase.save();

        generatedKeyToShow = generatedKey;
        activeModal = 'key-created-success';
        render();
      });
    }

    // Copy generated key to clipboard
    const copyRawKeyBtn = document.getElementById('copyRawKeyBtn');
    if (copyRawKeyBtn) {
      copyRawKeyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(generatedKeyToShow);
        alert('Key copied to clipboard!');
      });
    }

    // Close Modals
    const closeBtn = document.getElementById('closeModalBtn');
    const closeCross = document.getElementById('closeModalCross');
    if (closeBtn) closeBtn.addEventListener('click', () => { activeModal = null; render(); });
    if (closeCross) closeCross.addEventListener('click', () => { activeModal = null; render(); });

    // Rotate confirmation clicks
    const rotateBtns = document.querySelectorAll('.rotate-key-action');
    rotateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        keyToTarget = btn.getAttribute('data-id');
        activeModal = 'confirm-rotate';
        render();
      });
    });

    const confirmRotateBtn = document.getElementById('confirmRotateBtn');
    if (confirmRotateBtn) {
      confirmRotateBtn.addEventListener('click', () => {
        const keys = MockDatabase.apiKeys || [];
        const target = keys.find(k => k.id === keyToTarget);
        if (target) {
          const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          const newRotated = `ls__rotated_${randomString}`;
          
          target.value = newRotated;
          target.lastUsed = 'Never';
          MockDatabase.apiKeys = keys;
          MockDatabase.save();

          generatedKeyToShow = newRotated;
          activeModal = 'key-created-success';
          render();
        }
      });
    }

    // Revoke confirmation clicks
    const revokeBtns = document.querySelectorAll('.revoke-key-action');
    revokeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        keyToTarget = btn.getAttribute('data-id');
        activeModal = 'confirm-revoke';
        render();
      });
    });

    const confirmRevokeBtn = document.getElementById('confirmRevokeBtn');
    if (confirmRevokeBtn) {
      confirmRevokeBtn.addEventListener('click', () => {
        let keys = MockDatabase.apiKeys || [];
        keys = keys.filter(k => k.id !== keyToTarget);
        MockDatabase.apiKeys = keys;
        MockDatabase.save();

        activeModal = null;
        render();
      });
    }

    // Add Provider Key click trigger
    const addProviderKeyBtn = document.getElementById('addProviderKeyBtn');
    if (addProviderKeyBtn) {
      addProviderKeyBtn.addEventListener('click', () => {
        selectedProvider = 'OpenAI';
        providerKeyValue = '';
        providerKeyVisible = false;
        activeModal = 'create-provider-key';
        render();
      });
    }

    // Provider select dropdown change event
    const providerSelect = document.getElementById('providerSelect');
    if (providerSelect) {
      providerSelect.addEventListener('change', (e) => {
        selectedProvider = e.target.value;
        const keyInput = document.getElementById('providerKeyInput');
        if (keyInput) {
          providerKeyValue = keyInput.value;
        }
        render();
        const newKeyInput = document.getElementById('providerKeyInput');
        if (newKeyInput) {
          newKeyInput.focus();
          newKeyInput.setSelectionRange(newKeyInput.value.length, newKeyInput.value.length);
        }
      });
    }

    // Key input text change binding
    const providerKeyInput = document.getElementById('providerKeyInput');
    if (providerKeyInput) {
      providerKeyInput.addEventListener('input', (e) => {
        providerKeyValue = e.target.value;
      });
    }

    // Key visibility toggle binding
    const toggleProviderKeyVisibility = document.getElementById('toggleProviderKeyVisibility');
    if (toggleProviderKeyVisibility) {
      toggleProviderKeyVisibility.addEventListener('click', () => {
        providerKeyVisible = !providerKeyVisible;
        const keyInput = document.getElementById('providerKeyInput');
        if (keyInput) {
          providerKeyValue = keyInput.value;
        }
        render();
        const newKeyInput = document.getElementById('providerKeyInput');
        if (newKeyInput) {
          newKeyInput.focus();
          newKeyInput.setSelectionRange(newKeyInput.value.length, newKeyInput.value.length);
        }
      });
    }

    // Save provider key submit handler
    const submitCreateProviderKeyBtn = document.getElementById('submitCreateProviderKeyBtn');
    if (submitCreateProviderKeyBtn) {
      submitCreateProviderKeyBtn.addEventListener('click', () => {
        const keyInput = document.getElementById('providerKeyInput');
        const val = keyInput ? keyInput.value.trim() : '';
        if (!val) {
          alert('Please enter a valid API key or endpoint.');
          return;
        }

        const keys = MockDatabase.providerKeys || [];
        const existingIdx = keys.findIndex(k => k.provider.replace(/\s+/g, '').toLowerCase() === selectedProvider.replace(/\s+/g, '').toLowerCase());
        const displayProviderName = selectedProvider === 'Gemini' ? 'Google Gemini' : (selectedProvider === 'HuggingFace' ? 'Hugging Face' : selectedProvider);
        
        const newKeyObj = {
          id: existingIdx !== -1 ? keys[existingIdx].id : `prov-key-${Date.now()}`,
          provider: displayProviderName,
          value: val,
          created: new Date().toISOString().split('T')[0]
        };

        if (existingIdx !== -1) {
          keys[existingIdx] = newKeyObj;
        } else {
          keys.push(newKeyObj);
        }

        MockDatabase.providerKeys = keys;
        MockDatabase.save();

        activeModal = null;
        render();
      });
    }

    // Revoke provider key buttons triggers
    const revokeProviderBtns = document.querySelectorAll('.revoke-provider-key-action');
    revokeProviderBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        providerKeyToTarget = btn.getAttribute('data-id');
        activeModal = 'confirm-revoke-provider';
        render();
      });
    });

    // Confirm revoke provider key
    const confirmRevokeProviderBtn = document.getElementById('confirmRevokeProviderBtn');
    if (confirmRevokeProviderBtn) {
      confirmRevokeProviderBtn.addEventListener('click', () => {
        let keys = MockDatabase.providerKeys || [];
        keys = keys.filter(k => k.id !== providerKeyToTarget);
        MockDatabase.providerKeys = keys;
        MockDatabase.save();

        activeModal = null;
        render();
      });
    }

    // Model configurations triggers
    const createModelConfigBtn = document.getElementById('createModelConfigBtn');
    if (createModelConfigBtn) {
      createModelConfigBtn.addEventListener('click', () => {
        newConfigName = '';
        configSelectedProvider = 'OpenAI';
        configModelName = 'gpt-4o';
        configSelectedFeatures = ['Playground'];
        activeModal = 'create-model-config';
        render();
      });
    }

    const configProviderSelect = document.getElementById('configProviderSelect');
    if (configProviderSelect) {
      configProviderSelect.addEventListener('change', (e) => {
        configSelectedProvider = e.target.value;
        const nameInput = document.getElementById('configNameInput');
        const modelInput = document.getElementById('configModelInput');
        if (nameInput) newConfigName = nameInput.value;
        if (modelInput) configModelName = modelInput.value;
        render();
      });
    }

    const submitCreateModelConfigBtn = document.getElementById('submitCreateModelConfigBtn');
    if (submitCreateModelConfigBtn) {
      submitCreateModelConfigBtn.addEventListener('click', () => {
        const nameVal = document.getElementById('configNameInput').value.trim();
        const modelVal = document.getElementById('configModelInput').value.trim();
        if (!nameVal || !modelVal) {
          alert('Please enter both name and model identifier.');
          return;
        }

        const selectedCheckboxes = document.querySelectorAll('.feature-checkbox:checked');
        const featuresList = Array.from(selectedCheckboxes).map(cb => cb.value);

        const configs = MockDatabase.modelConfigurations || [];
        configs.push({
          id: `mc-${Date.now()}`,
          name: nameVal,
          provider: configSelectedProvider,
          model: modelVal,
          features: featuresList,
          created: new Date().toISOString().split('T')[0]
        });

        MockDatabase.modelConfigurations = configs;
        MockDatabase.save();

        activeModal = null;
        render();
      });
    }

    const revokeConfigBtns = document.querySelectorAll('.revoke-model-config-action');
    revokeConfigBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        configToTarget = btn.getAttribute('data-id');
        activeModal = 'confirm-revoke-config';
        render();
      });
    });

    const confirmRevokeConfigBtn = document.getElementById('confirmRevokeConfigBtn');
    if (confirmRevokeConfigBtn) {
      confirmRevokeConfigBtn.addEventListener('click', () => {
        let configs = MockDatabase.modelConfigurations || [];
        configs = configs.filter(c => c.id !== configToTarget);
        MockDatabase.modelConfigurations = configs;
        MockDatabase.save();

        activeModal = null;
        render();
      });
    }

    // Slack Integration saves, tests, and disconnects
    const saveSlackBtn = document.querySelector('.save-slack-btn');
    if (saveSlackBtn) {
      saveSlackBtn.addEventListener('click', () => {
        const val = document.getElementById('slackWebhookInput').value.trim();
        if (!val) {
          alert('Please enter a valid Slack webhook URL.');
          return;
        }
        MockDatabase.integrations.slackWebhook = val;
        MockDatabase.save();
        alert('Slack Webhook connected successfully!');
        render();
      });
    }
    const testSlackBtn = document.querySelector('.test-slack-btn');
    if (testSlackBtn) {
      testSlackBtn.addEventListener('click', () => {
        alert('Test message sent! Check Slack config validation trace.');
      });
    }
    const disconnectSlackBtn = document.querySelector('.disconnect-slack-btn');
    if (disconnectSlackBtn) {
      disconnectSlackBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to disconnect Slack integration?')) {
          MockDatabase.integrations.slackWebhook = '';
          MockDatabase.save();
          render();
        }
      });
    }

    // GitHub Integration saves, tests, and disconnects
    const saveGithubBtn = document.querySelector('.save-github-btn');
    if (saveGithubBtn) {
      saveGithubBtn.addEventListener('click', () => {
        const repo = document.getElementById('githubRepoInput').value.trim();
        const token = document.getElementById('githubTokenInput').value.trim();
        if (!repo || !token) {
          alert('Please enter both repository path (owner/repo) and access token.');
          return;
        }
        MockDatabase.integrations.githubRepo = repo;
        MockDatabase.integrations.githubToken = token;
        MockDatabase.save();
        alert('GitHub repository synced successfully!');
        render();
      });
    }
    const testGithubBtn = document.querySelector('.test-github-btn');
    if (testGithubBtn) {
      testGithubBtn.addEventListener('click', () => {
        alert('Triggered simulated prompt sync. Commit register hash: ' + Math.random().toString(16).substring(2, 8));
      });
    }
    const disconnectGithubBtn = document.querySelector('.disconnect-github-btn');
    if (disconnectGithubBtn) {
      disconnectGithubBtn.addEventListener('click', () => {
        if (confirm('Disconnect GitHub integration?')) {
          MockDatabase.integrations.githubRepo = '';
          MockDatabase.integrations.githubToken = '';
          MockDatabase.save();
          render();
        }
      });
    }

    // PagerDuty Integration saves, tests, and disconnects
    const savePagerdutyBtn = document.querySelector('.save-pagerduty-btn');
    if (savePagerdutyBtn) {
      savePagerdutyBtn.addEventListener('click', () => {
        const val = document.getElementById('pagerdutyKeyInput').value.trim();
        if (!val) {
          alert('Please enter a PagerDuty routing key.');
          return;
        }
        MockDatabase.integrations.pagerdutyKey = val;
        MockDatabase.save();
        alert('PagerDuty connected successfully!');
        render();
      });
    }
    const testPagerdutyBtn = document.querySelector('.test-pagerduty-btn');
    if (testPagerdutyBtn) {
      testPagerdutyBtn.addEventListener('click', () => {
        alert('Simulated incident triggered! Incident key: pd-tr-' + Math.floor(Math.random()*10000));
      });
    }
    const disconnectPagerdutyBtn = document.querySelector('.disconnect-pagerduty-btn');
    if (disconnectPagerdutyBtn) {
      disconnectPagerdutyBtn.addEventListener('click', () => {
        if (confirm('Disconnect PagerDuty alerts?')) {
          MockDatabase.integrations.pagerdutyKey = '';
          MockDatabase.save();
          render();
        }
      });
    }
  }

  render();
}
