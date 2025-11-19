# Elewa EMS Backend

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run: `npm run dev`

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/employees?q=&page=&limit=` (protected)
- `POST /api/employees` (protected)
- `GET /api/employees/:id` (protected)
- `PUT /api/employees/:id` (protected)
- `DELETE /api/employees/:id` (protected)

### Auth
Use the `Authorization: Bearer <token>` header on protected routes.
