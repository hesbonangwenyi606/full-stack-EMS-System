import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

export type Employee = {
  _id?: string
  name: string
  email: string
  department?: string
  role?: string
  dateOfJoining?: string
  status?: string
  createdAt?: string
}

type Paged = { items: Employee[]; total:number; page:number; pages:number }

type Ctx = {
  employees: Employee[]
  total: number
  page: number
  pages: number
  loading: boolean
  query: string
  fetch: (opts?:{page?:number; q?:string})=>Promise<void>
  create: (e:Employee)=>Promise<void>
  update: (id:string, e:Partial<Employee>)=>Promise<void>
  remove: (id:string)=>Promise<void>
  setQuery: (s:string)=>void
}

const EmployeeContext = createContext<Ctx>(null!)

export function EmployeeProvider({ children }:{children:React.ReactNode}){
  const [employees,setEmployees] = useState<Employee[]>([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [pages,setPages] = useState(1)
  const [query,setQuery] = useState('')
  const [loading,setLoading] = useState(false)

  const fetch = async (opts:{page?:number; q?:string}={})=>{
    setLoading(true)
    const p = opts.page ?? page
    const q = opts.q ?? query
    const { data } = await api.get('/employees', { params: { page: p, limit: 10, q } })
    setEmployees(data.items); setTotal(data.total); setPage(data.page); setPages(data.pages)
    setLoading(false)
  }

  const create = async (e:Employee)=>{
    await api.post('/employees', e); await fetch({ page: 1, q: query })
  }
  const update = async (id:string, e:Partial<Employee>)=>{
    await api.put(`/employees/${id}`, e); await fetch({ page, q: query })
  }
  const remove = async (id:string)=>{
    await api.delete(`/employees/${id}`); await fetch({ page, q: query })
  }

  useEffect(()=>{ fetch({ page:1 }) }, [])

  return <EmployeeContext.Provider value={{ employees,total,page,pages,loading,query,fetch,create,update,remove,setQuery }}>
    {children}
  </EmployeeContext.Provider>
}

export const useEmployees = ()=>useContext(EmployeeContext)
