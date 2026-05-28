import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderMonitoringPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'Personal', link: '#/home' },
      { text: 'Monitoring', link: '#/monitoring' }
    ],
    showWorkspaceBadge: false,
    showStatsBar: false,
    actions: [
      { id: 'addDashboardBtn', label: 'Dashboard', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');
  
  // Custom filter and layout structures
  pageContainer.innerHTML = `
    <div style="margin: -1.5rem -2rem 0 -2rem;">
      <!-- Monitoring tabs -->
      <div class="tab-container">
        <div class="tab-item active">Monitoring</div>
        <div class="tab-item" style="opacity: 0.6; cursor: not-allowed;">Dashboards</div>
        <div class="tab-item" style="opacity: 0.6; cursor: not-allowed;">Alerts</div>
      </div>

      <!-- Filters Bar -->
      <div class="monitoring-filters">
        <div class="filter-group">
          <div style="display: inline-flex; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; background: #ffffff;">
            <button class="btn btn-xs active-metric" id="metricTracesBtn" style="padding: 0.375rem 0.75rem; font-weight: 600; background: var(--color-brand-light); color: var(--color-brand);">Traces</button>
            <button class="btn btn-xs" style="padding: 0.375rem 0.75rem; font-weight: 600; color: var(--color-text-secondary); opacity: 0.7;">LLM Calls</button>
            <button class="btn btn-xs" style="padding: 0.375rem 0.75rem; font-weight: 600; color: var(--color-text-secondary); opacity: 0.7;">Cost & Tokens</button>
          </div>
        </div>

        <div class="filter-group">
          <select class="select-filter" id="timeRangeSelect">
            <option value="7">Last 7 Days</option>
            <option value="24h">Last 24 Hours</option>
            <option value="30">Last 30 Days</option>
          </select>

          <select class="select-filter">
            <option value="none">Group by: None</option>
            <option value="model">Group by: Model</option>
            <option value="project">Group by: Project</option>
          </select>
        </div>
      </div>

      <!-- Charts View Grid -->
      <div class="monitoring-grid" id="monitoringGrid">
        <!-- Main trace count chart -->
        <div class="monitoring-chart-card">
          <div class="chart-card-header">
            <div class="chart-card-title-group">
              <span class="chart-card-title">Traces</span>
              <span class="chart-card-subtitle">Total number of traces over time</span>
            </div>
            <div class="chart-card-legend">
              <div class="legend-item">
                <span class="legend-color-dot legend-color-success"></span>
                <span>Success</span>
              </div>
              <div class="legend-item">
                <span class="legend-color-dot legend-color-error"></span>
                <span>Error</span>
              </div>
            </div>
          </div>
          <div class="chart-canvas-container">
            <canvas id="traceCountChart"></canvas>
          </div>
        </div>

        <!-- Latency and error rate columns -->
        <div class="small-charts-column">
          <!-- Latency chart -->
          <div class="monitoring-chart-card">
            <div class="chart-card-header">
              <div class="chart-card-title-group">
                <span class="chart-card-title">Trace Latency</span>
                <span class="chart-card-subtitle">Trace latency percentiles over time (ms)</span>
              </div>
            </div>
            <div class="chart-canvas-container" style="height: 120px;">
              <canvas id="traceLatencyChart"></canvas>
            </div>
          </div>

          <!-- Error rate chart -->
          <div class="monitoring-chart-card">
            <div class="chart-card-header">
              <div class="chart-card-title-group">
                <span class="chart-card-title">Trace Error Rate</span>
                <span class="chart-card-subtitle">Percent of traces that errored over time</span>
              </div>
            </div>
            <div class="chart-canvas-container" style="height: 120px;">
              <canvas id="traceErrorChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize and load the chart instances
  let countChart = null;
  let latencyChart = null;
  let errorChart = null;

  function loadCharts(days) {
    // Destroy previous instances if any
    if (countChart) countChart.destroy();
    if (latencyChart) latencyChart.destroy();
    if (errorChart) errorChart.destroy();

    const data = MockDatabase.generateTimeSeriesMetrics(days);

    // 1. Trace Count Chart
    const ctxCount = document.getElementById('traceCountChart').getContext('2d');
    countChart = new Chart(ctxCount, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Success',
            data: data.successData,
            backgroundColor: '#10b981',
            borderRadius: 4,
          },
          {
            label: 'Error',
            data: data.errorData,
            backgroundColor: '#ef4444',
            borderRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, border: { dash: [4, 4] } }
        }
      }
    });

    // 2. Trace Latency Chart
    const ctxLatency = document.getElementById('traceLatencyChart').getContext('2d');
    latencyChart = new Chart(ctxLatency, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'p95',
            data: data.latencyP95,
            borderColor: '#3b82f6',
            backgroundColor: 'transparent',
            tension: 0.3,
            borderWidth: 2,
          },
          {
            label: 'p50',
            data: data.latencyP50,
            borderColor: '#93c5fd',
            backgroundColor: 'transparent',
            tension: 0.3,
            borderWidth: 1.5,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { border: { dash: [4, 4] } }
        }
      }
    });

    // 3. Trace Error Rate Chart
    const ctxError = document.getElementById('traceErrorChart').getContext('2d');
    errorChart = new Chart(ctxError, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Error Rate %',
          data: data.errorRates,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
          tension: 0.3,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { 
            border: { dash: [4, 4] },
            ticks: { callback: (val) => val + '%' }
          }
        }
      }
    });
  }

  // Handle changing time ranges
  const timeRangeSelect = document.getElementById('timeRangeSelect');
  timeRangeSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    const grid = document.getElementById('monitoringGrid');

    if (val === '24h') {
      // Empty state fallback demo
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; display: flex; align-items: center; justify-content: center; padding: 6rem 0;">
          <div class="empty-state" style="border: none; background: transparent;">
            <div class="empty-state-icon">
              <i data-lucide="search"></i>
            </div>
            <h4 class="empty-state-title">No data available</h4>
            <p class="empty-state-desc">No trace execution records found for the selected 24-hour period. Set up tracing pipelines or check projects.</p>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    } else {
      // Restore layout and reload charts
      renderMonitoringPage();
    }
  });

  loadCharts(7);

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
