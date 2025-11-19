# Elewa EMS (MERN) — Assessment Deliverable

This repository contains a complete MERN implementation of a simplified **Employee Management System (EMS)** meeting the requirements from the assessment PDF.

## Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Frontend**: React + TypeScript + Vite, Axios, React Router
- **Auth**: Register/Login, JWT stored in localStorage, protected routes
- **Features**: CRUD Employees, search, pagination, responsive UI, contexts for auth & data

## Getting Started

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Ensure a MongoDB instance is running and the `.env` contains valid values.

### 2) Frontend
```bash
cd frontend
npm install
# set API URL (optional). Create .env and add:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

Open http://localhost:5173

## API Summary
- `POST /api/auth/register` — returns `{ token, user }`
- `POST /api/auth/login` — returns `{ token, user }`
- `GET /api/employees?q=&page=&limit=`
- `POST /api/employees`
- `GET /api/employees/:id`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

Send `Authorization: Bearer <token>` for all **/employees** routes.

## Architecture Notes
- **Indexes** on employee collection for fast search (`name` text index + fields)
- **Pagination** implemented with `skip/limit` on backend, and number buttons on frontend
- **Axios interceptors** inject JWT, centralize error handling
- **Contexts** split between `AuthContext` and `EmployeeContext`
- **Components**: `EmployeeList`, `EmployeeForm`, `DashboardStats`, `ProtectedRoute`, `Pagination`

## Optional Extras
- Role-based guard middleware available (`authorize(...)`) and ready to use.
- Add charts/toasts/dark-mode variants easily in the React app.

## Testing
Use Postman to hit the routes. A simple Postman collection can be created by importing the endpoints above.
# full-stack-EMS-System
