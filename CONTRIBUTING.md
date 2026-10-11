# Contributing

Thank you for contributing to the Inventory Management System. Contributions should keep the application secure, maintainable, and consistent across the frontend and backend.

## Getting started

1. Clone the repository and ensure your local `main` branch is up to date:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create a focused branch from `main`:
   ```bash
   git checkout -b feature/short-description
   ```
3. Follow the setup instructions in the root [README](./README.md).
4. Keep environment files strictly local. Never commit secrets, tokens, or live database connection strings.

## Making changes

- Keep each change focused on one specific feature, bug fix, or documentation task.
- Follow the established project structure:
  - Client components, routes, and services live in `frontend/`.
  - API routes, controllers, middleware, and Mongoose models live in `backend/`.
- Reuse existing components, hooks, and helpers before creating new abstractions.
- Preserve the existing authentication flow and role-based access control (RBAC):
  - Admin: Full CRUD on products and stock updates (`requireAdmin`).
  - User: Read-only inventory access and search.
- Validate and authorize requests on the server; client-side route guards complement but never replace backend security.
- Adhere to the project standards outlined in [RULES.md](./RULES.md) and [AI_USAGE.md](./AI_USAGE.md).
- Do not commit generated files (`dist/`), dependency directories (`node_modules/`), or `.env` files.

## Checks before opening a pull request

Run the checks relevant to your change:

```bash
cd frontend
npm run lint
npm run build
```

For backend changes, manually verify the affected endpoints (`/api/auth/*` or `/api/products/*`) using curl or an API client against the active MongoDB connection.

## Pull requests

Pull requests should:

- Link the associated issue in the description (e.g., `Closes #<issue_id>`).
- Explain what changed and why the change was made.
- Describe how the implementation was verified.
- Include screenshots for any visible UI or component changes.
- Highlight any environment variable, database schema, or security impacts.
- Keep diffs clean and free of unrelated formatting or refactoring.
