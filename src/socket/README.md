# Socket Module

This module handles real-time communication using WebSockets.

## Getting Started

### Prerequisites

- Node.js
- pnpm (or npm, yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the socket directory:
   ```bash
   cd socket
   ```

3. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Usage

To start the socket server, run:
```bash
pnpm start
# or
npm start
# or
yarn start
```

### API

- **WebSocket Connection**: Establishes a connection to the server.
- **Events**:
  - `onMessage`: Triggered when a message is received.
  - `onError`: Triggered when an error occurs.
  - `onClose`: Triggered when the connection is closed.

### Example

Here’s a simple example of how to use the socket module:

```javascript
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('Connected to the server');
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

socket.onclose = () => {
    console.log('Connection closed');
};
```

### License

This module is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

