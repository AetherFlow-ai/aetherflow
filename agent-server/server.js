import http from 'http';

const PORT = 2024;

// Simple database to store run histories in memory
const runHistories = [];

const server = http.createServer((req, res) => {
  // 1. Set CORS Headers to allow Vite frontend to access the port
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight options requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // 2. GET /info: Returns server details and the active graph design
  if (req.method === 'GET' && url.pathname === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'connected',
      server: 'AetherGraph Local Agent Server',
      version: 'v1.2.0',
      activeGraph: 'flight_agent_swarm',
      graph: {
        nodes: ['__start__', 'model', 'tools', '__end__'],
        edges: [
          { from: '__start__', to: 'model' },
          { from: 'model', to: 'tools' },
          { from: 'tools', to: 'model' },
          { from: 'model', to: '__end__' }
        ]
      }
    }));
    return;
  }

  // 3. POST /runs: Runs the agent logic based on the user's message and returns logs + output
  if (req.method === 'POST' && url.pathname === '/runs') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const userMessage = payload.message || '';
        
        console.log(`[Agent Server] Running agent with query: "${userMessage}"`);

        let response = '';
        const logs = [];

        // Simple input routing rules to simulate realistic agent execution
        const lowerMsg = userMessage.toLowerCase();
        
        // Start Step
        logs.push({
          node: '__start__',
          status: 'info',
          message: `Received execution trigger with message: "${userMessage}"`
        });

        // Model Decision Step
        logs.push({
          node: 'model',
          status: 'invoking',
          message: 'Invoked LLM: Claude 3.5 Sonnet. Thinking...'
        });

        if (lowerMsg.includes('flight') || lowerMsg.includes('paris') || lowerMsg.includes('tokyo') || lowerMsg.includes('travel')) {
          // Flight search routing
          logs.push({
            node: 'model',
            status: 'routing',
            message: 'Model determined tool call is required: flight_search_api'
          });
          
          logs.push({
            node: 'tools',
            status: 'tool_call',
            message: 'Executing tool: flight_search_api(origin="Paris", destination="Tokyo")'
          });

          logs.push({
            node: 'model',
            status: 'invoking',
            message: 'Received flight details from database. Restructuring output...'
          });

          response = 'I found 3 direct flights from Paris to Tokyo matching your query:\n1. Air France AF276 - $820 (Direct, 12h 15m)\n2. Japan Airlines JL46 - $950 (Direct, 12h 00m)\n3. ANA NH216 - $990 (Direct, 12h 25m)\n\nWould you like me to book any of these options?';
        } else if (lowerMsg.includes('weather') || lowerMsg.includes('temp') || lowerMsg.includes('rain')) {
          // Weather fetcher routing
          logs.push({
            node: 'model',
            status: 'routing',
            message: 'Model determined tool call is required: weather_fetcher'
          });
          
          logs.push({
            node: 'tools',
            status: 'tool_call',
            message: 'Executing tool: weather_fetcher(location="New York")'
          });

          logs.push({
            node: 'model',
            status: 'invoking',
            message: 'Received weather telemetry info. Summarizing details...'
          });

          response = 'The current weather in New York is 72°F (22°C) with light rain and wind blowing east at 12 mph. Precipitation probability is 80%.';
        } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
          // Simple greeting
          logs.push({
            node: 'model',
            status: 'responding',
            message: 'Model generating direct conversational response.'
          });
          
          response = 'Hello! I am the local Agent Server runner. I am connected and ready to assist you. Ask me about flight searches or local weather conditions!';
        } else {
          // Fallback RAG / General Agent
          logs.push({
            node: 'model',
            status: 'routing',
            message: 'Model routing query to local Knowledge Base embeddings retriever.'
          });
          
          logs.push({
            node: 'tools',
            status: 'tool_call',
            message: 'Executing tool: rag_knowledge_retriever(query="' + userMessage + '")'
          });

          logs.push({
            node: 'model',
            status: 'invoking',
            message: 'Fitted retrieved knowledge snippets into prompt context. Finalizing reply...'
          });

          response = `I have processed your query: "${userMessage}". Based on the knowledge base: The operation was completed successfully by the AetherGraph agent server. Let me know if you have any questions or require custom tool execution!`;
        }

        // End Step
        logs.push({
          node: '__end__',
          status: 'success',
          message: 'Execution loop terminated successfully.'
        });

        // Store history in memory
        runHistories.push({
          query: userMessage,
          response: response,
          timestamp: new Date().toISOString(),
          logs: logs
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          response: response,
          logs: logs
        }));
      } catch (err) {
        console.error('[Agent Server] Error processing request:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // 4. Fallback 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 AetherGraph Local Agent Server running on port ${PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}`);
  console.log(`CORS is enabled. Ready to connect to AetherFlow Studio.`);
  console.log(`==================================================`);
});
