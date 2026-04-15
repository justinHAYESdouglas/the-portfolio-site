import "./work-proj.css";

export default function Projects({ title, techUsed, url, repoUrl, onSelect, isSelected }) {
  return (
      <div className="proj-thumb-container">
        <div
          className={`project-thumb${isSelected ? " is-selected" : ""}`}
          onClick={onSelect}
          style={{ cursor: "pointer" }}
        >
          <h4 className="project-title">{title}</h4>
          <p className="tech-used">{techUsed}</p>
        </div>
        {isSelected && (
          <div className="link-wrapper">
            <a href={url} className="proj-site-link" target="_blank" rel="noreferrer">
              View Website
            </a>
            <a href={repoUrl} className="proj-site-repo" target="_blank" rel="noreferrer">
              View Repo
            </a>
          </div>
        )}
      </div>
  );
}
