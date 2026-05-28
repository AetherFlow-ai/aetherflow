import { renderHeader } from '../components/header.js';

// Load active evaluators from localStorage, fallback to defaults
const activeEvaluators = JSON.parse(localStorage.getItem('aetherflow_evaluators')) || [
  {
    id: 'eval-1',
    name: 'Correctness Evaluator',
    desc: 'Grades whether the agent reply is factually correct compared to the context.',
    type: 'LLM-as-a-judge',
    typeClass: 'badge-success',
    version: 'v2.1',
    meta: 'Model: gpt-4o'
  },
  {
    id: 'eval-2',
    name: 'JSON Format Grader',
    desc: 'Verifies that outputs conform to a strict parsable JSON outline.',
    type: 'Regex Matches',
    typeClass: 'badge-blue',
    version: 'v1.0',
    meta: 'Deterministic function'
  },
  {
    id: 'eval-3',
    name: 'Security Guard',
    desc: 'Whether inputs contain prompt injection attempts.',
    type: 'Prompt Injection Evaluator',
    typeClass: 'badge-gray',
    version: 'v1.0',
    meta: 'LLM Prompt Check (Default)'
  }
];

function saveEvaluators() {
  localStorage.setItem('aetherflow_evaluators', JSON.stringify(activeEvaluators));
}

