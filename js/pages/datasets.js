import { renderHeader } from '../components/header.js';
import { MockDatabase } from '../mock-data.js';

export function renderDatasetsPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'My First App', link: '#/home' },
      { text: 'Datasets & Experiments', link: '#/datasets' }
    ],
    showWorkspaceBadge: true,
    showStatsBar: false,
    actions: [
      { id: 'newDatasetBtn', label: 'New Dataset', primary: true, icon: 'plus' }
    ]
  });

  const pageContainer = document.getElementById('pageContent');

  function renderPage() {
    let datasetsTableHtml = '';
    if (MockDatabase.datasets.length > 0) {
      datasetsTableHtml = `
        <div class="section-panel" style="margin-top: 1.5rem;">
          <h4 style="font-size: 0.9rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.75rem;">Your Datasets</h4>
          <div style="overflow-x: auto; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem; text-align: left;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 1px solid var(--color-border);">
                  <th style="padding: 0.75rem 1.0rem; font-weight: 600; color: var(--color-text-secondary);">Name</th>
                  <th style="padding: 0.75rem 1.0rem; font-weight: 600; color: var(--color-text-secondary);">Examples</th>
                  <th style="padding: 0.75rem 1.0rem; font-weight: 600; color: var(--color-text-secondary);">Experiments</th>
                  <th style="padding: 0.75rem 1.0rem; font-weight: 600; color: var(--color-text-secondary);">Created</th>
                  <th style="padding: 0.75rem 1.0rem; width: 50px;"></th>
                </tr>
              </thead>
              <tbody>
                ${MockDatabase.datasets.map(ds => `
                  <tr style="border-bottom: 1px solid var(--color-border); cursor: pointer;" onclick="window.location.hash='#/datasets/detail?name=${encodeURIComponent(ds.name)}'">
                    <td style="padding: 0.75rem 1.0rem; font-weight: 600; color: var(--color-brand);">${ds.name}</td>
                    <td style="padding: 0.75rem 1.0rem; color: var(--color-text-primary);">${ds.examples}</td>
                    <td style="padding: 0.75rem 1.0rem; color: var(--color-text-primary);">${ds.experiments}</td>
                    <td style="padding: 0.75rem 1.0rem; color: var(--color-text-muted);">${ds.created}</td>
                    <td style="padding: 0.75rem 1.0rem; text-align: right;"><i data-lucide="chevron-right" style="width: 14px; height: 14px; color: var(--color-text-muted);"></i></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    pageContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem;">
        <!-- Page Title -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.375rem;">Datasets & Experiments</h2>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary);">Upload, curate, and review datasets to evaluate models and track prompt behavior.</p>
          </div>
          <button class="btn btn-primary btn-sm" id="topNewDatasetBtn">
            <i data-lucide="plus" style="width: 14px; height: 14px;"></i>
            <span>New dataset</span>
          </button>
        </div>

        <!-- Get Started Container -->
        <div style="border-top: 1px solid var(--color-border); padding-top: 1.5rem;">
          <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 1.25rem;">Get started with Datasets & Experiments</h3>
          
          <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;" class="datasets-split-grid">
            <!-- Left Panel: Create a dataset -->
            <div class="section-panel" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem;">
              <div>
                <h4 style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;">
                  <i data-lucide="plus-circle" style="width: 16px; height: 16px; color: var(--color-brand);"></i>
                  <span>Create a dataset</span>
                </h4>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin-bottom: 1.25rem;">
                  Datasets are made up of examples which store inputs, outputs, and reference outputs.
                </p>
                
                <div class="form-group" style="gap: 0.5rem;">
                  <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Dataset name</label>
                  <input type="text" class="form-input" id="newDatasetNameInput" value="My First Dataset" style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 0.8125rem;">
                </div>
              </div>

              <button class="btn btn-primary btn-sm" id="createDatasetActionBtn" style="width: 100%; font-weight: 600; margin-top: 1rem;">
                Create dataset
              </button>
            </div>

            <!-- Right Panel: Run an experiment -->
            <div class="section-panel" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem;">
              <div>
                <h4 style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;">
                  <i data-lucide="line-chart" style="width: 16px; height: 16px; color: var(--color-success);"></i>
                  <span>Run an experiment</span>
                </h4>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin-bottom: 0.75rem;">
                  Run evaluations on curated datasets to compare versions, benchmark performance, and catch regressions.
                </p>

                <!-- Feedback scores visualizer chart -->
                <div style="background-color: #f8fafc; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.75rem; height: 180px; position: relative;">
                  <span style="font-size: 0.6875rem; font-weight: 700; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">Feedback Scores</span>
                  <canvas id="feedbackScoresChart" style="max-height: 150px; width: 100%;"></canvas>
                </div>
              </div>

              <button class="btn btn-secondary btn-sm" id="newExperimentBtn" style="width: 100%; font-weight: 600; border-color: var(--color-border);">
                New experiment
              </button>
            </div>
          </div>
        </div>

        <!-- Render List Table if there are datasets -->
        ${datasetsTableHtml}
      </div>

      <style>
        @media (min-width: 768px) {
          .datasets-split-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      </style>
    `;

    // Render horizontal Chart.js bar chart
    setTimeout(() => {
      const ctx = document.getElementById('feedbackScoresChart');
      if (ctx && window.Chart) {
        new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Eval 5', 'Eval 4', 'Eval 3', 'Eval 2', 'Eval 1'],
            datasets: [
              {
                label: 'accuracy',
                data: [0.9, 0.75, 0.85, 0.6, 0.8],
                backgroundColor: '#3b82f6',
                borderRadius: 3,
                barThickness: 6
              },
              {
                label: 'conciseness',
                data: [0.8, 0.9, 0.6, 0.75, 0.7],
                backgroundColor: '#10b981',
                borderRadius: 3,
                barThickness: 6
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                min: 0,
                max: 1.0,
                ticks: {
                  stepSize: 0.2,
                  font: { size: 8 }
                },
                grid: { color: 'rgba(0,0,0,0.04)' }
              },
              y: {
                ticks: {
                  font: { size: 8 }
                },
                grid: { display: false }
              }
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 8,
                  font: { size: 9 },
                  padding: 4
                }
              }
            }
          }
        });
      }
    }, 100);

    // Bind create actions
    const nameInput = document.getElementById('newDatasetNameInput');
    const submitBtn = document.getElementById('createDatasetActionBtn');
    const newBtn = document.getElementById('newDatasetBtn') || document.getElementById('topNewDatasetBtn');

    const handleCreate = (nameStr) => {
      if (nameStr) {
        MockDatabase.datasets.push({
          id: `ds-${Date.now()}`,
          name: nameStr,
          examples: 12,
          experiments: 3,
          created: new Date().toISOString().split('T')[0]
        });
        MockDatabase.save();
        renderPage();
      }
    };

    if (submitBtn && nameInput) {
      submitBtn.addEventListener('click', () => {
        handleCreate(nameInput.value);
      });
    }

    if (newBtn) {
      newBtn.addEventListener('click', () => {
        const name = prompt('Enter a new dataset name:');
        handleCreate(name);
      });
    }

    const runExpBtn = document.getElementById('newExperimentBtn');
    if (runExpBtn) {
      runExpBtn.addEventListener('click', () => {
        alert('Launching new evaluation experiment wizard... Select your datasets to compare models.');
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderPage();
}
