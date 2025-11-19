import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Login(){
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault()
    try{ await login(email, password); nav('/dashboard') } 
    catch(err:any){ setError(err?.response?.data?.message || err.message) }
  }

  return (
    <div className="grid">
      <form onSubmit={submit} className="card grid">
        <h3>Login</h3>
        {error && <div style={{color:'tomato'}}>{error}</div>}
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn">Login</button>
      </form>
    </div>
  )
}
