export function renderPricingPage() {
  // Hide top header and quick stats bar on pricing page
  const header = document.getElementById('topHeader');
  const quickStats = document.getElementById('quickStatsBar');
  if (header) header.style.display = 'none';
  if (quickStats) quickStats.classList.add('hidden');

  // Hide sidebar on pricing page as it represents a landing sub-page
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = 'none';

  const pageContainer = document.getElementById('pageContent');
  pageContainer.style.padding = '0';
  pageContainer.style.maxWidth = '100%';

  // Inject full Pricing Page HTML
  pageContainer.innerHTML = `
    <div class="landing-body pricing-page-body">
      <!-- 1. Top Announcement Bar -->
      <div class="announcement-bar">
        <span>Catch up on everything we shipped at Interrupt</span>
        <a href="https://www.aetherflow.com/blog/interrupt-2026-overview" target="_blank" class="announcement-link">
          Explore the launches <i data-lucide="arrow-up-right" style="width: 12px; height: 12px; display: inline;"></i>
        </a>
      </div>

      <!-- 2. Navbar -->
      <nav class="landing-navbar">
        <div class="navbar-left" style="cursor: pointer;" onclick="window.location.hash='#/landing'">
          <img src="https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2b26acc19233c104b1cd_logo.svg" alt="AetherFlow Logo" class="brand-logo">
          <span class="brand-name">AetherFlow</span>
        </div>

        <div class="navbar-center">
          <a href="#/landing" class="nav-link">Products</a>
          <a href="#/landing" class="nav-link">Learn</a>
          <a href="#/docs" class="nav-link">Docs</a>
          <a href="#/landing" class="nav-link">Company</a>
          <a href="#/pricing" class="nav-link active" style="color: #ffffff;">Pricing</a>
        </div>

        <div class="navbar-right">
          <button class="nav-btn-secondary" id="tryAetherFlowBtn">Try AetherFlow</button>
          <button class="nav-btn-primary" id="getDemoBtn">Get a demo</button>
        </div>
      </nav>

      <!-- 3. Pricing Title Hero -->
      <section class="pricing-hero">
        <span class="pricing-pretitle">Pricing</span>
        <h1 class="pricing-title">Plans for teams of any size</h1>
        <p class="pricing-subtitle">Get access to each AetherFlow service - pay for what you use.</p>
      </section>

      <!-- 4. Pricing Cards Grid -->
      <section class="pricing-grid-section">
        <div class="pricing-split-layout" id="pricingSplitLayout">
          <div class="pricing-cards-grid" id="pricingCardsGrid">
            <!-- Sliding Outline Frame -->
            <div class="pricing-hover-frame" id="pricingHoverFrame"></div>

            <!-- Developer Card -->
            <div class="pricing-card" id="card-Developer" data-card-plan="Developer">
              <h3 class="card-plan-name">Developer</h3>
              <p class="card-plan-desc">For solo users getting started.</p>
              <div class="card-price-row">
                <span class="card-price">$0</span>
                <div class="card-price-meta">
                  <span>/ seat per month</span>
                  <span>then pay as you go</span>
                </div>
              </div>
              <button class="btn btn-secondary checkout-trigger-btn" data-plan="Developer" data-price="0" style="background: rgba(255,255,255,0.05); color: #ffffff; border-color: rgba(255,255,255,0.1); width: 100%; font-weight: 600; margin-bottom: 2rem;">Start for free</button>
              <div class="card-features-list">
                <span class="features-list-title">Get started with:</span>
                <ul>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Up to 5k base traces / mo, then pay-as-you-go</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Tracing to debug agent execution</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Online and offline evals</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Prompt Hub, Playground, and Canvas</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Annotation queues for human feedback</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Monitoring and alerting</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> 1 Fleet agent</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Up to 50 Fleet runs / mo</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Community support</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> 1 seat</li>
                </ul>
              </div>
            </div>

            <!-- Plus Card -->
            <div class="pricing-card plus-premium-card" id="card-Plus" data-card-plan="Plus">
              <div class="plus-glow"></div>
              <h3 class="card-plan-name">Plus</h3>
              <p class="card-plan-desc">For teams building and deploying agents.</p>
              <div class="card-price-row">
                <span class="card-price">$39</span>
                <div class="card-price-meta">
                  <span>/ seat per month</span>
                  <span>then pay as you go</span>
                </div>
              </div>
              <button class="btn btn-primary checkout-trigger-btn" data-plan="Plus" data-price="39" style="width: 100%; font-weight: 600; margin-bottom: 2rem;">Sign up</button>
              <div class="card-features-list">
                <span class="features-list-title">Everything in the Developer plan, and:</span>
                <ul>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Up to 10k base traces / mo, then pay-as-you-go</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> 1 dev-sized agent deployment included</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Email support</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Unlimited Fleet agents</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Up to 500 Fleet runs / mo, then pay-as-you-go</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Add unlimited seats</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Up to 3 workspaces</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Access to AetherFlow Engine</li>
                  <li><i data-lucide="plus" style="width: 14px; height: 14px; color: #60a5fa;"></i> Access to AetherFlow Sandboxes</li>
                </ul>
              </div>
            </div>

            <!-- Enterprise Card -->
            <div class="pricing-card" id="card-Enterprise" data-card-plan="Enterprise">
              <h3 class="card-plan-name">Enterprise</h3>
              <p class="card-plan-desc">For teams with advanced hosting, security, and support needs.</p>
              <div class="card-price-row" style="margin: 1.5rem 0;">
                <span class="card-price" style="font-size: 2rem;">Custom pricing</span>
              </div>
              <button class="btn btn-secondary" onclick="alert('Contacting sales...')" style="background: rgba(255,255,255,0.05); color: #ffffff; border-color: rgba(255,255,255,0.1); width: 100%; font-weight: 600; margin-bottom: 2rem;">Contact sales</button>
              <div class="card-features-list">
                <span class="features-list-title">Everything in the Plus plan, and:</span>
                <ul>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Alternative hosting options, including hybrid and self-hosted</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Custom SSO and RBAC</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Access to deployed engineering team</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Support SLA</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Team trainings & architectural guidance</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Custom seats and workspaces</li>
                  <li><i data-lucide="check" style="width: 14px; height: 14px; color: #10b981;"></i> Custom packages for Fleet, Engine, and Sandboxes</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Stripe Inline Pane (Displays side-by-side on click!) -->
          <div class="stripe-inline-pane hidden" id="stripeInlinePane">
            <div class="stripe-window" style="box-shadow: none; border-radius: 0;">
              <!-- Stripe window header -->
              <div class="stripe-window-header" style="background-color: #f8fafc;">
                <div class="stripe-header-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span style="font-weight: 700; font-size: 0.875rem; color: #0f172a;">Stripe Checkout</span>
                </div>
                <button class="stripe-window-close" id="closeStripeInlineBtn"><i data-lucide="x" style="width: 16px; height: 16px;"></i></button>
              </div>

              <!-- Stripe body -->
              <div class="stripe-window-body" style="grid-template-columns: 1fr;">
                <!-- Billing summary -->
                <div class="stripe-summary-pane" style="padding: 1.5rem; border-right: none; border-bottom: 1px solid #e2e8f0;">
                  <span class="stripe-summary-subtitle" id="stripeInlinePlanLabel">Plus Workspace Plan</span>
                  <span class="stripe-summary-price" id="stripeInlinePriceLabel" style="font-size: 2.25rem; color: #0f172a; margin-top: 0.25rem;">$39.00</span>
                  
                  <div style="margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1rem;">
                    <div class="summary-line-item">
                      <span>Monthly billing</span>
                      <span id="stripeInlineBasePrice">$39.00</span>
                    </div>
                  </div>
                </div>

                <!-- Payment form -->
                <div class="stripe-form-pane" style="padding: 1.5rem; gap: 0.75rem;">
                  <form id="stripeInlinePaymentForm" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div class="stripe-form-group">
                      <label>Email address</label>
                      <input type="email" class="stripe-input" value="ashutoshkumarsingh0x@gmail.com" required>
                    </div>
                    <div class="stripe-form-group">
                      <label>Card details</label>
                      <div class="card-input-wrapper" style="border: 1px solid #cbd5e1; border-radius: 6px;">
                        <input type="text" class="stripe-input" placeholder="1234 5678 1234 5678" style="border: none; padding: 0.5rem 0.25rem; flex: 1;" required>
                        <input type="text" class="stripe-input" placeholder="MM / YY" style="border: none; padding: 0.5rem 0.25rem; width: 4.2rem; text-align: center;" required>
                        <input type="text" class="stripe-input" placeholder="CVC" style="border: none; padding: 0.5rem 0.25rem; width: 3rem; text-align: center;" required>
                      </div>
                    </div>
                    <button type="submit" class="stripe-pay-btn" id="stripeInlinePayBtn" style="margin-top: 0.5rem;">
                      Upgrade Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Startups Credit Option -->
        <div class="startups-credit-bar">
          <span>Small team just getting started? We offer discounted rates and credits for VC-backed startups.</span>
          <a href="#/settings" class="startup-link">AetherFlow for Startups <i data-lucide="arrow-right" style="width: 14px; height: 14px; display: inline;"></i></a>
        </div>
      </section>

      <!-- 5. Features Detailed Grid Matrix -->
      <section class="features-matrix-section">
        <h2 class="matrix-title">Compare Features</h2>
        
        <div class="matrix-table-container">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Features</th>
                <th>Developer</th>
                <th>Plus</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <!-- Group 1: Basics -->
              <tr class="matrix-subheader"><td colspan="4">Pricing & Seat Details</td></tr>
              <tr>
                <td>Users / Seats</td>
                <td>Maximum of 1 seat (free)</td>
                <td>Add unlimited seats $39 per seat/month</td>
                <td>Custom packages</td>
              </tr>
              <tr>
                <td>Trace volume (Observability & Evaluation)</td>
                <td>5k base traces / mo included</td>
                <td>10k base traces / mo included</td>
                <td>Custom limits</td>
              </tr>
              <tr>
                <td>Max trace ingestion and trace size</td>
                <td>Hourly limit policies apply</td>
                <td>Extended limits apply</td>
                <td>Unlimited/custom policy</td>
              </tr>
              <tr>
                <td>Deployment runs (Deployment)</td>
                <td>N/A</td>
                <td>1 free Dev deployment included. Then $0.005 / deployment run</td>
                <td>Custom policy</td>
              </tr>
              <tr>
                <td>Uptime cost (Deployment)</td>
                <td>N/A</td>
                <td>$0.0036 / min (Prod), $0.0007 / min (Dev)</td>
                <td>Custom packages</td>
              </tr>

              <!-- Group 2: Fleet -->
              <tr class="matrix-subheader"><td colspan="4">AetherFlow Fleet Details</td></tr>
              <tr>
                <td>Number of Fleet agents</td>
                <td>1 agent limit</td>
                <td>Unlimited agents</td>
                <td>Unlimited agents</td>
              </tr>
              <tr>
                <td>Fleet runs</td>
                <td>50 / mo included</td>
                <td>500 / mo included. Then $0.05 / Fleet run</td>
                <td>Custom packages</td>
              </tr>

              <!-- Group 3: Sandboxes -->
              <tr class="matrix-subheader"><td colspan="4">AetherFlow Sandbox Details</td></tr>
              <tr>
                <td>Engine Metrics (Engine)</td>
                <td>N/A</td>
                <td>$1.50 / LCU (AetherFlow Compute Unit)</td>
                <td>Custom agreements</td>
              </tr>
              <tr>
                <td>Sandboxes pricing</td>
                <td>N/A</td>
                <td>vCPU: $0.0576/hr, RAM: $0.0185/GiB-hr</td>
                <td>Custom packages</td>
              </tr>

              <!-- Group 4: Hosting & Support -->
              <tr class="matrix-subheader"><td colspan="4">Hosting & Compliance</td></tr>
              <tr>
                <td>Platform hosting option(s)</td>
                <td>Cloud</td>
                <td>Cloud</td>
                <td>Cloud, Hybrid, or Self-Hosted</td>
              </tr>
              <tr>
                <td>Data location</td>
                <td>AetherFlow's Cloud (US or EU)</td>
                <td>AetherFlow's Cloud (US or EU)</td>
                <td>Your VPC / custom region</td>
              </tr>
              <tr>
                <td>Support tier</td>
                <td>Community Forum</td>
                <td>Email Support</td>
                <td>Access to deployed engineering, Trainings, Architectural guidance, SLA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. General Pricing FAQs -->
      <section class="faq-section">
        <h2 class="faq-main-title">General Pricing Questions</h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-trigger">
              <span>Which plan is right for me?</span>
              <i data-lucide="chevron-down"></i>
            </button>
            <div class="faq-answer">
              <p>The Developer plan is perfect for solo developers tracing locally and running small-scale evaluations. If you want multi-seat collaboration, workspaces, and deployed agent swarms, choose the Plus plan.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-trigger">
              <span>Will you train on the data that I send to AetherFlow?</span>
              <i data-lucide="chevron-down"></i>
            </button>
            <div class="faq-answer">
              <p>No. AetherFlow does not train models on customer data ingested by AetherFlow. Your telemetry and workspace databases are entirely secure and confidential.</p>
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-trigger">
              <span>What is a seat?</span>
              <i data-lucide="chevron-down"></i>
            </button>
            <div class="faq-answer">
              <p>A seat represents a single user credentials account permitted to join and access workspaces within your organization hierarchy.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Footer Sitemap -->
      <footer class="landing-footer" style="background-color: #030712;">
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

    <!-- 8. Stripe Checkout Simulator Overlay -->
    <div class="stripe-overlay hidden" id="stripeCheckoutOverlay">
      <div class="stripe-window">
        <!-- Stripe top bar -->
        <div class="stripe-window-header">
          <div class="stripe-header-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span style="font-weight: 700; font-size: 0.95rem;">AetherFlow Checkout</span>
          </div>
          <button class="stripe-window-close" id="closeStripeBtn"><i data-lucide="x"></i></button>
        </div>

        <div class="stripe-window-body">
          <!-- Left Billing Summary Pane -->
          <div class="stripe-summary-pane">
            <span class="stripe-summary-subtitle" id="stripePlanLabel">Plus Workspace Plan</span>
            <span class="stripe-summary-price" id="stripePriceLabel">$39.00</span>
            <span class="stripe-summary-period">Due now, billed monthly per active seat</span>
            
            <div style="margin-top: 2rem; border-top: 1px solid #e2e8f0; padding-top: 1.5rem;">
              <div class="summary-line-item">
                <span>1 Active Seat × Monthly billing</span>
                <span id="stripeBasePrice">$39.00</span>
              </div>
              <div class="summary-line-item" style="font-weight: 700; color: #0f172a; margin-top: 0.5rem;">
                <span>Total amount</span>
                <span id="stripeTotalPrice">$39.00</span>
              </div>
            </div>
          </div>

          <!-- Right Card Details Form Pane -->
          <div class="stripe-form-pane">
            <h4 style="font-size: 0.9rem; font-weight: 600; color: #0f172a; margin-bottom: 1.25rem;">Payment details</h4>
            
            <form id="stripePaymentForm" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="stripe-form-group">
                <label>Email address</label>
                <input type="email" class="stripe-input" value="ashutoshkumarsingh0x@gmail.com" required>
              </div>

              <div class="stripe-form-group">
                <label>Card details</label>
                <div class="card-input-wrapper">
                  <input type="text" class="stripe-input" placeholder="1234 5678 1234 5678" style="border: none; padding: 0.5rem 0.25rem; flex: 1;" required>
                  <input type="text" class="stripe-input" placeholder="MM / YY" style="border: none; padding: 0.5rem 0.25rem; width: 4.5rem; text-align: center;" required>
                  <input type="text" class="stripe-input" placeholder="CVC" style="border: none; padding: 0.5rem 0.25rem; width: 3.5rem; text-align: center;" required>
                </div>
              </div>

              <div class="stripe-form-group">
                <label>Cardholder name</label>
                <input type="text" class="stripe-input" placeholder="Ashutosh Singh" required>
              </div>

              <div class="stripe-form-group">
                <label>Country or region</label>
                <select class="stripe-input" style="background-color: #ffffff;">
                  <option value="US">United States</option>
                  <option value="IN">India</option>
                  <option value="EU">Germany</option>
                </select>
              </div>

              <button type="submit" class="stripe-pay-btn" id="stripePayBtn">
                Subscribe & Upgrade
              </button>
            </form>
          </div>
        </div>

        <!-- Stripe Secure Trust Badges footer -->
        <div class="stripe-window-footer">
          <span>Powered by Stripe • Terms • Privacy</span>
        </div>
      </div>
    </div>
  `;

  // Inject Stripe Checkout Specific Styles
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .pricing-page-body {
      background-color: #030712 !important;
    }

    .pricing-hero {
      text-align: center;
      padding: 6rem 2rem 2rem 2rem;
      background: radial-gradient(circle at top, rgba(37,99,235,0.06) 0%, transparent 60%);
    }

    .pricing-pretitle {
      font-size: 0.8125rem;
      font-weight: 700;
      color: #3b82f6;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .pricing-title {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin: 0.5rem 0;
      background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .pricing-grid-section {
      padding: 2rem 2rem 4rem 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    .pricing-split-layout {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
      transition: all 0.3s ease;
      width: 100%;
    }

    @media (min-width: 992px) {
      .pricing-split-layout {
        flex-direction: row;
      }
    }

    .pricing-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
      width: 100%;
      flex: 2;
      transition: all 0.3s ease;
      position: relative; /* Context parent for absolute positioned frame */
    }

    .pricing-hover-frame {
      position: absolute;
      top: 0;
      left: 0;
      border: 2px solid #2563eb;
      box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
      border-radius: var(--radius-lg);
      pointer-events: none;
      opacity: 0;
      z-index: 5;
      transition: left 0.25s cubic-bezier(0.25, 1, 0.5, 1), top 0.25s cubic-bezier(0.25, 1, 0.5, 1), width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s ease;
    }

    .pricing-split-layout.split-active .pricing-cards-grid {
      grid-template-columns: 1fr;
      flex: 1.2;
    }

    .pricing-card {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: var(--radius-lg);
      padding: 2.5rem 2.25rem;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .pricing-card:hover {
      transform: translateY(-4px) scale(1.01);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    .pricing-card.card-selected {
      border-color: #2563eb !important;
      box-shadow: 0 0 0 2px #2563eb, 0 10px 30px rgba(37,99,235,0.15) !important;
      transform: scale(1.02) !important;
    }

    .plus-premium-card {
      border-color: rgba(37,99,235,0.3);
      box-shadow: 0 4px 30px rgba(37, 99, 235, 0.05);
    }

    .stripe-inline-pane {
      flex: 1;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      position: sticky;
      top: 80px;
      animation: paneSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      width: 100%;
    }

    @keyframes paneSlideIn {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .plus-glow {
      position: absolute;
      top: -10%;
      left: 10%;
      width: 80%;
      height: 30%;
      background: radial-gradient(ellipse at top, rgba(37,99,235,0.12) 0%, transparent 60%);
      pointer-events: none;
    }

    .card-plan-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.25rem;
    }

    .card-plan-desc {
      font-size: 0.8125rem;
      color: #94a3b8;
      margin-bottom: 1.5rem;
    }

    .card-price-row {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .card-price {
      font-size: 3rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1;
      letter-spacing: -0.03em;
    }

    .card-price-meta {
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      color: #94a3b8;
      line-height: 1.3;
    }

    .card-features-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .features-list-title {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #e2e8f0;
      margin-bottom: 0.25rem;
    }

    .card-features-list ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
    }

    .card-features-list li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: #cbd5e1;
      line-height: 1.4;
    }

    .card-features-list li i {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .startups-credit-bar {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: var(--radius-lg);
      padding: 1.25rem 2.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
    }

    @media (min-width: 768px) {
      .startups-credit-bar {
        flex-direction: row;
        gap: 2rem;
      }
    }

    .startup-link {
      color: #60a5fa;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      white-space: nowrap;
    }

    /* Compare Matrix */
    .features-matrix-section {
      padding: 4rem 2rem;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    .matrix-title {
      font-size: 2rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 3rem;
    }

    .matrix-table-container {
      width: 100%;
      overflow-x: auto;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: var(--radius-lg);
      background: #090d16;
    }

    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }

    .matrix-table th, .matrix-table td {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .matrix-table th {
      font-weight: 700;
      color: #ffffff;
      background-color: rgba(255,255,255,0.01);
    }

    .matrix-table tr.matrix-subheader td {
      background-color: rgba(255, 255, 255, 0.02);
      font-weight: 700;
      color: #60a5fa;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .matrix-table td:not(:first-child) {
      color: #cbd5e1;
    }

    /* FAQ System */
    .faq-section {
      padding: 6rem 2rem;
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
    }

    .faq-main-title {
      font-size: 2rem;
      font-weight: 800;
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .faq-trigger {
      width: 100%;
      padding: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #ffffff;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      text-align: left;
      background: transparent;
      border: none;
    }

    .faq-trigger:hover {
      background: rgba(255,255,255,0.02);
    }

    .faq-trigger i {
      color: #94a3b8;
      transition: transform 0.2s;
    }

    .faq-item.active .faq-trigger i {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
      padding: 0 1.25rem;
      color: #94a3b8;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .faq-item.active .faq-answer {
      max-height: 200px;
      padding-bottom: 1.25rem;
    }

    /* 8. Stripe Overlay */
    .stripe-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .stripe-overlay.hidden {
      opacity: 0;
      pointer-events: none;
      display: none !important;
    }

    .stripe-window {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      max-width: 820px;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .stripe-window-header {
      padding: 1.25rem 2rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #0f172a;
    }

    .stripe-header-left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #635bff; /* Stripe color */
    }

    .stripe-window-close {
      color: #94a3b8;
      cursor: pointer;
    }

    .stripe-window-close:hover {
      color: #0f172a;
    }

    .stripe-window-body {
      display: grid;
      grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
      .stripe-window-body {
        grid-template-columns: 1.1fr 1fr;
      }
    }

    .stripe-summary-pane {
      background-color: #f8fafc;
      padding: 2.5rem;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
    }

    .stripe-summary-subtitle {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .stripe-summary-price {
      font-size: 3rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.03em;
    }

    .stripe-summary-period {
      font-size: 0.8125rem;
      color: #64748b;
      margin-top: 0.25rem;
    }

    .summary-line-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8125rem;
      color: #64748b;
    }

    .stripe-form-pane {
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
    }

    .stripe-form-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .stripe-form-group label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #475569;
    }

    .stripe-input {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: #0f172a;
      outline: none;
    }

    .stripe-input:focus {
      border-color: #635bff;
      box-shadow: 0 0 0 1px #635bff;
    }

    .card-input-wrapper {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      display: flex;
      align-items: center;
      background: #ffffff;
      padding: 0 0.5rem;
    }

    .card-input-wrapper:focus-within {
      border-color: #635bff;
      box-shadow: 0 0 0 1px #635bff;
    }

    .stripe-pay-btn {
      background: #635bff;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 0.75rem;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      margin-top: 1rem;
      text-align: center;
      transition: background-color 0.15s;
    }

    .stripe-pay-btn:hover {
      background: #4f46e5;
    }

    .stripe-window-footer {
      padding: 1rem 2.5rem;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 0.75rem;
      color: #94a3b8;
      text-align: center;
    }
  `;
  document.head.appendChild(styleEl);

  // Trigger Auth Quickstart items inside Nav
  const tryBtn = document.getElementById('tryAetherFlowBtn');
  const demoBtn = document.getElementById('getDemoBtn');
  if (tryBtn) tryBtn.addEventListener('click', () => window.location.hash = '#/landing');
  if (demoBtn) demoBtn.addEventListener('click', () => window.location.hash = '#/landing');

  // FAQ Accordion click toggles
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.faq-item');
      const wasActive = parent.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(it => it.classList.remove('active'));
      
      // Open selected
      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });

  // Sliding Hover Outline Logic
  const hoverFrame = document.getElementById('pricingHoverFrame');
  const cardsGrid = document.getElementById('pricingCardsGrid');
  const pricingCards = document.querySelectorAll('.pricing-card');
  let activeHoveredCard = null;

  function updateHoverFrame(card) {
    if (!card || !hoverFrame || !cardsGrid) return;
    const gridRect = cardsGrid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const left = cardRect.left - gridRect.left;
    const top = cardRect.top - gridRect.top;

    hoverFrame.style.left = `${left}px`;
    hoverFrame.style.top = `${top}px`;
    hoverFrame.style.width = `${cardRect.width}px`;
    hoverFrame.style.height = `${cardRect.height}px`;
    hoverFrame.style.opacity = '1';
  }

  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      activeHoveredCard = card;
      updateHoverFrame(card);
    });
  });

  if (cardsGrid) {
    cardsGrid.addEventListener('mouseleave', () => {
      activeHoveredCard = null;
      if (hoverFrame) hoverFrame.style.opacity = '0';
    });
  }

  const resizeObserver = new ResizeObserver(() => {
    if (activeHoveredCard) {
      updateHoverFrame(activeHoveredCard);
    }
  });

  pricingCards.forEach(card => {
    resizeObserver.observe(card);
  });

  // Stripe Inline Checkout Logic
  const stripeInlinePane = document.getElementById('stripeInlinePane');
  const pricingSplitLayout = document.getElementById('pricingSplitLayout');
  const closeStripeInlineBtn = document.getElementById('closeStripeInlineBtn');
  const stripeInlinePaymentForm = document.getElementById('stripeInlinePaymentForm');

  const stripeInlinePlanLabel = document.getElementById('stripeInlinePlanLabel');
  const stripeInlinePriceLabel = document.getElementById('stripeInlinePriceLabel');
  const stripeInlineBasePrice = document.getElementById('stripeInlineBasePrice');

  // Trigger inline checkout on card clicks
  pricingCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const planName = card.getAttribute('data-card-plan');
      if (planName === 'Enterprise') return; // Enterprise handles contact sales separately

      // Select card
      pricingCards.forEach(c => c.classList.remove('card-selected'));
      card.classList.add('card-selected');

      const price = planName === 'Developer' ? '0' : '39';

      if (stripeInlinePlanLabel) stripeInlinePlanLabel.innerText = `${planName} Workspace Plan`;
      if (stripeInlinePriceLabel) stripeInlinePriceLabel.innerText = `$${price}.00`;
      if (stripeInlineBasePrice) stripeInlineBasePrice.innerText = `$${price}.00`;

      if (stripeInlinePane) stripeInlinePane.classList.remove('hidden');
      if (pricingSplitLayout) pricingSplitLayout.classList.add('split-active');

      // Update hover frame size/position since card layout changed
      activeHoveredCard = card;
      updateHoverFrame(card);
    });
  });

  // Buttons clicks on cards
  document.querySelectorAll('.checkout-trigger-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling to card
      const card = btn.closest('.pricing-card');
      const planName = btn.getAttribute('data-plan');
      const price = btn.getAttribute('data-price');

      pricingCards.forEach(c => c.classList.remove('card-selected'));
      if (card) card.classList.add('card-selected');

      if (stripeInlinePlanLabel) stripeInlinePlanLabel.innerText = `${planName} Workspace Plan`;
      if (stripeInlinePriceLabel) stripeInlinePriceLabel.innerText = `$${price}.00`;
      if (stripeInlineBasePrice) stripeInlineBasePrice.innerText = `$${price}.00`;

      if (stripeInlinePane) stripeInlinePane.classList.remove('hidden');
      if (pricingSplitLayout) pricingSplitLayout.classList.add('split-active');

      activeHoveredCard = card;
      if (card) updateHoverFrame(card);
    });
  });

  if (closeStripeInlineBtn) {
    closeStripeInlineBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (stripeInlinePane) stripeInlinePane.classList.add('hidden');
      if (pricingSplitLayout) pricingSplitLayout.classList.remove('split-active');
      pricingCards.forEach(c => c.classList.remove('card-selected'));
    });
  }

  if (stripeInlinePaymentForm) {
    stripeInlinePaymentForm.addEventListener('submit', () => {
      if (stripeInlinePane) stripeInlinePane.classList.add('hidden');
      if (pricingSplitLayout) pricingSplitLayout.classList.remove('split-active');
      pricingCards.forEach(c => c.classList.remove('card-selected'));
      alert('Payment processed successfully by Stripe! Workspace has been upgraded.');
      window.location.hash = '#/home';
    });
  }

  // Cleanup handler when leaving pricing page
  window.addEventListener('hashchange', function cleanup() {
    if (sidebar) sidebar.style.display = 'flex';
    if (header) header.style.display = 'flex';
    pageContainer.removeAttribute('style');
    styleEl.remove();
    resizeObserver.disconnect();
    window.removeEventListener('hashchange', cleanup);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