// Scraped/compiled documentation database for search results
const evaluatorDocs = {
  'Correctness Evaluator': {
    title: 'Correctness Evaluation Guide (smith.aetherflow.com/docs)',
    summary: 'Evaluate if the LLM output is semantically correct relative to reference output context.',
    details: 'Correctness is typically assessed using LLM-as-a-judge models (e.g. GPT-4o) or embedding similarities. It uses a grading rubric explaining what qualifies as a match, partial match, or mismatch.',
    code: `from aetherflow.evaluation import evaluate\n\n# Configure correctness evaluator\ndef correctness_grader(run, example):\n    prediction = run.outputs.get("output")\n    reference = example.outputs.get("reference")\n    # Grades whether prediction matches reference semantic outlines\n    score = 1 if (prediction.lower() in reference.lower()) else 0\n    return {"key": "correctness", "score": score}`
  },
  'JSON Format Grader': {
    title: 'JSON Schema Validation Guide (smith.aetherflow.com/docs)',
    summary: 'Ensure LLM output is a valid JSON string that fits a predefined schema.',
    details: 'Deterministic regex matchers or JavaScript JSON.parse checks are preferred for speed. Strict mode can enforce schemas via JSON Schema schema-graders.',
    code: `import json\n\ndef json_format_check(run, example):\n    output_str = run.outputs.get("output")\n    try:\n        parsed = json.loads(output_str)\n        # Verify strict schema keys if applicable\n        return {"key": "json_format", "score": 1}\n    except Exception:\n        return {"key": "json_format", "score": 0}`
  },
  'Security Guard': {
    title: 'Adversarial Prompt Injection Evaluator (smith.aetherflow.com/docs)',
    summary: 'Check if input fields contain adversarial jailbreak attempts or instruction overrides.',
    details: 'Prompt injection checks run the user prompt through a secondary LLM with specialized security system alerts. Results return a boolean score.',
    code: `# Configure prompt injection monitor\nfrom aetherflow import Client\n\n# Set injection threshold check\ndef monitor_injection(run, example):\n    user_input = run.inputs.get("input")\n    contains_injection = detect_jailbreaks(user_input) # Runs classification model\n    return {"key": "prompt_injection", "score": 0 if contains_injection else 1}`
  },
  'PII Leakage': {
    title: 'PII Leakage Detection Rubrics & SDK (smith.aetherflow.com/docs)',
    summary: 'Detect leakage of sensitive user identifiers like names, emails, card numbers, and government IDs.',
    details: 'Leverages strict system prompt guidelines explaining what constitutes personal data, and evaluates output statements using Boolean flags.',
    code: `# Create a custom PII leakage regex validator\ndef check_pii(run, example):\n    text = run.outputs.get("output", "")\n    # Check email and card pattern matches\n    has_pii = detect_email_patterns(text) or detect_card_patterns(text)\n    return {"key": "pii_leakage", "score": 0 if has_pii else 1}`
  },
  'Prompt Injection': {
    title: 'Prompt Injection Defense Guidelines (smith.aetherflow.com/docs)',
    summary: 'Verify if input prompts contain adversarial queries attempting instruction override.',
    details: 'Compares inputs against known injection catalogs and system rules to safeguard agent execution.',
    code: `def prompt_injection_eval(run, example):\n    text = run.inputs.get("input", "")\n    is_safe = analyze_adversarial_patterns(text)\n    return {"key": "prompt_injection", "score": 1 if is_safe else 0}`
  },
  'Toxicity': {
    title: 'Toxicity and Safety Moderation Guide (smith.aetherflow.com/docs)',
    summary: 'Identify offensive, abusive, or inappropriate text inside model outputs.',
    details: 'Safety evaluators deploy OpenAI moderation API endpoints or HuggingFace classification models to score toxicity levels.',
    code: `def toxicity_grader(run, example):\n    text = run.outputs.get("output", "")\n    toxicity_score = get_toxicity_score(text) # Returns 0.0 to 1.0\n    return {"key": "toxicity", "score": 1 - toxicity_score}`
  },
  'Bias & Fairness': {
    title: 'Fairness and Stereotyping Evaluators (smith.aetherflow.com/docs)',
    summary: 'Grades whether outputs contain gender, racial, or demographic biases.',
    details: 'Evaluator prompt instructions compare LLM completions to fairness benchmarks, penalizing statements containing discriminatory statements.',
    code: `def bias_evaluator(run, example):\n    # Compares completion output against fairness metrics\n    score = score_demographic_parity(run.outputs["output"])\n    return {"key": "bias_and_fairness", "score": score}`
  },
  'Hallucination': {
    title: 'Factual Grounding & Hallucination Grader (smith.aetherflow.com/docs)',
    summary: 'Verify if output answers hallucinate information not present in the retrieved context.',
    details: 'Calculates the factual grounding score. Highly recommended for Retrieval Augmented Generation (RAG) agent evaluation loops.',
    code: `def RAG_grounding_eval(run, example):\n    context = run.inputs.get("context", "")\n    answer = run.outputs.get("output", "")\n    # Evaluates if answer matches retrieved facts\n    is_grounded = assess_hallucination(answer, context)\n    return {"key": "hallucination", "score": 0 if is_grounded else 1}`
  },
  'Correctness': {
    title: 'Semantic Correctness Grading (smith.aetherflow.com/docs)',
    summary: 'Calculate how closely the generated output semantically matches reference labels.',
    details: 'Combines LLM judge reviews and cosine embedding scores to grade answers.',
    code: `def semantic_correctness(run, example):\n    ref = example.outputs.get("reference")\n    pred = run.outputs.get("output")\n    return {"key": "correctness", "score": get_cosine_similarity(pred, ref)}`
  },
  'Perceived Error': {
    title: 'Thread Perceived Error Classifiers (smith.aetherflow.com/docs)',
    summary: 'Analyze conversational threads to detect if the user expressed dissatisfaction indicating an error.',
    details: 'Useful for offline customer support telemetry loops to identify hidden failures in agent tools.',
    code: `def perceived_error_classifier(run, example):\n    thread_logs = run.outputs.get("thread_history", [])\n    has_error_complaints = check_user_negatives(thread_logs)\n    return {"key": "perceived_error", "score": 1 if has_error_complaints else 0}`
  },
  'User Satisfaction': {
    title: 'Conversational User Satisfaction Index (smith.aetherflow.com/docs)',
    summary: 'Grade overall conversational satisfaction based on final user replies in a support thread.',
    details: 'Scores sentiment on a continuous scale or classifies user feedback into satisfied/neutral/dissatisfied categories.',
    code: `def satisfaction_index(run, example):\n    replies = run.outputs.get("user_replies", [])\n    sentiment = get_sentiment_score(replies[-1]) # Scores final reply\n    return {"key": "user_satisfaction", "score": sentiment}`
  }
};

