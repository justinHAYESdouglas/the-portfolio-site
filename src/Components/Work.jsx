import "./work-proj.css";

export default function Work({
  role,
  companyName,
  tenure,
  url,
  onSelect,
  isSelected,
}) {
  return (
    <>
      <div className="work-thumb-container">
        <div
          className={`work-thumb${isSelected ? " is-selected" : ""}`}
          onClick={onSelect}
          style={{ cursor: "pointer" }}
        >
          <h4 className="role">{role}</h4>
          <p className="company-name">@{companyName}</p>
          <p className="tenure">{tenure}</p>
        </div>
        {isSelected && (
          <div className="link-wrapper">
            <a href={url} className="work-site-link" target="_blank" rel="noreferrer">
              View Website
            </a>
          </div>
        )}
      </div>
    </>
  );
}
