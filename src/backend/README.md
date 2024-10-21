# Backend

This is the backend for the project.

## Getting Started

### Prerequisites

- Node.js
- npm (or yarn)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Server

To start the server, run:
```bash
npm start
# or
yarn start
# or
pnpm start
```

### API Endpoints

- **GET** `/api/user` - Description of the endpoint.
- **POST** `/api/register` - Endpoint for user registration. Accepts user details and returns a success message upon registration.
- **POST** `/api/login` - Endpoint for user login. Accepts credentials and returns a token upon successful login.
- **POST** `/api/message` - Endpoint for sending a message. Accepts message content and returns a success message.
- **GET** `/api/messages` - Endpoint for retrieving messages. Returns a list of messages.


### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