export function renderEvaluatorsPage() {
  renderHeader({
    breadcrumbs: [
      { text: 'My First App', link: '#/home' },
      { text: 'Evaluators', link: '#/evaluators' }
    ],
    showWorkspaceBadge: true,
    showStatsBar: false
  });

  const pageContainer = document.getElementById('pageContent');

  // Modal selection and status variables
  let selectedEval = null;
  let isTemplate = false;
  let isSearching = false;
  let searchResults = null;

  function renderList() {
    let activeListHtml = activeEvaluators.map(evaluator => `
      <div class="section-panel active-evaluator-card" data-id="${evaluator.id}" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem; cursor: pointer; transition: all 0.15s;">
        <div style="display: flex; align-items: start; justify-content: space-between;">
          <span class="badge ${evaluator.typeClass}">${evaluator.type}</span>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 500;">${evaluator.version}</span>
        </div>
        <div style="text-align: left;">
          <h4 style="font-size: 0.9rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">${evaluator.name}</h4>
          <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">${evaluator.desc}</p>
        </div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); font-family: var(--font-mono); border-top: 1px solid var(--color-border); padding-top: 0.5rem; margin-top: 0.25rem; text-align: left; display: flex; align-items: center; justify-content: space-between;">
          <span>${evaluator.meta}</span>
          <i data-lucide="arrow-right" style="width: 12px; height: 12px;"></i>
        </div>
      </div>
    `).join('');

    pageContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem;">
        <!-- Page Title & Overview -->
        <div style="text-align: left;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.375rem;">Evaluators</h2>
          <p style="font-size: 0.875rem; color: var(--color-text-secondary); margin: 0;">Define parameters, LLM prompt guidelines, or code functions to automatically grade LLM outputs.</p>
        </div>

        <!-- 1. Active Evaluators -->
        <div>
          <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; text-align: left;">
            <i data-lucide="shield-check" style="width: 18px; height: 18px; color: var(--color-success);"></i>
            <span>Active Evaluators (${activeEvaluators.length})</span>
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
            ${activeListHtml}
          </div>
        </div>

        <!-- 2. Get started with Evaluators -->
        <div style="border-top: 1px solid var(--color-border); padding-top: 2rem; text-align: left;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div>
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.25rem;">Get started with Evaluators</h3>
              <p style="font-size: 0.75rem; color: var(--color-text-muted); margin: 0;">Choose a curated template or create a custom model grading flow from scratch.</p>
            </div>
          </div>

          <div style="margin-bottom: 2rem;">
            <h4 style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Start from a template</h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem;">
              <!-- Template: PII Leakage -->
              <div class="template-card" data-template-name="PII Leakage" data-desc="Whether outputs contain PII or privacy violations." data-type="PII Check" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #fee2e2; color: #ef4444; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="eye-off" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">PII Leakage</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether outputs contain PII or privacy violations.</p>
              </div>

              <!-- Template: Prompt Injection -->
              <div class="template-card" data-template-name="Prompt Injection" data-desc="Whether inputs contain prompt injection attempts." data-type="Security Guard" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #ffedd5; color: #f97316; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="shield-alert" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">Prompt Injection</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether inputs contain prompt injection attempts.</p>
              </div>

              <!-- Template: Toxicity -->
              <div class="template-card" data-template-name="Toxicity" data-desc="Whether outputs contain toxic elements." data-type="Safety Guard" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="alert-triangle" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">Toxicity</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether outputs contain toxic elements.</p>
              </div>

              <!-- Template: Bias & Fairness -->
              <div class="template-card" data-template-name="Bias & Fairness" data-desc="Whether outputs contain biased or unfair content." data-type="Safety Guard" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="scale" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">Bias & Fairness</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether outputs contain biased or unfair content.</p>
              </div>

              <!-- Template: Hallucination -->
              <div class="template-card" data-template-name="Hallucination" data-desc="Whether an answer hallucinates facts." data-type="Fact Check" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #fae8ff; color: #c084fc; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="compass" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">Hallucination</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether an answer hallucinates facts.</p>
              </div>

              <!-- Template: Correctness -->
              <div class="template-card" data-template-name="Correctness" data-desc="Whether an answer semantically matches a reference." data-type="Accuracy Check" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #d1fae5; color: #10b981; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">Correctness</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether an answer semantically matches a reference.</p>
              </div>

              <!-- Template: Perceived Error -->
              <div class="template-card" data-template-name="Perceived Error" data-desc="Whether the user perceived the agent as making an error." data-type="User Sentiment" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="help-circle" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">Perceived Error</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether the user perceived the agent as making an error.</p>
              </div>

              <!-- Template: User Satisfaction -->
              <div class="template-card" data-template-name="User Satisfaction" data-desc="Whether the user appears satisfied with the conversation." data-type="User Sentiment" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 28px; height: 28px; border-radius: 6px; background: #e2e8f0; color: #475569; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="smile" style="width: 14px; height: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 0.875rem; color: var(--color-text-primary);">User Satisfaction</span>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.4; margin: 0;">Whether the user appears satisfied with the conversation.</p>
              </div>
            </div>
            
            <div style="margin-top: 1rem; text-align: right;">
              <span style="font-size: 0.8125rem; color: var(--color-brand); font-weight: 600; cursor: pointer;" onclick="alert('Displaying all 25+ templates in Prompt Hub registry...')">Show all templates</span>
            </div>
          </div>

          <!-- Create from Scratch Option -->
          <div style="border-top: 1px dashed var(--color-border); padding-top: 1.5rem;">
            <h4 style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Create from scratch</h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
              <!-- LLM-as-a-Judge -->
              <div class="scratch-card" data-mode="judge" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 42px; height: 42px; border-radius: 8px; background: var(--color-brand-light); color: var(--color-brand); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="cpu" style="width: 20px; height: 20px;"></i>
                </div>
                <div>
                  <h5 style="font-weight: 700; font-size: 0.875rem; color: var(--color-text-primary); margin-bottom: 0.125rem;">LLM-as-a-Judge Evaluator</h5>
                  <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0;">Write a prompt from scratch to evaluate your data</p>
                </div>
                <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--color-text-muted); margin-left: auto;"></i>
              </div>

              <!-- Code Evaluator -->
              <div class="scratch-card" data-mode="code" style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 42px; height: 42px; border-radius: 8px; background: var(--color-success-bg); color: var(--color-success); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="code-2" style="width: 20px; height: 20px;"></i>
                </div>
                <div>
                  <h5 style="font-weight: 700; font-size: 0.875rem; color: var(--color-text-primary); margin-bottom: 0.125rem;">Code Evaluator</h5>
                  <p style="font-size: 0.75rem; color: var(--color-text-secondary); margin: 0;">Write a custom Python or JavaScript evaluation function</p>
                </div>
                <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--color-text-muted); margin-left: auto;"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Modal Overlay -->
      <div id="evalDetailModalContainer"></div>

      <style>
        .template-card:hover {
          border-color: var(--color-brand) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .scratch-card:hover {
          border-color: var(--color-brand) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .active-evaluator-card:hover {
          border-color: var(--color-brand) !important;
          box-shadow: var(--shadow-md);
        }
      </style>
    `;

    bindListEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function bindListEvents() {
    // Click active evaluator card
    document.querySelectorAll('.active-evaluator-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const evaluator = activeEvaluators.find(e => e.id === id);
        if (evaluator) {
          selectedEval = evaluator;
          isTemplate = false;
          searchResults = null;
          isSearching = false;
          renderModal();
        }
      });
    });

    // Click template card
    document.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-template-name');
        const desc = card.getAttribute('data-desc');
        const type = card.getAttribute('data-type');
        
        selectedEval = { name, desc, type, id: null };
        isTemplate = true;
        searchResults = null;
        isSearching = false;
        renderModal();
      });
    });

    // Click scratch cards
    document.querySelectorAll('.scratch-card').forEach(card => {
      card.addEventListener('click', () => {
        const mode = card.getAttribute('data-mode');
        if (mode === 'judge') {
          selectedEval = {
            name: 'LLM-as-a-Judge Evaluator',
            desc: 'Write a prompt from scratch to evaluate model performance.',
            type: 'LLM-as-a-judge',
            id: null
          };
        } else {
          selectedEval = {
            name: 'Code Evaluator',
            desc: 'Write a custom JavaScript function to grade outputs.',
            type: 'Code Script',
            id: null
          };
        }
        isTemplate = true;
        searchResults = null;
        isSearching = false;
        renderModal();
      });
    });
  }

  function renderModal() {
    const container = document.getElementById('evalDetailModalContainer');
    if (!container || !selectedEval) return;

    let docSearchContentHtml = '';
    if (isSearching) {
      docSearchContentHtml = `
        <div class="doc-search-panel" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1.5rem 0;">
          <span class="spin-loader"></span>
          <span style="font-size: 0.8125rem; color: var(--color-text-secondary);">Accessing AetherFlow docs online...</span>
        </div>
      `;
    } else if (searchResults) {
      docSearchContentHtml = `
        <div class="doc-search-panel" style="text-align: left;">
          <h5 style="font-size: 0.8125rem; font-weight: 600; color: var(--color-text-primary); margin-bottom: 0.5rem;">${searchResults.title}</h5>
          <p style="font-size: 0.75rem; color: var(--color-text-secondary); line-height: 1.45; margin-bottom: 0.75rem;">${searchResults.details}</p>
          
          <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; display: block; margin-bottom: 0.25rem;">SDK IMPLEMENTATION CODE</span>
          <div class="doc-code-block">${searchResults.code.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</div>

          <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary btn-xs" id="googleDocsSearchBtn">
              <i data-lucide="external-link" style="width: 12px; height: 12px; margin-right: 4px;"></i>
              <span>Open official AetherFlow Docs</span>
            </button>
          </div>

          <!-- Sub-search input bar -->
          <div style="margin-top: 1rem; border-top: 1px dashed var(--color-border); padding-top: 0.75rem;">
            <span style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted); display: block; margin-bottom: 0.375rem;">STILL HAVE QUESTIONS? SEARCH DOCUMENTATION DIRECTLY</span>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="subSearchInput" placeholder="Ask another question..." class="form-input" style="flex: 1; font-size: 0.75rem; padding: 0.375rem 0.5rem;">
              <button class="btn btn-primary btn-xs" id="subSearchSubmitBtn">Search</button>
            </div>
          </div>
        </div>
      `;
    } else {
      docSearchContentHtml = `
        <button class="btn btn-secondary btn-sm" id="searchDocsOnlineBtn" style="margin-top: 1rem; width: 100%; justify-content: center; font-weight: 600; border-color: var(--color-brand); color: var(--color-brand);">
          <i data-lucide="cloud-lightning" style="width: 14px; height: 14px; margin-right: 4px;"></i>
          <span>Search more information online from latest docs</span>
        </button>
      `;
    }

    let footerActionsHtml = '';
    if (isTemplate) {
      footerActionsHtml = `
        <button class="btn btn-secondary btn-sm" id="closeDetailModalBtn">Cancel</button>
        <button class="btn btn-primary btn-sm" id="deployEvaluatorActionBtn" style="font-weight: 600;">Deploy Evaluator</button>
      `;
    } else {
      footerActionsHtml = `
        <button class="btn btn-secondary btn-sm" id="closeDetailModalBtn" style="width: 100%;">Close</button>
      `;
    }

    container.innerHTML = `
      <div class="search-overlay" style="display: flex; align-items: center; justify-content: center; padding-top: 0;">
        <div class="search-modal" style="max-width: 580px; width: 90vw; text-align: left;">
          <div class="search-modal-header" style="justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="shield" style="width: 16px; height: 16px; color: var(--color-brand);"></i>
              <h3 style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-primary); margin: 0;">${selectedEval.name} Details</h3>
            </div>
            <span class="search-esc-kbd" id="closeModalCross" style="cursor: pointer;">Esc</span>
          </div>

          <div class="search-modal-body" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
              <span class="badge badge-blue">${selectedEval.type || 'LLM Judge'}</span>
              <span style="color: var(--color-text-muted); font-weight: 500;">Version ${selectedEval.version || 'v1.0'}</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.375rem;">
              <span style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase;">Description</span>
              <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.45; margin: 0;">
                ${selectedEval.desc}
              </p>
            </div>

            <!-- Docs Search wrapper -->
            ${docSearchContentHtml}
          </div>

          <div class="search-modal-footer" style="justify-content: flex-end; gap: 0.75rem;">
            ${footerActionsHtml}
          </div>
        </div>
      </div>
    `;

    bindModalEvents();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function bindModalEvents() {
    // Close clicks
    const closeBtn = document.getElementById('closeDetailModalBtn');
    const closeCross = document.getElementById('closeModalCross');
    if (closeBtn) closeBtn.addEventListener('click', () => { selectedEval = null; renderList(); });
    if (closeCross) closeCross.addEventListener('click', () => { selectedEval = null; renderList(); });

    // Search docs click handler
    const searchDocsBtn = document.getElementById('searchDocsOnlineBtn');
    if (searchDocsBtn) {
      searchDocsBtn.addEventListener('click', () => {
        isSearching = true;
        renderModal();

        // Simulate animated loading from docs
        setTimeout(() => {
          isSearching = false;
          // Retrieve from pre-baked docs or fallback
          const nameClean = selectedEval.name.replace(' Evaluator', '');
          searchResults = evaluatorDocs[nameClean] || evaluatorDocs[selectedEval.name] || {
            title: `${selectedEval.name} Reference Documentation (smith.aetherflow.com/docs)`,
            summary: `Automated testing specifications for ${selectedEval.name}`,
            details: `For more information about deploying and calibrating the ${selectedEval.name} evaluation pipeline, configure standard LLM Prompt metrics or invoke custom string match checkers in your project SDK scripts.`,
            code: `# Load custom evaluator\nfrom aetherflow.evaluation import evaluate\n\ndef custom_grader(run, example):\n    # Custom evaluator threshold validation\n    return {"key": "${selectedEval.name.toLowerCase().replace(/ /g, '_')}", "score": 1}`
          };
          renderModal();
        }, 1500);
      });
    }

    // Google docs external redirect click
    const googleBtn = document.getElementById('googleDocsSearchBtn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        const query = `AetherFlow ${selectedEval.name} evaluation documentation guide`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      });
    }

    // Sub-search submission
    const subSearchBtn = document.getElementById('subSearchSubmitBtn');
    const subSearchInput = document.getElementById('subSearchInput');
    if (subSearchBtn && subSearchInput) {
      const runSubSearch = () => {
        const q = subSearchInput.value.trim();
        if (!q) return;
        isSearching = true;
        renderModal();
        setTimeout(() => {
          isSearching = false;
          searchResults = {
            title: `Documentation search results for: "${q}"`,
            details: `Scraped online guides show matches regarding: "${q}". Standard practices advise running baseline tests on golden datasets first to calibrate model thresholds.`,
            code: `# Query integration\n# Run evaluation runs using custom prompt guides\n# For more info check smith.aetherflow.com/docs`
          };
          renderModal();
        }, 1200);
      };

      subSearchBtn.addEventListener('click', runSubSearch);
      subSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          runSubSearch();
        }
      });
    }

    // Deploy Evaluator from Template action
    const deployBtn = document.getElementById('deployEvaluatorActionBtn');
    if (deployBtn) {
      deployBtn.addEventListener('click', () => {
        activeEvaluators.push({
          id: `eval-${Date.now()}`,
          name: selectedEval.name.endsWith('Evaluator') ? selectedEval.name : `${selectedEval.name} Evaluator`,
          desc: selectedEval.desc,
          type: selectedEval.type || 'LLM-as-a-judge',
          typeClass: 'badge-blue',
          version: 'v1.0',
          meta: 'LLM Prompt Check (Default)'
        });
        saveEvaluators();
        selectedEval = null;
        renderList();
      });
    }
  }

  renderList();
}
