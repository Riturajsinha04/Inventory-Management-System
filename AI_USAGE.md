# AI Usage

AI tools may be used as development assistants for this project, but the contributor remains responsible for every change that is submitted.

## Appropriate uses

AI assistance can help with:

- Exploring the codebase and explaining existing behavior.
- Drafting documentation, tests, and small implementation changes.
- Suggesting debugging steps or alternative approaches (such as local port collisions and CORS errors).
- Reviewing code for readability, correctness, and common security issues.

## Required review

Before accepting AI-generated output, contributors must:

- Understand what the code does and why it is needed.
- Adhere to the project architecture (`frontend/` for React + Vite, `backend/` for Node.js + Express + Mongoose).
- Verify authentication (`authenticateUser`), authorization (`requireAdmin`), validation, and error-handling paths.
- Run the relevant lint, build, and test or manual verification commands:
  ```bash
  cd frontend
  npm run build
  npm run lint
  ```
- Review the final diff and remove unnecessary or speculative changes.

AI output must not be treated as authoritative. It can be incomplete, incorrect, outdated, or unaware of project-specific requirements.

## Privacy and security

- Do not send passwords, tokens, private keys, database credentials, personal data, or other confidential information to AI tools.
- Keep live database URIs and JWT secrets strictly within local `.env` files, and never commit them to the repository.
- Use representative or redacted examples when discussing sensitive data.
- Do not allow an AI tool to commit secrets or bypass repository security rules.
- Review dependencies, shell commands, and generated configuration carefully before running or committing them.

## Attribution and transparency

Contributors should disclose meaningful AI assistance when required by a course, employer, project, or review process. AI assistance does not replace human authorship, testing, code review, or responsibility for the submitted work.
