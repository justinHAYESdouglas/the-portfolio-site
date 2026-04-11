import './work-proj.css'

export default function Projects({ title, techUsed, onSelect, isSelected }) {
  return (
    <div className={`project-thumb${isSelected ? ' is-selected' : ''}`} onClick={onSelect} style={{ cursor: 'pointer' }}>
      <h4 className="project-title">{title}</h4>
      <p className="tech-used">{techUsed}</p>
    </div>
  )
}
