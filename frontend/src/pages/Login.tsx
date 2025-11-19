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
    try{ 
      await login(email, password); 
      nav('/dashboard') 
    } 
    catch(err:any){ 
      setError(err?.response?.data?.message || err.message) 
    }
  }

  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>Elewa EMS</h1>

      <form onSubmit={submit} style={styles.card}>
        <h3 style={styles.subtitle}>Login</h3>

        {error && <div style={styles.error}>{error}</div>}

        <input 
          style={styles.input}
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
        />

        <input 
          style={styles.input}
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
        />

        <button style={styles.button}>Login</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f8f9fa"
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
    fontWeight: 700,
    color: "#333"
  },
  card: {
    display: "flex",
    flexDirection: "column" as const,
    padding: "30px",
    width: "350px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  subtitle: {
    fontSize: "22px",
    marginBottom: "15px",
    textAlign: "center" as const
  },
  error: {
    color: "tomato",
    marginBottom: "10px",
    textAlign: "center" as const
  },
  input: {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    marginTop: "15px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s"
  }
}
