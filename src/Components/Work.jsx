import './work-proj.css'

export default function Work({ role, companyName, tenure }) {
  return (
    <>
      <div className="work-thumb">
        <h4 className='role'>{role}</h4>
        <p className="company-name">@{companyName}</p>
        <p className="tenure">{tenure}</p>
      </div>
    </>
  )
}
