import { renderHeader } from '../components/header.js';

export function renderStudioPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'My First App', link: '#/home' },
      { text: 'Studio', link: '#/studio' }
    ],
    showWorkspaceBadge: true,
    showStatsBar: false
  });

  const pageContainer = document.getElementById('pageContent');
  pageContainer.style.padding = '0';
  pageContainer.style.maxWidth = '100%';

  pageContainer.innerHTML = `
    <div class="studio-layout" style="display: flex; width: 100%; height: calc(100vh - 48px); overflow: hidden; background: #ffffff;">
      <!-- 1. Left Side: Graph Canvas -->
      <div class="studio-canvas" style="flex: 1.3; background-color: #f8fafc; background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; border-right: 1px solid var(--color-border); overflow: auto; padding: 3rem;">
        
        <!-- Live status indicator at top-left of canvas -->
        <div style="position: absolute; top: 1rem; left: 1rem; display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.9); border: 1px solid var(--color-border); padding: 0.375rem 0.75rem; border-radius: var(--radius-md); font-size: 0.75rem; box-shadow: var(--shadow-sm); z-index: 10;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #94a3b8;" id="agentServerStatusDot"></span>
          <span style="font-weight: 600; color: var(--color-text-secondary);" id="agentServerStatusText">Agent Server Offline</span>
        </div>

        <!-- Graph Visualizer Flow -->
        <div class="graph-flow-container" style="display: flex; flex-direction: column; align-items: center; gap: 2rem; position: relative; z-index: 2;">
          
          <!-- Start Node -->
          <div class="graph-node-pill" style="padding: 0.375rem 1.25rem; border-radius: 9999px; background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 0.75rem; font-family: var(--font-mono); font-weight: 600; color: #475569; box-shadow: var(--shadow-sm);">
            __start__
          </div>
          
          <!-- Down Arrow 1 -->
          <svg width="24" height="32" viewBox="0 0 24 32" style="margin: -1rem 0;">
            <path d="M12 0v30" stroke="#94a3b8" stroke-width="2" fill="none"/>
            <path d="M8 24l4 6 4-6" stroke="#94a3b8" stroke-width="2" fill="none" stroke-linejoin="round"/>
          </svg>

          <!-- Model Node -->
          <div class="graph-node-box" id="node-model" style="padding: 0.75rem 2rem; border-radius: var(--radius-md); background: #e0f2fe; border: 1px solid #bae6fd; font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 600; color: #0369a1; box-shadow: var(--shadow-sm); min-width: 120px; text-align: center; transition: all 0.2s;">
            model
          </div>

          <!-- Loop Arrows: Double path between Model & Tools -->
          <div style="position: relative; height: 48px; width: 100px; margin: -1.5rem 0;">
            <svg width="100" height="48" viewBox="0 0 100 48" style="position: absolute; top: 0; left: 0;">
              <!-- Down link (left) -->
              <path d="M35 0v48" stroke="#94a3b8" stroke-width="2" fill="none"/>
              <path d="M31 40l4 8 4-8" stroke="#94a3b8" stroke-width="2" fill="none"/>
              
              <!-- Up link (right, dotted blue recurving loop) -->
              <path d="M65 48V0" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
              <path d="M61 8l4-8 4 8" stroke="#3b82f6" stroke-width="1.5" fill="none"/>
            </svg>
          </div>

          <!-- Tools Node -->
          <div class="graph-node-box" id="node-tools" style="padding: 0.75rem 2rem; border-radius: var(--radius-md); background: #fef3c7; border: 1px solid #fde68a; font-size: 0.8125rem; font-family: var(--font-mono); font-weight: 600; color: #b45309; box-shadow: var(--shadow-sm); min-width: 120px; text-align: center; transition: all 0.2s;">
            tools
          </div>

          <!-- Down Arrow 3 -->
          <svg width="24" height="32" viewBox="0 0 24 32" style="margin: -1rem 0;">
            <path d="M12 0v30" stroke="#94a3b8" stroke-width="2" fill="none"/>
            <path d="M8 24l4 6 4-6" stroke="#94a3b8" stroke-width="2" fill="none" stroke-linejoin="round"/>
          </svg>

          <!-- End Node -->
          <div class="graph-node-pill" style="padding: 0.375rem 1.25rem; border-radius: 9999px; background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 0.75rem; font-family: var(--font-mono); font-weight: 600; color: #475569; box-shadow: var(--shadow-sm);">
            __end__
          </div>
        </div>

        <!-- Hidden overlay details for active runs -->
        <div id="graphRunOutput" style="display: none; width: 100%; max-width: 400px; margin-top: 2rem; background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1rem; font-size: 0.75rem; font-family: var(--font-mono); box-shadow: var(--shadow-sm); animation: modalFadeIn 0.2s;">
          <div style="font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
            <span>RUN LOGS</span>
            <span style="color: var(--color-success);">RUNNING</span>
          </div>
          <div style="color: #475569; max-height: 120px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem;" id="runLogsOutput">
            <span>[info] Initialized agent server graph runner...</span>
          </div>
        </div>
      </div>
      
      <!-- 2. Right Side: Thread Pane -->
      <div class="studio-thread-pane" style="flex: 0.7; background: #ffffff; display: flex; flex-direction: column; height: 100%; position: relative;">
        <!-- Header -->
        <div style="padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
          <span style="font-weight: 700; font-size: 0.875rem; color: var(--color-text-primary);">Thread</span>
          <i data-lucide="more-horizontal" style="width: 16px; height: 16px; color: var(--color-text-muted); cursor: pointer;"></i>
        </div>

        <!-- Thread welcome actions panel -->
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2.5rem; text-align: center; gap: 1.5rem;" id="threadWelcomeView">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);">
            <i data-lucide="network" style="width: 22px; height: 22px;"></i>
          </div>
          <div>
            <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">Visualize and Debug your agents</h3>
            <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.5; max-width: 280px; margin: 0 auto;">
              Studio works with AetherFlow Deployments or graphs that are running locally via the Agent Server.
            </p>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 240px; margin-top: 0.5rem;">
            <button class="btn btn-primary btn-sm" id="studioQuickstartBtn" style="font-weight: 600;">
              Studio Quickstart
            </button>
            <button class="btn btn-secondary btn-sm" id="configureConnectionBtn" style="font-weight: 600; border-color: var(--color-border);">
              Configure connection
            </button>
          </div>
        </div>

        <!-- Active graph runner thread view (shown after connecting) -->
        <div id="threadActiveView" style="display: none; flex: 1; flex-direction: column; overflow: hidden;">
          <div style="flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem;" id="chatLogsContainer">
            <div style="background: #f8fafc; border: 1px solid var(--color-border); padding: 0.75rem 1rem; border-radius: var(--radius-md); align-self: flex-start; max-width: 85%;">
              <span style="font-size: 0.6875rem; font-weight: 700; color: var(--color-brand); display: block; margin-bottom: 0.25rem;">__start__</span>
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); margin: 0;">{"messages": [{"role": "user", "content": "Find flights from Paris to Tokyo."}]}</p>
            </div>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 0.75rem 1rem; border-radius: var(--radius-md); align-self: flex-start; max-width: 85%;" id="activeModelMessage">
              <span style="font-size: 0.6875rem; font-weight: 700; color: #0284c7; display: block; margin-bottom: 0.25rem;">model</span>
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); margin: 0;">Calling tool flight_search_api with query "Paris to Tokyo"...</p>
            </div>
          </div>
          
          <div style="padding: 1rem; border-top: 1px solid var(--color-border); display: flex; gap: 0.5rem;">
            <input type="text" class="form-input" id="agentInputTxt" placeholder="Send message to agent server..." style="flex: 1; font-size: 0.8125rem; padding: 0.5rem;">
            <button class="btn btn-primary btn-sm" id="sendToAgentBtn"><i data-lucide="send" style="width: 14px; height: 14px;"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Configure Studio Connection Modal -->
    <div class="search-overlay hidden" id="configureConnectionModal" style="z-index: 2100; align-items: center; padding-top: 0;">
      <div class="search-modal" style="max-width: 480px;">
        <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
          <h4 style="font-weight: 700; font-size: 0.95rem; color: var(--color-text-primary); margin: 0;">Configure Studio connection</h4>
          <button class="btn-secondary" style="border: none; padding: 0.25rem; cursor: pointer; color: var(--color-text-muted);" id="closeConfigModalBtn"><i data-lucide="x" style="width: 16px; height: 16px;"></i></button>
        </div>

        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem;">
          <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0; margin-top: -0.25rem;">Enter the endpoint info of your Agent Server</p>
          
          <div class="form-group">
            <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Base URL</label>
            <input type="text" class="form-input" id="studioBaseUrlInput" value="http://localhost:2024" style="background: #ffffff; border: 1px solid var(--color-border); padding: 0.5rem 0.75rem; font-size: 0.8125rem;">
          </div>

          <!-- Custom Headers Section -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; margin: 0;">Custom Headers</label>
            </div>
            <p style="font-size: 0.6875rem; color: var(--color-text-muted); margin-bottom: 0.75rem; line-height: 1.3;">Values will be stored locally in your browser and applied to all connections to this server.</p>
            
            <!-- Headers Rows list -->
            <div id="customHeadersList" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div class="header-input-row" style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="text" class="form-input" placeholder="Header name" style="flex: 1; font-size: 0.75rem; padding: 0.375rem 0.5rem;">
                
                <div style="position: relative; flex: 1.2; display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #ffffff;">
                  <input type="password" class="form-input header-val-field" placeholder="Header value" style="border: none; font-size: 0.75rem; padding: 0.375rem 0.5rem; flex: 1; outline: none; background: transparent;">
                  <button class="toggle-header-visibility-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted); padding: 0 0.5rem; display: flex; align-items: center;">
                    <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>

                <button class="delete-header-row-btn" style="border: none; background: transparent; cursor: pointer; color: #ef4444; padding: 0.25rem;"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
              </div>
            </div>

            <button class="btn btn-secondary btn-xs" id="addHeaderRowBtn" style="font-weight: 600;">
              <i data-lucide="plus" style="width: 12px; height: 12px;"></i>
              <span>Custom Header</span>
            </button>
          </div>

          <!-- Advanced Settings dropdown -->
          <div style="border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
            <div id="advancedSettingsToggle" style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; color: var(--color-text-secondary); cursor: pointer;">
              <i data-lucide="chevron-right" style="width: 14px; height: 14px; transition: transform 0.2s;" id="advChevron"></i>
              <span>Advanced Settings</span>
            </div>
            <div id="advancedSettingsContent" style="display: none; padding-top: 0.75rem; flex-direction: column; gap: 0.75rem;">
              <div class="form-group">
                <label class="form-label" style="font-size: 0.6875rem;">Workspace Context override</label>
                <input type="text" class="form-input" value="default" style="font-size: 0.75rem; padding: 0.375rem 0.5rem;">
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--color-border); background: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
          <a href="https://docs.smith.aetherflow.com" target="_blank" style="font-size: 0.8125rem; color: var(--color-brand); font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 2px;">
            <span>Docs</span>
            <i data-lucide="external-link" style="width: 12px; height: 12px;"></i>
          </a>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-secondary btn-sm" id="cancelConfigModalBtn" style="border-color: var(--color-border);">Cancel</button>
            <button class="btn btn-primary btn-sm" id="connectConfigBtn" style="background: var(--color-brand); font-weight: 600;">Connect</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Studio Quickstart Modal/Drawer -->
    <div class="search-overlay hidden" id="studioQuickstartModal" style="z-index: 2100; align-items: center; padding-top: 0;">
      <div class="search-modal" style="max-width: 580px;">
        <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h4 style="font-weight: 700; font-size: 0.95rem; color: var(--color-text-primary); margin: 0;">Studio Quickstart</h4>
            <a href="https://docs.smith.aetherflow.com" target="_blank" style="font-size: 0.75rem; color: var(--color-brand); text-decoration: none; display: flex; align-items: center; gap: 1px;">
              <span>Docs</span>
              <i data-lucide="external-link" style="width: 10px; height: 10px;"></i>
            </a>
          </div>
          <button class="btn-secondary" style="border: none; padding: 0.25rem; cursor: pointer; color: var(--color-text-muted);" id="closeQuickstartModalBtn"><i data-lucide="x" style="width: 16px; height: 16px;"></i></button>
        </div>

        <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; overflow-y: auto; max-height: 60vh;">
          <div>
            <h5 style="font-weight: 700; font-size: 0.875rem; color: var(--color-text-primary); margin-bottom: 0.25rem;">Create a AetherGraph app</h5>
            <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 1rem;">Set up a AetherGraph app locally for testing and development.</p>
          </div>

          <!-- Language Tab Selector -->
          <div style="display: flex; border-bottom: 1px solid var(--color-border); margin-bottom: 0.5rem;">
            <button class="qs-tab active" data-lang="python" style="padding: 0.5rem 1rem; border: none; border-bottom: 2px solid var(--color-brand); background: transparent; font-weight: 600; font-size: 0.8125rem; cursor: pointer; color: var(--color-brand);">Python</button>
            <button class="qs-tab" data-lang="ts" style="padding: 0.5rem 1rem; border: none; border-bottom: 2px solid transparent; background: transparent; font-weight: 500; font-size: 0.8125rem; cursor: pointer; color: var(--color-text-secondary);">TypeScript</button>
          </div>

          <!-- Steps Content (will toggle values based on tab) -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem;" id="quickstartStepsContainer">
            <!-- Step 1 -->
            <div style="display: flex; gap: 1rem;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700;">1</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary);">Create your API Key</span>
                <button class="btn btn-secondary btn-xs" id="generateApiKeyBtn" style="align-self: flex-start; font-weight: 600; border-color: var(--color-border);">Generate API Key</button>
              </div>
            </div>

            <!-- Step 2 -->
            <div style="display: flex; gap: 1rem;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700;">2</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary);">Install the AetherGraph CLI</span>
                <div class="code-copy-wrapper" style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #f8fafc; padding: 0.5rem 0.75rem;">
                  <code style="flex: 1; font-family: var(--font-mono); font-size: 0.75rem; color: #0f172a;" id="step2Code">pip install -U "aethergraph-cli[inmem]"</code>
                  <button class="copy-code-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted);" data-target="step2Code"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div style="display: flex; gap: 1rem;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700;">3</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary);">Create a AetherGraph app</span>
                <p style="font-size: 0.7125rem; color: var(--color-text-secondary); margin: 0;" id="step3Desc">Create a new app from the new-aethergraph-project-python template.</p>
                <div class="code-copy-wrapper" style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #f8fafc; padding: 0.5rem 0.75rem;">
                  <code style="flex: 1; font-family: var(--font-mono); font-size: 0.75rem; color: #0f172a;" id="step3Code">aethergraph new path/to/your/app --template new-aethergraph-project-python</code>
                  <button class="copy-code-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted);" data-target="step3Code"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
                </div>
              </div>
            </div>

            <!-- Step 4 -->
            <div style="display: flex; gap: 1rem;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700;">4</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary);">Install dependencies</span>
                <div class="code-copy-wrapper" style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #f8fafc; padding: 0.5rem 0.75rem;">
                  <code style="flex: 1; font-family: var(--font-mono); font-size: 0.75rem; color: #0f172a;" id="step4Code">cd path/to/your/app && pip install -e .</code>
                  <button class="copy-code-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted);" data-target="step4Code"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
                </div>
              </div>
            </div>

            <!-- Step 5 -->
            <div style="display: flex; gap: 1rem;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700;">5</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary);">Create a .env file</span>
                <p style="font-size: 0.7125rem; color: var(--color-text-secondary); margin: 0;">You will find a .env.example in the root of your new AetherGraph app. Create a .env file in the root of your new AetherGraph app and copy the contents of the .env.example file into it, filling in the necessary API keys:</p>
                <div class="code-copy-wrapper" style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #f8fafc; padding: 0.5rem 0.75rem;">
                  <code style="flex: 1; font-family: var(--font-mono); font-size: 0.75rem; color: #0f172a;" id="step5Code">AETHERFLOW_API_KEY=<your-api-key></code>
                  <button class="copy-code-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted);" data-target="step5Code"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
                </div>
              </div>
            </div>

            <!-- Step 6 -->
            <div style="display: flex; gap: 1rem;">
              <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; font-weight: 700;">6</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
                <span style="font-weight: 600; font-size: 0.8125rem; color: var(--color-text-primary);">Launch Agent Server</span>
                <div class="code-copy-wrapper" style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #f8fafc; padding: 0.5rem 0.75rem;">
                  <code style="flex: 1; font-family: var(--font-mono); font-size: 0.75rem; color: #0f172a;" id="step6Code">aethergraph dev</code>
                  <button class="copy-code-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted);" data-target="step6Code"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--color-border); background: #f8fafc; display: flex; justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm" id="closeQuickstartModalBottomBtn" style="border-color: var(--color-border);">Close</button>
        </div>
      </div>
    </div>
  `;

  // --- Dynamic Javascript Logic ---
  
  // Modals DOM elements
  const configModal = document.getElementById('configureConnectionModal');
  const quickstartModal = document.getElementById('studioQuickstartModal');
  
  const openConfigBtn = document.getElementById('configureConnectionBtn');
  const closeConfigModalBtn = document.getElementById('closeConfigModalBtn');
  const cancelConfigModalBtn = document.getElementById('cancelConfigModalBtn');
  const connectConfigBtn = document.getElementById('connectConfigBtn');
  
  const openQuickstartBtn = document.getElementById('studioQuickstartBtn');
  const closeQuickstartModalBtn = document.getElementById('closeQuickstartModalBtn');
  const closeQuickstartModalBottomBtn = document.getElementById('closeQuickstartModalBottomBtn');
  
  // Status and Thread views DOM
  const welcomeView = document.getElementById('threadWelcomeView');
  const activeView = document.getElementById('threadActiveView');
  const statusDot = document.getElementById('agentServerStatusDot');
  const statusText = document.getElementById('agentServerStatusText');
  const runLogsOutput = document.getElementById('runLogsOutput');
  const graphRunOutput = document.getElementById('graphRunOutput');
  
  const modelNode = document.getElementById('node-model');
  const toolsNode = document.getElementById('node-tools');

  // Configure modal toggles
  if (openConfigBtn) openConfigBtn.addEventListener('click', () => configModal.classList.remove('hidden'));
  
  const hideConfig = () => configModal.classList.add('hidden');
  if (closeConfigModalBtn) closeConfigModalBtn.addEventListener('click', hideConfig);
  if (cancelConfigModalBtn) cancelConfigModalBtn.addEventListener('click', hideConfig);

  // Quickstart modal toggles
  if (openQuickstartBtn) openQuickstartBtn.addEventListener('click', () => quickstartModal.classList.remove('hidden'));
  
  const hideQuickstart = () => quickstartModal.classList.add('hidden');
  if (closeQuickstartModalBtn) closeQuickstartModalBtn.addEventListener('click', hideQuickstart);
  if (closeQuickstartModalBottomBtn) closeQuickstartModalBottomBtn.addEventListener('click', hideQuickstart);

  let activeServerUrl = 'http://localhost:2024';

  // Real Local Connection Logic
  if (connectConfigBtn) {
    connectConfigBtn.addEventListener('click', () => {
      const baseUrlInput = document.getElementById('studioBaseUrlInput');
      const baseUrl = baseUrlInput ? baseUrlInput.value.trim() : 'http://localhost:2024';
      
      statusDot.style.background = '#eab308'; // yellow
      statusText.innerText = `Connecting to ${baseUrl}...`;
      hideConfig();

      fetch(`${baseUrl}/info`)
        .then(response => {
          if (!response.ok) throw new Error('Server returned an error');
          return response.json();
        })
        .then(data => {
          activeServerUrl = baseUrl;
          
          // Connected!
          statusDot.style.background = '#10b981'; // green
          statusText.innerText = `Connected: ${data.server || 'Agent Server'}`;
          
          welcomeView.style.display = 'none';
          activeView.style.display = 'flex';
          graphRunOutput.style.display = 'block';
          
          runLogsOutput.innerHTML = `
            <span>[info] Connected to ${data.server} (${data.version || 'v1.0.0'})</span>
            <span>[info] Active Graph: "${data.activeGraph || 'default'}"</span>
            <span>[info] Ready to receive query inputs...</span>
          `;
        })
        .catch(err => {
          statusDot.style.background = '#ef4444'; // red
          statusText.innerText = 'Connection Failed';
          alert(`Connection failed to ${baseUrl}.\n\nPlease ensure your local Agent Server is running. You can start it by running:\n  npm run server\nin your project terminal.`);
          
          welcomeView.style.display = 'flex';
          activeView.style.display = 'none';
          graphRunOutput.style.display = 'none';
        });
    });
  }

  // CLI quickstart tabs toggle
  const qsTabs = document.querySelectorAll('.qs-tab');
  const step2Code = document.getElementById('step2Code');
  const step3Desc = document.getElementById('step3Desc');
  const step3Code = document.getElementById('step3Code');
  const step4Code = document.getElementById('step4Code');
  const step6Code = document.getElementById('step6Code');

  qsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      qsTabs.forEach(t => {
        t.classList.remove('active');
        t.style.borderBottomColor = 'transparent';
        t.style.color = 'var(--color-text-secondary)';
      });
      tab.classList.add('active');
      tab.style.borderBottomColor = 'var(--color-brand)';
      tab.style.color = 'var(--color-brand)';

      const lang = tab.getAttribute('data-lang');
      if (lang === 'python') {
        step2Code.innerText = 'pip install -U "aethergraph-cli[inmem]"';
        step3Desc.innerText = 'Create a new app from the new-aethergraph-project-python template.';
        step3Code.innerText = 'aethergraph new path/to/your/app --template new-aethergraph-project-python';
        step4Code.innerText = 'cd path/to/your/app && pip install -e .';
        step6Code.innerText = 'aethergraph dev';
      } else {
        step2Code.innerText = 'npm install -g @aetherflow/aethergraph-cli';
        step3Desc.innerText = 'Create a new app from the new-aethergraph-project-js template.';
        step3Code.innerText = 'aethergraph new path/to/your/app --template new-aethergraph-project-js';
        step4Code.innerText = 'cd path/to/your/app && npm install';
        step6Code.innerText = 'npx @aetherflow/aethergraph-cli dev';
      }
    });
  });

  // API Key Generator inside quickstart
  const genKeyBtn = document.getElementById('generateApiKeyBtn');
  if (genKeyBtn) {
    genKeyBtn.addEventListener('click', () => {
      const generatedKey = `lsv2_pt_${Math.random().toString(36).substring(2, 14)}_${Math.random().toString(36).substring(2, 14)}`;
      genKeyBtn.outerHTML = `
        <div style="display: flex; align-items: center; border: 1px solid var(--color-success); border-radius: var(--radius-md); background: var(--color-success-bg); padding: 0.5rem 0.75rem; width: 100%; max-width: 320px;">
          <code style="flex: 1; font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-success); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" id="generatedKeyTxt">${generatedKey}</code>
          <button style="border: none; background: transparent; cursor: pointer; color: var(--color-success); padding: 0.125rem;" onclick="navigator.clipboard.writeText('${generatedKey}'); alert('API Key copied!')"><i data-lucide="copy" style="width: 14px; height: 14px;"></i></button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Copy code handler
  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const text = document.getElementById(targetId).innerText;
      navigator.clipboard.writeText(text);
      
      const originalInner = btn.innerHTML;
      btn.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; color: var(--color-success);"></i>`;
      if (window.lucide) window.lucide.createIcons();
      
      setTimeout(() => {
        btn.innerHTML = originalInner;
        if (window.lucide) window.lucide.createIcons();
      }, 1500);
    });
  });

  // Custom connection modal details addition
  const addHeaderBtn = document.getElementById('addHeaderRowBtn');
  const headersList = document.getElementById('customHeadersList');
  
  if (addHeaderBtn) {
    addHeaderBtn.addEventListener('click', () => {
      const rowId = `header-row-${Date.now()}`;
      const row = document.createElement('div');
      row.className = 'header-input-row';
      row.id = rowId;
      row.style.display = 'flex';
      row.style.gap = '0.5rem';
      row.style.alignItems = 'center';
      row.style.marginTop = '0.25rem';
      
      row.innerHTML = `
        <input type="text" class="form-input" placeholder="Header name" style="flex: 1; font-size: 0.75rem; padding: 0.375rem 0.5rem;">
        
        <div style="position: relative; flex: 1.2; display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #ffffff;">
          <input type="password" class="form-input header-val-field" placeholder="Header value" style="border: none; font-size: 0.75rem; padding: 0.375rem 0.5rem; flex: 1; outline: none; background: transparent;">
          <button class="toggle-header-visibility-btn" style="border: none; background: transparent; cursor: pointer; color: var(--color-text-muted); padding: 0 0.5rem; display: flex; align-items: center;">
            <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
          </button>
        </div>

        <button class="delete-header-row-btn" style="border: none; background: transparent; cursor: pointer; color: #ef4444; padding: 0.25rem;"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
      `;
      
      headersList.appendChild(row);
      if (window.lucide) window.lucide.createIcons();
      
      // Bind visibility toggle & delete
      bindRowActions(row);
    });
  }

  function bindRowActions(row) {
    const toggleBtn = row.querySelector('.toggle-header-visibility-btn');
    const deleteBtn = row.querySelector('.delete-header-row-btn');
    const valInput = row.querySelector('.header-val-field');

    if (toggleBtn && valInput) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = toggleBtn.querySelector('i');
        if (valInput.type === 'password') {
          valInput.type = 'text';
          toggleBtn.innerHTML = `<i data-lucide="eye-off" style="width: 14px; height: 14px;"></i>`;
        } else {
          valInput.type = 'password';
          toggleBtn.innerHTML = `<i data-lucide="eye" style="width: 14px; height: 14px;"></i>`;
        }
        if (window.lucide) window.lucide.createIcons();
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        row.remove();
      });
    }
  }

  // Bind first row actions
  document.querySelectorAll('.header-input-row').forEach(row => bindRowActions(row));

  // Advanced settings toggle
  const advToggle = document.getElementById('advancedSettingsToggle');
  const advContent = document.getElementById('advancedSettingsContent');
  const advChevron = document.getElementById('advChevron');
  if (advToggle) {
    advToggle.addEventListener('click', () => {
      if (advContent.style.display === 'none') {
        advContent.style.display = 'flex';
        advChevron.style.transform = 'rotate(90deg)';
      } else {
        advContent.style.display = 'none';
        advChevron.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Active thread message sending
  const sendToAgentBtn = document.getElementById('sendToAgentBtn');
  const agentInputTxt = document.getElementById('agentInputTxt');
  const chatLogs = document.getElementById('chatLogsContainer');
  
  if (sendToAgentBtn && agentInputTxt) {
    const handleSend = () => {
      const msg = agentInputTxt.value.trim();
      if (!msg) return;
      agentInputTxt.value = '';

      // User chat message bubble
      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'background: #f8fafc; border: 1px solid var(--color-border); padding: 0.75rem 1rem; border-radius: var(--radius-md); align-self: flex-start; max-width: 85%; animation: modalFadeIn 0.15s;';
      userMsg.innerHTML = `
        <span style="font-size: 0.6875rem; font-weight: 700; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">user</span>
        <p style="font-size: 0.8125rem; color: var(--color-text-primary); margin: 0;">${msg}</p>
      `;
      chatLogs.appendChild(userMsg);
      chatLogs.scrollTop = chatLogs.scrollHeight;

      // Add a status message to the logs
      const infoMsg = document.createElement('span');
      infoMsg.innerText = `[info] Dispatching run request to ${activeServerUrl}/runs...`;
      runLogsOutput.appendChild(infoMsg);
      runLogsOutput.scrollTop = runLogsOutput.scrollHeight;

      // POST message to the local agent server
      fetch(`${activeServerUrl}/runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      .then(response => {
        if (!response.ok) throw new Error('Agent execution failed');
        return response.json();
      })
      .then(data => {
        const logsList = data.logs || [];
        const responseText = data.response || '';

        // Simulating a live streaming step-by-step log output for visuals
        let stepIdx = 0;
        function streamNextStep() {
          if (stepIdx < logsList.length) {
            const step = logsList[stepIdx];
            
            // Render run log span
            const span = document.createElement('span');
            span.innerText = `[run] node "${step.node}": ${step.message}`;
            if (step.status === 'success') span.style.color = 'var(--color-success)';
            if (step.status === 'error') span.style.color = 'var(--color-error)';
            runLogsOutput.appendChild(span);
            runLogsOutput.scrollTop = runLogsOutput.scrollHeight;

            // Highlight corresponding graph nodes
            if (step.node === 'model') {
              modelNode.style.boxShadow = '0 0 15px rgba(3,105,161,0.8)';
              toolsNode.style.boxShadow = 'none';
            } else if (step.node === 'tools') {
              toolsNode.style.boxShadow = '0 0 15px rgba(180,83,9,0.8)';
              modelNode.style.boxShadow = 'none';
            } else {
              modelNode.style.boxShadow = 'none';
              toolsNode.style.boxShadow = 'none';
            }

            stepIdx++;
            setTimeout(streamNextStep, 400); // 400ms delay between steps
          } else {
            // Done streaming logs, render the final assistant message
            modelNode.style.boxShadow = 'none';
            toolsNode.style.boxShadow = 'none';

            const botMsg = document.createElement('div');
            botMsg.style.cssText = 'background: #eff6ff; border: 1px solid #bfdbfe; padding: 0.75rem 1rem; border-radius: var(--radius-md); align-self: flex-start; max-width: 85%; animation: modalFadeIn 0.15s;';
            botMsg.innerHTML = `
              <span style="font-size: 0.6875rem; font-weight: 700; color: #0284c7; display: block; margin-bottom: 0.25rem;">model</span>
              <p style="font-size: 0.8125rem; color: var(--color-text-primary); margin: 0; white-space: pre-wrap;">${responseText}</p>
            `;
            chatLogs.appendChild(botMsg);
            chatLogs.scrollTop = chatLogs.scrollHeight;
          }
        }

        streamNextStep();
      })
      .catch(err => {
        console.error(err);
        const errSpan = document.createElement('span');
        errSpan.style.color = 'var(--color-error)';
        errSpan.innerText = `[error] Execution failed: Unable to communicate with server.`;
        runLogsOutput.appendChild(errSpan);
        runLogsOutput.scrollTop = runLogsOutput.scrollHeight;
      });
    };

    sendToAgentBtn.addEventListener('click', handleSend);
    agentInputTxt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  // Re-enable padding reset when leaving this page
  window.addEventListener('hashchange', function cleanup() {
    pageContainer.removeAttribute('style');
    window.removeEventListener('hashchange', cleanup);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
