# Book Management System (Go + Next.js)

This is a full-stack Book Management System with a Go (Golang) backend and a Next.js (React) frontend.

## Features
- Add, update, delete, and view books
- Get book by ID
- View all books
- Modern UI with Next.js and Tailwind CSS

## Project Structure
```
book-mgmt-system-go/
├── cmd/main/           # Go backend entrypoint
├── pkg/                # Go backend packages (models, controllers, routes, config, utils)
├── frontend/           # Next.js frontend app
├── go.mod, go.sum      # Go modules
├── .env.example        # Example backend environment variables
├── README.md           # This file
```

## Getting Started

### Backend (Go)
1. Copy `.env.example` to `.env` and fill in your DB credentials.
2. Install dependencies:
   ```sh
   go mod tidy
   go get github.com/joho/godotenv
   ```
3. Run the backend:
   ```sh
   go run ./cmd/main/main.go
   ```

### Frontend (Next.js)
1. Copy `.env.local.example` to `.env.local` and set your API URL.
2. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Run the frontend:
   ```sh
   npm run dev
   ```

## Deployment
- Set environment variables in your production environment (see `.env.example` and `.env.local.example`).
- Build the frontend with `npm run build` and serve with `npm start` or deploy to Vercel.
- Build the backend with `go build -o book-mgmt-server ./cmd/main/main.go` and run the binary on your server.

DEMO

Homepage
![App Screenshot](./assets/screenshot1.png)

Manage Books
![App Screenshot](./assets/screenshot2.png)
![App Screenshot](./assets/screenshot3.png)

All Books
![App Screenshot](./assets/screenshot4.png)
