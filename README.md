# Hexflow : Automated Penetration Testing Tool with Artificial Intelligence

![Hexflow Demo](./assets/hexflow.gif)

Hexflow is a full-stack application designed for penetration testing, and visualization. It leverages a modern React frontend, a Node.js backend, and integrates with AI and security tools for advanced analysis.

## Project Structure

```
hexflow/
├── backend/         # Node.js backend server and tools
│   ├── server.js
│   ├── package.json
│   └── tools/
├── frontend/        # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── ollama/          # AI/ML integration (Ollama Docker setup)
│   ├── Dockerfile
│   └── entrypoint.sh
├── compose.yaml     # Docker Compose for multi-service orchestration
```

## Features

-   Interactive mindmap for penetration testing visualization
-   Network scanning (Nmap, directory, subdomain, etc.)
-   AI-powered analysis and suggestions
-   Modular, extensible node and flow system
-   Dockerized deployment for all services

## Prerequisites

-   Docker & Docker Compose
-   Node.js (for local development)
-   npm or yarn

## Setup & Usage

### 1. Clone the repository

```sh
git clone https://github.com/hexadivine/hexflow.git
cd hexflow
```

### 2. Start with Docker Compose

```sh
docker compose up --build
```

This will start the backend, frontend, and Ollama AI services.

### 3. Development (Frontend/Backend)

-   **Frontend:**
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
-   **Backend:**
    ```sh
    cd backend
    npm install
    npm start
    ```

## Folder Details

-   **backend/**: Node.js server, API endpoints, and utility scripts
-   **frontend/**: React app, mindmap components, context, and utilities
-   **ollama/**: AI/ML service Docker setup

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

[MIT](LICENSE)

---

For more details, see the documentation in each subfolder or contact the maintainers.
