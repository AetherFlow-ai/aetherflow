export function initChatWidget() {
  const triggerBtn = document.getElementById('chatTriggerBtn');
  const chatPane = document.getElementById('chatPane');
  const closeBtn = document.getElementById('closeChatBtn');
  const chatTextInput = document.getElementById('chatTextInput');
  const sendChatBtn = document.getElementById('sendChatBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatWelcomeState = document.getElementById('chatWelcomeState');
  const suggestionCards = document.querySelectorAll('.chat-suggestion-card');

  // Toggle chat panel
  triggerBtn.addEventListener('click', () => {
    chatPane.classList.toggle('hidden');
    if (!chatPane.classList.contains('hidden')) {
      chatTextInput.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    chatPane.classList.add('hidden');
  });

  // Handle suggestion cards clicks
  suggestionCards.forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-prompt');
      chatTextInput.value = prompt;
      submitMessage(prompt);
    });
  });

  // Enter to send
  chatTextInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const msg = chatTextInput.value.trim();
      if (msg) {
        submitMessage(msg);
      }
    }
  });

  sendChatBtn.addEventListener('click', () => {
    const msg = chatTextInput.value.trim();
    if (msg) {
      submitMessage(msg);
    }
  });

  function submitMessage(text) {
    // Hide welcome state on first message
    if (chatWelcomeState) {
      chatWelcomeState.remove();
    }

    // Render User message
    renderMessage(text, 'user');
    chatTextInput.value = '';

    // Auto-scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulated response delay
    setTimeout(() => {
      let reply = "I'm a helpful AetherFlow assistant. How can I help you trace, monitor or evaluate your LLM Agents?";
      
      const textLower = text.toLowerCase();
      if (textLower.includes('how do i use') || textLower.includes('get started')) {
        reply = `To start tracing, install the dependencies:<br><br>
        <code>pip install -U aetherflow</code><br><br>
        And configure your environment:<br><br>
        <code>export AETHERFLOW_TRACING=true<br>export AETHERFLOW_API_KEY="your-api-key"</code><br><br>
        Now, any LLM call inside AetherFlow or instrumented SDKs will be tracked!`;
      } else if (textLower.includes('eval') || textLower.includes('concept')) {
        reply = `Evaluators let you grade runs in datasets. AetherFlow supports:<br><br>
        • **LLM-as-a-judge** (using another model to evaluate correctness)<br>
        • **Deterministic Evaluators** (regex match, JSON parsing, exact match)<br>
        • **Human Feedback** (Annotation queues for rating outputs manually)`;
      } else if (textLower.includes('debug') || textLower.includes('trace')) {
        reply = `To debug traces:<br><br>
        1. Navigate to the **Tracing** tab<br>
        2. Click on a specific run to open the tree view<br>
        3. Check latency and token costs per node<br>
        4. Inspect input / output payloads on each step to find where error occurred.`;
      }

      renderMessage(reply, 'assistant');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  }

  function renderMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-msg-bubble ${sender}`;
    bubble.innerHTML = text;
    chatMessages.appendChild(bubble);
  }
}
