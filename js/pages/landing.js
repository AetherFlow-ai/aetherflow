export function renderLandingPage() {
  // Hide top header and quick stats bar on landing page
  const header = document.getElementById('topHeader');
  const quickStats = document.getElementById('quickStatsBar');
  if (header) header.style.display = 'none';
  if (quickStats) quickStats.classList.add('hidden');

  // Hide sidebar on landing page to make it a full landing page
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = 'none';

  const pageContainer = document.getElementById('pageContent');
  pageContainer.style.padding = '0';
  pageContainer.style.maxWidth = '100%';

  // Inject full landing page HTML
  pageContainer.innerHTML = `
    <div class="landing-body">
      <!-- 1. Top Announcement Bar -->
      <div class="announcement-bar">
        <span>Catch up on everything we shipped at Interrupt</span>
        <a href="https://www.aetherflow.com/blog/interrupt-2026-overview" target="_blank" class="announcement-link">
          Explore the launches <i data-lucide="arrow-up-right" style="width: 12px; height: 12px; display: inline;"></i>
        </a>
      </div>

      <!-- 2. Navbar -->
      <nav class="landing-navbar">
        <div class="navbar-left">
          <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2b26acc19233c104b1cd_logo.svg" alt="AetherFlow Logo" class="brand-logo">
          <span class="brand-name">AetherFlow</span>
        </div>

        <div class="navbar-center">
          <div class="nav-dropdown">
            <span class="nav-link">Products <i data-lucide="chevron-down" style="width: 12px; height: 12px;"></i></span>
            <!-- Mega Dropdown exactly matching screenshot -->
            <div class="mega-dropdown">
              <div class="mega-column">
                <span class="mega-column-title">AetherFlow Platform <i data-lucide="arrow-up-right" style="width: 12px; height: 12px; display: inline;"></i></span>
                <a href="#/tracing" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6989c024180a65887312dd40_Frame%202147254707.svg" alt="Icon">
                  <div>
                    <strong>Observability</strong>
                    <span>See exactly what your agents are doing</span>
                  </div>
                </a>
                <a href="#/evaluators" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6989c0247f235ca5583fa63b_Frame%202147255166.svg" alt="Icon">
                  <div>
                    <strong>Evaluation</strong>
                    <span>Score and improve agent performance</span>
                  </div>
                </a>
                <a href="#/deployments" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6989c024926f877c1de6e728_updated.svg" alt="Icon">
                  <div>
                    <strong>Deployment</strong>
                    <span>Ship and scale agents in production</span>
                  </div>
                </a>
                <a href="#/home" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69baea024a5f7c2d229815b0_AetherFlow%20Fleet_icon_light%20mode%203.svg" alt="Icon">
                  <div>
                    <strong>Fleet</strong>
                    <span>Agents for the whole company</span>
                  </div>
                </a>
                <a href="#/sandboxes" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6a020888f9b2346912c07f41_sandboxes_light_mode%202.svg" alt="Icon">
                  <div>
                    <strong>Sandboxes</strong>
                    <span>Run agent-generated code safely</span>
                  </div>
                </a>
              </div>
              <div class="mega-column-divider"></div>
              <div class="mega-column">
                <span class="mega-column-title">Open Source Frameworks</span>
                <a href="#/studio" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6989c02453d869396317aaa3_updated-1.svg" alt="Icon">
                  <div>
                    <strong>deepagents</strong>
                    <span>Build long-running agents for complex tasks</span>
                  </div>
                </a>
                <a href="#/tracing" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6989c024409fcfc7e5b8f78f_Frame%202147254707-1.svg" alt="Icon">
                  <div>
                    <strong>aetherflow</strong>
                    <span>Quick start agents with any model provider</span>
                  </div>
                </a>
                <a href="#/studio" class="mega-item">
                  <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6989c024c2d98286a8fb058f_Frame%202147255166-1.svg" alt="Icon">
                  <div>
                    <strong>aethergraph</strong>
                    <span>Build reliable agents with low-level control</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div class="nav-dropdown">
            <span class="nav-link">Learn <i data-lucide="chevron-down" style="width: 12px; height: 12px;"></i></span>
          </div>

          <a href="#/docs" class="nav-link">Docs</a>
          
          <div class="nav-dropdown">
            <span class="nav-link">Company <i data-lucide="chevron-down" style="width: 12px; height: 12px;"></i></span>
          </div>
          
          <a href="#/pricing" class="nav-link">Pricing</a>
        </div>

        <div class="navbar-right">
          <button class="nav-btn-secondary" id="openSignInBtn">Try AetherFlow</button>
          <button class="nav-btn-primary" id="openDemoBtn">Get a demo</button>
        </div>
      </nav>

      <!-- 3. Hero Section -->
      <section class="hero-section">
        <div class="hero-glow"></div>
        <div class="hero-content">
          <h1 class="hero-title">Powering the<br>Agent Development Lifecycle</h1>
          <p class="hero-subtitle">Make experimentation repeatable, iterate faster, and gain momentum with AetherFlow.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" id="heroStartBtn">Start building</button>
            <button class="btn btn-secondary" id="heroDemoBtn">Get a demo</button>
          </div>

          <!-- Development Lifecycle Arc visualization -->
          <div class="lifecycle-container">
            <svg class="lifecycle-svg" viewBox="0 0 800 200">
              <path d="M 100 150 Q 400 30 700 150" fill="none" stroke="rgba(59,130,246,0.2)" stroke-width="3" />
              <path class="animated-dash" d="M 100 150 Q 400 30 700 150" fill="none" stroke="var(--color-brand)" stroke-width="3" stroke-dasharray="20, 150" />
            </svg>
            <div class="lifecycle-nodes">
              <div class="lifecycle-node node-build">
                <span class="node-label">Build</span>
              </div>
              <div class="lifecycle-node node-test">
                <span class="node-label">Test</span>
              </div>
              <div class="lifecycle-node node-monitor">
                <span class="node-label">Monitor</span>
              </div>
              <div class="lifecycle-node node-deploy">
                <span class="node-label">Deploy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Client Ticker Carousel -->
      <section class="ticker-section">
        <p class="ticker-title">AetherFlow powers top AI teams, from startups to global enterprises</p>
        <div class="logo-ticker-container">
          <div class="logo-ticker-track">
            <span>Klarna</span><span>Vanta</span><span>Clay</span><span>RIPPLING</span><span>Lyft</span><span>Gong</span><span>Harvey</span><span>ABRIDGE</span><span>Cloudflare</span><span>THE HOME DEPOT</span><span>Workday</span><span>Cisco</span><span>Mercor</span><span>monday.com</span><span>Nvidia</span><span>BRIDGEWATER</span><span>LinkedIn</span><span>Coinbase</span>
            <!-- Second loop for marquee continuity -->
            <span>Klarna</span><span>Vanta</span><span>Clay</span><span>RIPPLING</span><span>Lyft</span><span>Gong</span><span>Harvey</span><span>ABRIDGE</span><span>Cloudflare</span><span>THE HOME DEPOT</span><span>Workday</span><span>Cisco</span><span>Mercor</span><span>monday.com</span><span>Nvidia</span><span>BRIDGEWATER</span><span>LinkedIn</span><span>Coinbase</span>
          </div>
        </div>
      </section>

      <!-- 5. Main Product Tab Sections -->
      <section class="features-section">
        <h2 style="font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 0.5rem;">Observe, evaluate, and deploy agents with AetherFlow</h2>
        <p style="color: #94a3b8; text-align: center; max-width: 700px; margin: 0 auto 3rem auto; font-size: 1.05rem;">
          AetherFlow is framework-agnostic: trace your preferred framework or integrate AetherFlow with any agent stack using our Python, TypeScript, Go, or Java SDKs.
        </p>

        <!-- Product selection tabs -->
        <div class="feature-tabs" id="featureTabsContainer">
          <button class="feature-tab-btn active" data-tab="obs">Observability</button>
          <button class="feature-tab-btn" data-tab="eval">Evaluation</button>
          <button class="feature-tab-btn" data-tab="dep">Deployment</button>
          <button class="feature-tab-btn" data-tab="fleet">Fleet</button>
        </div>

        <div class="feature-content-card" id="featureContentCard">
          <!-- Observability Tab Content (default) -->
          <div class="feature-tab-pane" id="pane-obs">
            <div class="feature-pane-left">
              <span class="badge badge-blue" style="margin-bottom: 0.5rem;">OBSERVABILITY</span>
              <h3>Understand exactly what your agent is doing</h3>
              <p>Agents can be hard to debug and understand. Long context, branching logic, and many tools make it difficult to pinpoint where things went wrong. Tracing breaks each run into a structured timeline of steps so you can see exactly what happened, in what order, and why.</p>
              <ul>
                <li><i data-lucide="check-circle" style="color: var(--color-success); width: 16px; height: 16px;"></i> Native tracing for popular agent frameworks and OpenTelemetry</li>
                <li><i data-lucide="check-circle" style="color: var(--color-success); width: 16px; height: 16px;"></i> SDKs for Python, TypeScript, Go, and Java</li>
                <li><i data-lucide="check-circle" style="color: var(--color-success); width: 16px; height: 16px;"></i> Message threading for multi-turn chat interactions</li>
              </ul>
            </div>
            <div class="feature-pane-right">
              <!-- Visual telemetry mock -->
              <div class="mock-telemetry-box">
                <div class="telemetry-row header"><span>agent_run</span> <span class="badge badge-success">success</span></div>
                <div class="telemetry-row indented"><span>├─ plan_generator</span> <span style="font-family: var(--font-mono); color: #60a5fa;">210ms</span></div>
                <div class="telemetry-row indented-double"><span>└─ call_tool (weather)</span> <span style="font-family: var(--font-mono); color: #f59e0b;">error</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Open Source Frameworks Section -->
      <section class="frameworks-section">
        <h2 style="font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 3rem;">Build with our open source frameworks</h2>
        
        <div class="framework-cards-grid">
          <!-- Deep Agents -->
          <div class="framework-product-card">
            <span class="framework-product-badge">deepagents</span>
            <h3>Build intelligent agents for open-ended work</h3>
            <p>For highly autonomous, long-running agents with complex task plans and sub-agents.</p>
            <a href="#/studio" class="framework-link-btn">Explore deepagents <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></a>
          </div>

          <!-- AetherFlow -->
          <div class="framework-product-card">
            <span class="framework-product-badge">aetherflow</span>
            <h3>Quick start agents with any model provider</h3>
            <p>For building agents fast with prebuilt prompt templates, loaders, and tool integrations.</p>
            <a href="#/tracing" class="framework-link-btn">Explore aetherflow <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></a>
          </div>

          <!-- AetherGraph -->
          <div class="framework-product-card">
            <span class="framework-product-badge">aethergraph</span>
            <h3>Build reliable agents with low-level control</h3>
            <p>For production agents requiring state machine determinism, rollbacks, and memory checkpointers.</p>
            <a href="#/studio" class="framework-link-btn">Explore aethergraph <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></a>
          </div>
        </div>
      </section>

      <!-- 7. Customer Stories / Testimonials Section -->
      <section class="customers-section">
        <h2 style="font-size: 2.25rem; font-weight: 800; text-align: center; margin-bottom: 3rem;">Learn from teams running agents in production</h2>
        
        <div class="customer-cards-grid">
          <div class="customer-quote-card">
            <p class="customer-quote">"Klarna’s AI assistant reduced case resolution time by 80% with AetherFlow."</p>
            <span class="customer-author">Klarna Team</span>
          </div>
          <div class="customer-quote-card">
            <p class="customer-quote">"Monday Service achieved 8.7x faster feedback loops for evals with AetherFlow."</p>
            <span class="customer-author">monday.com Team</span>
          </div>
          <div class="customer-quote-card">
            <p class="customer-quote">"Podium reduced engineering escalations by 90% with AetherFlow."</p>
            <span class="customer-author">Podium Team</span>
          </div>
        </div>
      </section>

      <!-- 8. Numbers & Stats Section -->
      <section class="stats-section">
        <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 3rem;">Trusted by the largest builder community in AI</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">100M+</span>
            <span class="stat-label">Monthly open source downloads</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">6K+</span>
            <span class="stat-label">Active AetherFlow customers</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5 of 10</span>
            <span class="stat-label">Fortune 10 are AetherFlow customers</span>
          </div>
        </div>
      </section>

      <!-- 9. Final Call to Action & Footer -->
      <section class="footer-cta-section">
        <h2>Get started with AetherFlow</h2>
        <p style="color: #94a3b8; margin-bottom: 2.5rem;">Use AetherFlow, the agent engineering platform, to improve every step of the agent development lifecycle.</p>
        <div class="hero-actions" style="justify-content: center;">
          <button class="btn btn-primary" id="footerStartBtn">Start building</button>
          <button class="btn btn-secondary" id="footerDemoBtn">Get a demo</button>
        </div>
      </section>

      <!-- Main brand footer with Sitemap list -->
      <footer class="landing-footer">
        <div class="footer-sitemap">
          <div class="sitemap-column">
            <span>Products</span>
            <a href="#/home">AetherFlow Platform</a>
            <a href="#/tracing">Observability</a>
            <a href="#/evaluators">Evaluation</a>
            <a href="#/deployments">Deployment</a>
            <a href="#/home">Fleet</a>
            <a href="#/sandboxes">Sandboxes</a>
          </div>
          <div class="sitemap-column">
            <span>Resources</span>
            <a href="https://www.aetherflow.com/blog">Blog</a>
            <a href="#/home">Customer Stories</a>
            <a href="https://docs.smith.aetherflow.com">Guides</a>
            <a href="#/home">Academy</a>
          </div>
          <div class="sitemap-column">
            <span>Company</span>
            <a href="#/settings">About</a>
            <a href="#/settings">Careers</a>
            <a href="#/settings">Partners</a>
          </div>
          <div class="sitemap-column">
            <span>Newsletter</span>
            <form style="display: flex; gap: 0.5rem;" onsubmit="event.preventDefault(); alert('Subscribed!')">
              <input type="email" class="form-input" placeholder="Your email" style="background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: #ffffff;" required>
              <button class="btn btn-primary btn-xs">Subscribe</button>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <div style="display: flex; align-items: center; gap: 0.5rem; color: #10b981;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
            <span>All systems operational</span>
          </div>
          <div style="display: flex; gap: 1rem; color: #475569;">
            <span>Privacy policy</span>
            <span>Terms of service</span>
          </div>
        </div>
      </footer>
    </div>

    <!-- Login Modal Dialog Overlay (Triggered by Start/Try Buttons) -->
    <div class="login-modal-overlay hidden" id="loginModalOverlay">
      <div class="login-modal-card">
        <button class="login-modal-close" id="closeLoginModalBtn"><i data-lucide="x"></i></button>
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2b26acc19233c104b1cd_logo.svg" alt="AetherFlow" style="height: 32px; width: auto; margin-bottom: 0.5rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">Sign In to AetherFlow</h3>
          <p style="font-size: 0.8125rem; color: #64748b;">Choose a sign in provider to access your workspaces.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <button class="btn btn-secondary login-oauth-btn" id="googleOauthBtn" style="background: #ffffff; color: #0f172a; border-color: #cbd5e1; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-weight: 600; font-size: 0.875rem;">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.62v3.02h3.87c2.26-2.08 3.58-5.14 3.58-8.49z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.27v3.13C3.25 21.28 7.37 24 12 24z"/>
              <path fill="#FBBC05" d="M5.24 14.22A7.16 7.16 0 0 1 4.8 12c0-.79.13-1.57.38-2.31V6.56H1.27A11.96 11.96 0 0 0 0 12c0 2.05.52 4 1.27 5.75l3.97-3.53z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.37 0 3.25 2.72 1.27 6.56l3.97 3.53c.95-2.88 3.61-5.01 6.76-5.01z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button class="btn btn-secondary login-oauth-btn" id="githubOauthBtn" style="background: #24292f; color: #ffffff; border-color: #24292f; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; font-weight: 600; font-size: 0.875rem;">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; color: #94a3b8; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; margin: 1rem 0;">
          <span style="height: 1px; background: #e2e8f0; flex: 1;"></span>
          <span>OR</span>
          <span style="height: 1px; background: #e2e8f0; flex: 1;"></span>
        </div>

        <form style="display: flex; flex-direction: column; gap: 0.75rem;" onsubmit="event.preventDefault(); document.getElementById('modalEmailSubmitBtn').click();">
          <input type="email" class="form-input" placeholder="Work Email" style="width: 100%;" required>
          <button class="btn btn-primary" id="modalEmailSubmitBtn" style="width: 100%; font-weight: 600;">
            Continue with Email
          </button>
        </form>
      </div>
    </div>
  `;

  // Inject beautiful dark-themed landing page CSS
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .landing-body {
      background-color: #030712;
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: var(--font-sans);
    }

    /* 1. Announcement Bar */
    .announcement-bar {
      background-color: #2563eb;
      color: #ffffff;
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0.625rem 1rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      z-index: 100;
    }

    .announcement-link {
      color: #ffffff;
      font-weight: 700;
      text-decoration: underline;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    /* 2. Navbar */
    .landing-navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 3rem;
      background-color: rgba(3, 7, 18, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      position: sticky;
      top: 0;
      z-index: 90;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .brand-logo {
      height: 24px;
      width: auto;
      filter: brightness(0) invert(1);
    }

    .brand-name {
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
    }

    .navbar-center {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }

    .nav-link {
      color: #94a3b8;
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-link:hover {
      color: #ffffff;
      text-decoration: none;
    }

    /* Mega Dropdown menu */
    .nav-dropdown {
      position: relative;
    }

    .mega-dropdown {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background-color: #0b0f19;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      display: none;
      grid-template-columns: 260px 1px 260px;
      gap: 1.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 120;
    }

    .nav-dropdown:hover .mega-dropdown {
      display: grid;
    }

    .mega-column {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .mega-column-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      margin-bottom: 0.25rem;
      letter-spacing: 0.05em;
    }

    .mega-column-divider {
      background-color: rgba(255, 255, 255, 0.05);
      width: 1px;
      height: 100%;
    }

    .mega-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.5rem;
      border-radius: var(--radius-md);
      text-decoration: none;
      color: #ffffff;
      transition: background-color 0.15s;
    }

    .mega-item:hover {
      background-color: rgba(255, 255, 255, 0.04);
      text-decoration: none;
    }

    .mega-item img {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }

    .mega-item div {
      display: flex;
      flex-direction: column;
    }

    .mega-item strong {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #ffffff;
    }

    .mega-item span {
      font-size: 0.75rem;
      color: #94a3b8;
      margin-top: 0.125rem;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .nav-btn-secondary {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-md);
      color: #ffffff;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .nav-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-btn-primary {
      background: #2563eb;
      border: none;
      border-radius: var(--radius-md);
      color: #ffffff;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .nav-btn-primary:hover {
      background: #1d4ed8;
    }

    /* 3. Hero Section */
    .hero-section {
      position: relative;
      padding: 6rem 2rem 4rem 2rem;
      text-align: center;
      overflow: hidden;
    }

    .hero-glow {
      position: absolute;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 60vw;
      height: 60vh;
      background: radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%);
      pointer-events: none;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #ffffff 30%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 1.15rem;
      color: #94a3b8;
      max-width: 540px;
      margin: 0 auto 2.5rem auto;
      line-height: 1.5;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      justify-content: center;
      margin-bottom: 4rem;
    }

    /* Development Lifecycle Arc */
    .lifecycle-container {
      position: relative;
      max-width: 700px;
      margin: 0 auto;
      height: 180px;
    }

    .lifecycle-svg {
      width: 100%;
      height: 100%;
    }

    .animated-dash {
      animation: dashMove 2.5s linear infinite;
    }

    @keyframes dashMove {
      to {
        stroke-dashoffset: -170;
      }
    }

    .lifecycle-nodes {
      position: absolute;
      width: 100%;
      top: 140px;
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
    }

    .lifecycle-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .lifecycle-node::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #2563eb;
      box-shadow: 0 0 10px #2563eb;
      margin-bottom: 0.5rem;
    }

    .node-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* 4. Ticker Section */
    .ticker-section {
      padding: 3rem 0;
      background: #090d16;
      border-top: 1px solid rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.03);
      text-align: center;
    }

    .ticker-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
    }

    .logo-ticker-container {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
    }

    .logo-ticker-track {
      display: inline-block;
      animation: tickerRun 35s linear infinite;
    }

    .logo-ticker-track span {
      font-size: 1.15rem;
      font-weight: 700;
      color: #334155;
      margin: 0 2rem;
      display: inline-block;
      letter-spacing: -0.03em;
    }

    @keyframes tickerRun {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }

    /* 5. Features Tabs Section */
    .features-section {
      padding: 6rem 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    .feature-tabs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .feature-tab-btn {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.05);
      color: #94a3b8;
      font-size: 0.8125rem;
      font-weight: 600;
      padding: 0.5rem 1.25rem;
      border-radius: 9999px;
      cursor: pointer;
    }

    .feature-tab-btn:hover {
      background: rgba(255,255,255,0.03);
      color: #ffffff;
    }

    .feature-tab-btn.active {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
    }

    .feature-content-card {
      background: #090d16;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--radius-lg);
      padding: 2.5rem;
    }

    .feature-tab-pane {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: center;
    }

    @media (min-width: 768px) {
      .feature-tab-pane {
        grid-template-columns: 1.2fr 1fr;
      }
    }

    .feature-pane-left h3 {
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .feature-pane-left p {
      color: #94a3b8;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .feature-pane-left ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .feature-pane-left li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #cbd5e1;
    }

    .mock-telemetry-box {
      background: #020617;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--radius-md);
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
    }

    .telemetry-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.375rem 0.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.02);
    }

    .telemetry-row.header {
      font-weight: 600;
      border-bottom-color: rgba(255,255,255,0.05);
    }

    .indented { padding-left: 1.5rem; }
    .indented-double { padding-left: 2.5rem; }

    /* 6. Open Source Section */
    .frameworks-section {
      padding: 6rem 2rem;
      background: #090d16;
      border-top: 1px solid rgba(255,255,255,0.03);
    }

    .framework-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    .framework-product-card {
      background: #030712;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--radius-lg);
      padding: 2.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .framework-product-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: #60a5fa;
      background: rgba(59,130,246,0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      align-self: flex-start;
    }

    .framework-product-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.3;
    }

    .framework-product-card p {
      color: #94a3b8;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .framework-link-btn {
      color: #60a5fa;
      font-size: 0.8125rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      text-decoration: none;
      margin-top: auto;
    }

    /* 7. Customers Section */
    .customers-section {
      padding: 6rem 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    .customer-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .customer-quote-card {
      background: #090d16;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--radius-lg);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .customer-quote {
      font-size: 0.95rem;
      line-height: 1.5;
      color: #e2e8f0;
      font-style: italic;
    }

    .customer-author {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
    }

    /* 8. Stats Section */
    .stats-section {
      padding: 6rem 2rem;
      background: #090d16;
      border-top: 1px solid rgba(255,255,255,0.03);
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 3rem;
      max-width: 1000px;
      width: 100%;
      margin: 0 auto;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      color: #ffffff;
    }

    .stat-label {
      color: #94a3b8;
      font-size: 0.875rem;
    }

    /* 9. CTA & Footer Section */
    .footer-cta-section {
      padding: 8rem 2rem;
      text-align: center;
      background: linear-gradient(180deg, #030712 0%, #0b0f19 100%);
    }

    .footer-cta-section h2 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
    }

    .landing-footer {
      background: #0b0f19;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 4rem 3rem 2rem 3rem;
    }

    .footer-sitemap {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 3rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto 3rem auto;
    }

    .sitemap-column {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .sitemap-column span {
      font-size: 0.8125rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }

    .sitemap-column a {
      color: #475569;
      font-size: 0.8125rem;
      text-decoration: none;
    }

    .sitemap-column a:hover {
      color: #ffffff;
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255,255,255,0.03);
      padding-top: 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      font-size: 0.75rem;
    }

    /* Login Modal Overlay */
    .login-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(3, 7, 18, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .login-modal-overlay.hidden {
      opacity: 0;
      pointer-events: none;
      display: none !important;
    }

    .login-modal-card {
      background: #ffffff;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: 2.5rem;
      max-width: 420px;
      width: 100%;
      position: relative;
      color: var(--color-text-primary);
    }

    .login-modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: var(--color-text-muted);
      cursor: pointer;
    }

    .login-modal-close:hover {
      color: var(--color-text-primary);
    }

    .login-oauth-btn:hover {
      opacity: 0.9;
    }
  `;
  document.head.appendChild(styleEl);

  // Modal Open/Close Logic
  const overlay = document.getElementById('loginModalOverlay');
  const closeBtn = document.getElementById('closeLoginModalBtn');

  const openModal = () => {
    overlay.classList.remove('hidden');
  };

  const closeModal = () => {
    overlay.classList.add('hidden');
  };

  document.getElementById('openSignInBtn').addEventListener('click', openModal);
  document.getElementById('openDemoBtn').addEventListener('click', openModal);
  document.getElementById('heroStartBtn').addEventListener('click', openModal);
  document.getElementById('heroDemoBtn').addEventListener('click', openModal);
  document.getElementById('footerStartBtn').addEventListener('click', openModal);
  document.getElementById('footerDemoBtn').addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Authenticate and Login mock triggers
  const handleOauthLogin = () => {
    closeModal();
    alert('Logged in to AetherFlow workspace successfully!');
    
    // Restore layout
    sidebar.style.display = 'flex';
    header.style.display = 'flex';
    
    // Route to main page
    window.location.hash = '#/home';
  };

  document.getElementById('googleOauthBtn').addEventListener('click', handleOauthLogin);
  document.getElementById('githubOauthBtn').addEventListener('click', handleOauthLogin);
  document.getElementById('modalEmailSubmitBtn').addEventListener('click', handleOauthLogin);

  // Interactive features tabs change handler
  const tabButtons = document.querySelectorAll('.feature-tab-btn');
  const cardContainer = document.getElementById('featureContentCard');

  const TabsData = {
    obs: {
      badge: 'OBSERVABILITY',
      title: 'Understand exactly what your agent is doing',
      desc: 'Agents can be hard to debug and understand. Long context, branching logic, and many tools make it difficult to pinpoint where things went wrong. Tracing breaks each run into a structured timeline of steps so you can see exactly what happened, in what order, and why.',
      items: [
        'Native tracing for popular agent frameworks and OpenTelemetry',
        'SDKs for Python, TypeScript, Go, and Java',
        'Message threading for multi-turn chat interactions'
      ],
      mockHtml: `
        <div class="mock-telemetry-box">
          <div class="telemetry-row header"><span>agent_run</span> <span class="badge badge-success">success</span></div>
          <div class="telemetry-row indented"><span>├─ plan_generator</span> <span style="font-family: var(--font-mono); color: #60a5fa;">210ms</span></div>
          <div class="telemetry-row indented-double"><span>└─ call_tool (weather)</span> <span style="font-family: var(--font-mono); color: #f59e0b;">error</span></div>
        </div>
      `
    },
    eval: {
      badge: 'EVALUATION',
      title: 'Use real-world usage for iterative improvement',
      desc: 'Capture production traces, turn them into test cases, and score agents with a mix of human review and automated evals. Each iteration makes your agent measurably better.',
      items: [
        'Reusable LLM-as-judge and multi-turn evals',
        'Eval calibration with human feedback',
        'Online and offline scoring pipelines'
      ],
      mockHtml: `
        <div class="mock-telemetry-box" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8;"><span>Evaluation Run</span><span>Metric Score</span></div>
          <div style="background: rgba(255,255,255,0.03); padding: 0.375rem; border-radius: 4px; display: flex; justify-content: space-between;"><span>correctness</span><span style="color: #10b981; font-weight: bold;">0.98</span></div>
          <div style="background: rgba(255,255,255,0.03); padding: 0.375rem; border-radius: 4px; display: flex; justify-content: space-between;"><span>hallucination</span><span style="color: #ef4444; font-weight: bold;">0.02</span></div>
        </div>
      `
    },
    dep: {
      badge: 'DEPLOYMENT',
      title: 'Ship and scale agents in production',
      desc: 'Unlike traditional web apps, agents work for long durations and need to handle async collaboration with humans and other agents. The agent server provides memory, conversational threads, and durable checkpointing out of the box.',
      items: [
        'Supports human-in-the-loop interactions and background agents',
        'Type-safe streaming of messages and custom events',
        'Scalable, distributed runtime to handle agent swarms'
      ],
      mockHtml: `
        <div class="mock-telemetry-box" style="font-family: var(--font-mono);">
          <div style="color: #10b981; margin-bottom: 0.25rem;">$ aethergraph deploy</div>
          <div style="color: #94a3b8;">Deploying agent 'support-agent'...</div>
          <div style="color: #60a5fa; margin-top: 0.5rem;">✔ Live: https://agent-prod.aetherflow.run</div>
        </div>
      `
    },
    fleet: {
      badge: 'FLEET',
      title: 'Agents for the whole company',
      desc: 'Routine tasks like research, follow-ups, and status checks eat up your day. Describe what you need in plain language, and Fleet takes action on it across your daily tools.',
      items: [
        'Bring your own models',
        'Use first-party integrations or extend with any MCP server',
        'Export agent files for pro-code development'
      ],
      mockHtml: `
        <div class="mock-telemetry-box">
          <div style="font-weight: bold; margin-bottom: 0.5rem;">Daily Slack Summarizer</div>
          <div style="font-size: 0.75rem; color: #94a3b8; line-height: 1.4;">Trigger: Every day at 9:00 AM<br>Action: Fetch Slack messages, summarize, email digest.</div>
        </div>
      `
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button selection state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content panel
      const target = btn.getAttribute('data-tab');
      const data = TabsData[target] || TabsData['obs'];

      cardContainer.innerHTML = `
        <div class="feature-tab-pane">
          <div class="feature-pane-left">
            <span class="badge badge-blue" style="margin-bottom: 0.5rem;">${data.badge}</span>
            <h3>${data.title}</h3>
            <p>${data.desc}</p>
            <ul>
              ${data.items.map(it => `
                <li><i data-lucide="check-circle" style="color: var(--color-success); width: 16px; height: 16px;"></i> ${it}</li>
              `).join('')}
            </ul>
          </div>
          <div class="feature-pane-right">
            ${data.mockHtml}
          </div>
        </div>
      `;

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // Cleanup handler when leaving landing page
  window.addEventListener('hashchange', function cleanup() {
    if (sidebar) sidebar.style.display = 'flex';
    if (header) header.style.display = 'flex';
    pageContainer.removeAttribute('style');
    styleEl.remove();
    if (window.lucide) {
      window.lucide.createIcons();
    }
    window.removeEventListener('hashchange', cleanup);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
