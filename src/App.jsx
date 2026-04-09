import "./App.css";
import Nav from "./Components/Nav.jsx";
import Intro from "./Components/intro.jsx";
import Projects from "./Components/Projects.jsx";
import Work from "./Components/Work.jsx";
import Highlight from "./Components/Highlight.jsx";

function App() {
  return (
    <>
      <div id='canvas-test'>
        <Nav />
      <Intro />
      <main>
        <div id="work-container">
          <div className="down-arrow-wrapper">
            <span className="arrow-shaft"></span>
            <span className="arrow-head"></span>
          </div>

          <div id="work-proj-container">
            <section id="work-thumb-container">
              <h3>✦ Work</h3>
              <div id="work-thumb-wrapper">
                <Work
                  role="UI/UX Engineer"
                  companyName="Vertical Knowledge -> Babel Street"
                  tenure="2022-2026"
                />
                <Work
                  role="Frontend Developer"
                  companyName="Realnets"
                  tenure="2021-2022"
                />
                <Work
                  role="Web Developer"
                  companyName="Wilbur Wright College"
                  tenure="2020-2021"
                />
              </div>
            </section>

            <section id="proj-thumb-container">
              <h3>✦ Projects</h3>
              <div id="proj-thumb-wrapper">
                <Projects
                  title="Enterprise Bulk User Editor"
                  techUsed="React, TypeScript, MUI, CSS"
                />
                <Projects
                  title="Covid Conscious"
                  techUsed="jQuery, HTML, CSS"
                />
                <Projects
                  title="Portfolio Site"
                  techUsed="React, Three.js, CSS, Blender"
                />
              </div>
            </section>
          </div>
          <Highlight />
        </div>
        <section id="about-container">
           <div className="down-arrow-wrapper">
            <span className="arrow-shaft"></span>
            <span className="arrow-head"></span>
          </div>
          <div id="about-wrapper">
            <h3>✦ About</h3>
            <p className="about"> Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to</p>
             <p className="about"> Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to</p>
            <h3>✦ Skills</h3>
            <div id="skills-wrapper">
              <div className="skill-block">
                <h4>Dev</h4>
                <p>
                  React, JavaScript, TypeScript, Three.js, HTML, CSS, SCSS,
                  jQuery, MUI, Redux / Redux Toolkit, REST APIs, CI/CD Pipelines
                </p>
              </div>
              <div className="skill-block">
                <h4>UX & Design</h4>
                <p>
                  Design Systems, Figma, Adobe Illustrator, Adobe Photoshop,
                   Responsive / Mobile Design, UI/UX, Wireframing, Usability Testing
                </p>
              </div>
              <div className="skill-block">
                <h4>Accessibility</h4>
                <p>
                  508 Compliance, WCAG Compliance,
                  Screen reader testing workflows, Cross-browser accessibility testing
                </p>
              </div>
              <div className="skill-block">
                <h4>3D Modeling</h4>
                <p>
                  Blender, Box Modeling, Texturing, Rigging, Animation,
                </p>
              </div>
              <div className="skill-block">
                <h4>Misc.</h4>
                <p>
                  2nd best cook in my house of two, Wordle, , Undefeated in 1v1 tetris,  
                  AI Familiarity (Claude Code, Copilot, etc.)
                </p>
              </div>
            </div>
          </div>
          
           
        </section>
      </main>
      </div>
      
    </>
  );
}

export default App;
