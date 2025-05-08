```markdown name=README.md
# WebSocket Chat Application

A simple real-time chat application using WebSockets, allowing multiple users to communicate instantly in a shared chat room.

![WebSocket Chat Screenshot](https://via.placeholder.com/800x400?text=WebSocket+Chat+Application)

## Features

- **Real-time Communication**: Messages are delivered instantly to all connected users
- **Multiple User Support**: Anyone can join the chat with an automatically assigned username
- **Connection Status**: Visual indicators for connection state
- **Clean UI**: Minimal and intuitive interface with distinct message bubbles
- **Automatic Reconnection**: Attempts to reconnect if the connection drops
- **Join/Leave Notifications**: System messages when users connect or disconnect

## Live Demo

The application is deployed and available at: [https://websocket-chat-app.onrender.com](https://websocket-chat-app.onrender.com)

## Technologies Used

- **Backend**: Node.js with WebSocket (ws) library
- **Frontend**: HTML, CSS, and JavaScript (vanilla)
- **Deployment**: Render cloud platform

## Local Development

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Krizzna69/chat_websocket.git
   cd chat_websocket
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
chat_websocket/
├── server.js       # WebSocket server and HTTP handling
├── index.html      # Main HTML file with chat interface
├── styles.css      # Styling for the chat interface
├── app.js          # Frontend JavaScript for WebSocket handling
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
```

## How It Works

1. The server uses Node.js with the `ws` library to create a WebSocket server
2. When a user connects, they're assigned a unique username (e.g., User1, User2)
3. Messages sent by users are broadcast to all connected clients
4. The frontend maintains the WebSocket connection and handles reconnection if needed
5. All messaging uses JSON format with message types for different kinds of communication

## Deployment

The application is deployed on Render.com as a Web Service. The environment is configured with:

- **Runtime**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

Render automatically assigns a PORT environment variable that the application uses.

## Future Enhancements

- Custom usernames
- Private messaging
- Message history
- Emoji support
- File sharing
- Mobile-responsive design improvements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Krizzna69 - [GitHub Profile](https://github.com/Krizzna69)

Project Link: [https://github.com/Krizzna69/chat_websocket](https://github.com/Krizzna69/chat_websocket)

---
You can access it here https://pjwebsocket.netlify.app/
Created on May 8, 2025
```

This README provides comprehensive information about your WebSocket chat application, including features, setup instructions, project structure, deployment details, and potential future enhancements. The placeholder URL for the screenshot and the demo link should be updated once your application is fully deployed.

The README is designed to be professional and informative, making it easy for anyone to understand what your application does and how to use or contribute to it. The date at the bottom reflects the current date you provided.
