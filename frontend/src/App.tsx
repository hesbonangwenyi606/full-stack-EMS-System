import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './state/AuthContext'

export default function App(){
  const { user, logout } = useAuth()
  return (
    <div className="container">
      <div className="header">
        <h2>Elewa EMS</h2>
        <div className="nav">
          {user ? (<>
            <Link to="/dashboard">Dashboard</Link>
            <button className="btn" onClick={logout}>Logout</button>
          </>) : (<>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>)}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to={user?"/dashboard":"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}
