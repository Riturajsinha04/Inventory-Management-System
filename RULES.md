# Project Rules

These rules apply to all changes in the Inventory Management System.

## Code and architecture

- Keep frontend code in `frontend/` and backend code in `backend/`.
- Use the existing React and Vite conventions in the frontend.
- Keep API behavior, database schemas, and authorization decisions in the backend.
- Use clear, descriptive names and small, focused functions and components.
- Avoid duplicating validation, authorization, or business logic.
- Preserve existing public API response shapes unless a change is intentional and documented.

## Security

- Never commit credentials, secrets, private keys, or real user data.
- Treat all client input as untrusted and validate it on the server.
- Enforce role-based access control (`requireAdmin`) on all protected inventory operations (create, update, delete, stock update).
- Do not expose JWT secrets, database connection strings, or internal error details.
- Use environment variables for deployment-specific configuration.

## Git and documentation

- Follow the team Git workflow: develop on feature branches (`feature/*`) and submit Pull Requests (no direct pushing to `main`).
- Make focused commits with clear messages.
- Reference relevant GitHub issues in pull requests (`Closes #<issue_id>`).
- Do not rewrite shared history or force-push without explicit team approval.
- Update the README or relevant documentation when behavior or setup changes.
- Do not add generated output (`dist/`), dependency directories (`node_modules/`), or local `.env` files to the repository.
- Review the complete diff before opening a pull request.

## Validation

At minimum, frontend changes should pass:

```bash
cd frontend
npm run lint
npm run build
```

Backend changes should be verified through the affected API flows (`/api/auth/*` and `/api/products/*`) against the active database connection.
