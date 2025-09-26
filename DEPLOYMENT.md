# Book Management System (Go + Next.js)

## How to Deploy

### Backend (Go)
- Copy `.env.example` to `.env` and set your production DB credentials and CORS origin.
- Build the backend:
  ```sh
  go build -o book-mgmt-server ./cmd/main/main.go
  ```
- Run the binary on your server:
  ```sh
  ./book-mgmt-server
  ```

### Frontend (Next.js)
- Copy `frontend/.env.local.example` to `frontend/.env.local` and set your production API URL.
- Build the frontend:
  ```sh
  cd frontend
  npm install
  npm run build
  npm start
  ```
- Or deploy to Vercel/Netlify for static hosting.

### GitHub
- Commit all files, including `.env.example` and `frontend/.env.local.example` (but NOT your real `.env` or `.env.local`).
- Push to your GitHub repository.

## Notes
- Never commit real secrets or passwords to GitHub.
- Set environment variables in your production environment.
