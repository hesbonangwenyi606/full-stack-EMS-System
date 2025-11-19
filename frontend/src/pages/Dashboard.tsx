import EmployeeForm from '../components/EmployeeForm'
import EmployeeList from '../components/EmployeeList'
import DashboardStats from '../components/DashboardStats'
import { useState } from 'react'

export default function Dashboard(){
  const [showForm, setShowForm] = useState(true)
  return (
    <div className="grid">
      <DashboardStats />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>Employees</h3>
        <button className="btn" onClick={()=>setShowForm(v=>!v)}>{showForm?'Hide':'Add New'}</button>
      </div>
      {showForm && <EmployeeForm onDone={()=>setShowForm(false)} />}
      <EmployeeList />
    </div>
  )
}
