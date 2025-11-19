import { Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function ProtectedRoute({ children }:{children:JSX.Element}){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return children
}
