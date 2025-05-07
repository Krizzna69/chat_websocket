const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Simple routing
  if (req.url === '/' || req.url === '/index.html') {
    // Serve index.html
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/styles.css') {
    // Serve CSS file
    fs.readFile(path.join(__dirname, 'styles.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading styles.css');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (req.url === '/app.js') {
    // Serve JavaScript file
    fs.readFile(path.join(__dirname, 'app.js'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading app.js');
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
  } else {
    // Health check endpoint for Render
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket Chat Server is running');
  }
});

// Use the PORT environment variable provided by Render
const port = process.env.PORT || 3000;

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();
let userCounter = 0;

// Handle WebSocket connections
wss.on('connection', (ws) => {
  const userId = ++userCounter;
  const username = `User${userId}`;
  console.log(`${username} connected`);
  
  // Store client in the map
  clients.set(ws, { username });
  
  // Send welcome message to the new client
  ws.send(JSON.stringify({
    type: 'connect',
    data: {
      username,
      message: `Welcome ${username}! You are now connected.`
    }
  }));
  
  // Notify all clients about new connection
  broadcastMessage({
    type: 'notification',
    data: {
      message: `${username} joined the chat`,
      timestamp: new Date().toISOString()
    }
  });
  
  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      
      // Broadcast the message to all clients
      broadcastMessage({
        type: 'message',
        data: {
          username,
          text: parsedMessage.text,
          timestamp: new Date().toISOString()
        }
      });
    } catch (e) {
      console.error('Invalid message format:', e);
    }
  });
  
  // Handle client disconnection
  ws.on('close', () => {
    const userData = clients.get(ws);
    console.log(`${userData.username} disconnected`);
    
    // Remove client from the map
    clients.delete(ws);
    
    // Notify all clients about disconnection
    broadcastMessage({
      type: 'notification',
      data: {
        message: `${userData.username} left the chat`,
        timestamp: new Date().toISOString()
      }
    });
  });
});

// Function to broadcast messages to all connected clients
function broadcastMessage(message) {
  const messageString = JSON.stringify(message);
  
  clients.forEach((userData, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
}

// Start the server
server.listen(port, () => {
  console.log(`WebSocket chat server is running on port ${port}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});