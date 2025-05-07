document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    const connectionStatus = document.getElementById('connection-status');
    const statusIndicator = document.getElementById('status-indicator');
    
    let ws;
    let username;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
  
    function connect() {
      // Create WebSocket connection (adjust URL as needed)
      ws = new WebSocket('ws://localhost:3000');
      
      // Connection opened
      ws.addEventListener('open', () => {
        connectionStatus.textContent = 'Connected';
        statusIndicator.classList.add('status-connected');
        statusIndicator.classList.remove('status-disconnected');
        reconnectAttempts = 0;
      });
      
      // Listen for messages
      ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'connect':
            username = message.data.username;
            connectionStatus.textContent = `Connected as ${username}`;
            appendSystemMessage(message.data.message);
            break;
            
          case 'message':
            appendChatMessage(message.data);
            break;
            
          case 'notification':
            appendSystemMessage(message.data.message);
            break;
            
          default:
            console.warn('Unknown message type:', message.type);
        }
      });
      
      // Handle errors
      ws.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
      });
      
      // Handle disconnection
      ws.addEventListener('close', () => {
        connectionStatus.textContent = 'Disconnected';
        statusIndicator.classList.remove('status-connected');
        statusIndicator.classList.add('status-disconnected');
        
        // Attempt to reconnect if not reached max attempts
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts - 1), 10000);
          
          connectionStatus.textContent = `Reconnecting (${reconnectAttempts}/${maxReconnectAttempts})...`;
          
          setTimeout(() => {
            connect();
          }, timeout);
        } else {
          appendSystemMessage('Could not reconnect. Please refresh the page.');
        }
      });
    }
    
    // Send message
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const text = messageInput.value.trim();
      if (!text || !ws || ws.readyState !== WebSocket.OPEN) return;
      
      // Send the message to the server
      ws.send(JSON.stringify({ text }));
      
      // Clear input field
      messageInput.value = '';
    });
    
    // Append a chat message to the message container
    function appendChatMessage(data) {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${data.username === username ? 'message-sent' : 'message-received'}`;
      
      const nameElement = document.createElement('div');
      nameElement.className = 'user-name';
      nameElement.textContent = data.username;
      
      const textElement = document.createElement('div');
      textElement.textContent = data.text;
      
      const timeElement = document.createElement('div');
      timeElement.className = 'message-time';
      timeElement.textContent = formatTime(new Date(data.timestamp));
      
      messageElement.appendChild(nameElement);
      messageElement.appendChild(textElement);
      messageElement.appendChild(timeElement);
      
      messagesContainer.appendChild(messageElement);
      scrollToBottom();
    }
    
    // Append a system message
    function appendSystemMessage(text) {
      const messageElement = document.createElement('div');
      messageElement.className = 'message-system';
      messageElement.textContent = text;
      
      messagesContainer.appendChild(messageElement);
      scrollToBottom();
    }
    
    // Format time as HH:MM
    function formatTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Scroll to the bottom of the messages container
    function scrollToBottom() {
      const chatWindow = document.getElementById('chat-window');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    
    // Start the connection
    connect();
  });