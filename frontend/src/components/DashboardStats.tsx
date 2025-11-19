import { useEmployees } from '../state/EmployeeContext'
export default function DashboardStats(){
  const { total } = useEmployees()
  return (
    <div className="card grid grid-2">
      <div><h3>Total Employees</h3><div style={{fontSize:32,fontWeight:700}}>{total}</div></div>
      <div><h3>Status</h3><p>Active directory for your team, with search & pagination.</p></div>
    </div>
  )
}
