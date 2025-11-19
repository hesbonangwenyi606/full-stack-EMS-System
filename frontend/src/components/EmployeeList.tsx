import { useState } from 'react'
import { useEmployees, Employee } from '../state/EmployeeContext'
import Pagination from './Pagination'

export default function EmployeeList(){
  const { employees, loading, fetch, page, pages, query, setQuery, remove } = useEmployees()
  const [editing, setEditing] = useState<Employee|null>(null)

  const onSearch = async (e:React.FormEvent)=>{ e.preventDefault(); await fetch({ page:1, q: query }) }

  return (
    <div className="card">
      <form onSubmit={onSearch} style={{display:'flex', gap:8, marginBottom:12}}>
        <input className="input" placeholder="Search name, email, department, role..." value={query} onChange={e=>setQuery(e.target.value)} />
        <button className="btn" type="submit">Search</button>
      </form>
      {loading? <div>Loading...</div> : (
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Dept</th><th>Role</th><th>Joined</th><th></th></tr></thead>
          <tbody>
            {employees.map(emp=>(
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.dateOfJoining? new Date(emp.dateOfJoining).toLocaleDateString(): '-'}</td>
                <td style={{display:'flex',gap:6}}>
                  <button className="btn" onClick={()=>setEditing(emp)}>Edit</button>
                  <button className="btn" onClick={()=>remove(emp._id!)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination page={page} pages={pages} onChange={(p)=>fetch({ page:p })} />
    </div>
  )
}
