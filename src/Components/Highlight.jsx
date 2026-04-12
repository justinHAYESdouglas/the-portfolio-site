import './highlight.css'

export default function Highlight({ selected }) {
  return (
    <>
      <section id="highlight-container">
        <div id="highlight-title-wrapper">
          <h5 id="highlight-job-title">
            {selected?.url && !selected?.tenure
              ? <a href={selected.url} target="_blank" rel="noreferrer">{selected.title ?? 'Job Title'}</a>
              : (selected?.title ?? 'Job Title')
            }
          </h5>
          <div id="highlight-job-tenure-container">
            <p id="highlight-job-name">
              {selected?.url && selected?.tenure
                ? <a href={selected.url} target="_blank" rel="noreferrer">{selected.subtitle ?? '@Job Name'}</a>
                : (selected?.subtitle ?? '@Job Name')
              }
            </p>
            {selected?.tenure && <p id="highlight-tenure">{selected.tenure}</p>}
          </div>
        </div>

        <div id="highlight-description-container">
          {selected
            ? selected.description.map((para, i) => <p key={i}>{para}</p>)
            : (
              <>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to</p>
              </>
            )
          }
        </div>
      </section>
    </>
  );
}
