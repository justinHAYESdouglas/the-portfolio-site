import './work-proj.css'

export default function Projects({ title, techUsed }) {
  return (
    <div id="project-thumb">
      <h4 className="project-title">{title}</h4>
      <p className="tech-used">{techUsed}</p>
    </div>
  )
}
