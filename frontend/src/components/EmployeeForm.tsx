import { useState, useEffect } from 'react'
import { Employee, useEmployees } from '../state/EmployeeContext'

type Props = { edit?: Employee|null; onDone?: ()=>void }
export default function EmployeeForm({ edit, onDone }:Props){
  const { create, update } = useEmployees()
  const [form, setForm] = useState<Employee>({ name:'', email:'', department:'', role:'', dateOfJoining:'' })

  useEffect(()=>{ if(edit) setForm({ ...edit }) }, [edit])

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault()
    if(edit && edit._id){ await update(edit._id, form) } else { await create(form) }
    setForm({ name:'', email:'', department:'', role:'', dateOfJoining:'' })
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="card grid">
      <div className="grid grid-2">
        <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      </div>
      <div className="grid grid-2">
        <input className="input" placeholder="Department" value={form.department||''} onChange={e=>setForm({...form,department:e.target.value})} />
        <input className="input" placeholder="Role" value={form.role||''} onChange={e=>setForm({...form,role:e.target.value})} />
      </div>
      <div className="grid grid-2">
        <input className="input" type="date" value={form.dateOfJoining?.slice(0,10) || ''} onChange={e=>setForm({...form,dateOfJoining:e.target.value})} />
        <select className="input" value={form.status||'active'} onChange={e=>setForm({...form,status:e.target.value})}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button className="btn">{edit?'Update':'Add'} Employee</button>
    </form>
  )
}
