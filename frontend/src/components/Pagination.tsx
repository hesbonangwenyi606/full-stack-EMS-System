type Props = { page:number; pages:number; onChange:(p:number)=>void }
export default function Pagination({ page, pages, onChange }:Props){
  if(pages<=1) return null
  const items = Array.from({length:pages},(_,i)=>i+1)
  return <div style={{display:'flex',gap:8,marginTop:12}}>
    {items.map(p=>(
      <button key={p} className="btn" style={{opacity:p===page?1:.6}} onClick={()=>onChange(p)}>{p}</button>
    ))}
  </div>
}
