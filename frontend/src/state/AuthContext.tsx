import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

type User = { id:string; name:string; email:string; role:string }
type AuthContextType = {
  user: User | null
  login: (email:string, password:string)=>Promise<void>
  register: (name:string, email:string, password:string)=>Promise<void>
  logout: ()=>void
}
const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }:{children:React.ReactNode}){
  const [user, setUser] = useState<User|null>(null)

  useEffect(()=>{
    const u = localStorage.getItem('user')
    if(u) setUser(JSON.parse(u))
  }, [])

  const login = async (email:string, password:string)=>{
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const register = async (name:string, email:string, password:string)=>{
    const { data } = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    setUser(data.user)
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
