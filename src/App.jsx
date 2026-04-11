import { useState } from "react";
import "./App.css";
import Nav from "./Components/Nav.jsx";
import Intro from "./Components/intro.jsx";
import Projects from "./Components/Projects.jsx";
import Work from "./Components/Work.jsx";
import Highlight from "./Components/Highlight.jsx";
import Scene from "./3D/Scene.jsx";

const WORK_ITEMS = [
  {
    role: "UI/UX Engineer",
    companyName: "Vertical Knowledge -> Babel Street",
    tenure: "2022-2026",
    description: [
      "Led frontend development on an enterprise intelligence platform, building complex data visualization tools and bulk editing workflows used by government and commercial clients.",
      "Designed and implemented a component library and design system in React + TypeScript + MUI, improving consistency across 10+ feature teams.",
      "Championed accessibility initiatives, achieving 508 and WCAG compliance across core workflows including screen reader support and keyboard navigation.",
    ],
  },
  {
    role: "Frontend Developer",
    companyName: "Realnets",
    tenure: "2021-2022",
    description: [
      "Built and maintained responsive real estate listing interfaces consumed by thousands of daily users.",
      "Collaborated with backend engineers to integrate REST APIs for property search, filtering, and user account management.",
    ],
  },
  {
    role: "Web Developer",
    companyName: "Wilbur Wright College",
    tenure: "2020-2021",
    description: [
      "Developed and maintained the college's public-facing web presence, including event pages, department sites, and student resource portals.",
      "Improved page load performance and mobile responsiveness across legacy pages.",
    ],
  },
];

const PROJECT_ITEMS = [
  {
    title: "Enterprise Bulk User Editor",
    techUsed: "React, TypeScript, MUI, CSS",
    description: [
      "A high-throughput user management tool allowing administrators to select, filter, and apply role/permission changes across thousands of user accounts simultaneously.",
      "Designed with an optimistic UI pattern to keep interactions snappy, with granular undo/redo support and inline validation.",
    ],
  },
  {
    title: "Covid Conscious",
    techUsed: "jQuery, HTML, CSS",
    description: [
      "A community resource site built during the pandemic to surface local testing locations, safety guidelines, and mental health resources.",
      "Focused on accessibility and low-bandwidth performance for users on mobile or slow connections.",
    ],
  },
  {
    title: "Portfolio Site",
    techUsed: "React, Three.js, CSS, Blender",
    description: [
      "This site — a custom 3D portfolio built with React Three Fiber and a hand-modeled Blender scene exported as a GLB.",
      "Features scroll-driven camera animation, mouse parallax, physically-based lighting, and a fully responsive layout.",
    ],
  },
];

function App() {
  const [selected, setSelected] = useState({
    title: WORK_ITEMS[0].role,
    subtitle: `@${WORK_ITEMS[0].companyName}`,
    tenure: WORK_ITEMS[0].tenure,
    description: WORK_ITEMS[0].description,
  });

  return (
    <>
      <div id='canvas-test'>
      <Scene />
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
                {WORK_ITEMS.map((item) => (
                  <Work
                    key={item.companyName}
                    role={item.role}
                    companyName={item.companyName}
                    tenure={item.tenure}
                    onSelect={() => setSelected({ title: item.role, subtitle: `@${item.companyName}`, tenure: item.tenure, description: item.description })}
                    isSelected={selected?.subtitle === `@${item.companyName}`}
                  />
                ))}
              </div>
            </section>

            <section id="proj-thumb-container">
              <h3>✦ Projects</h3>
              <div id="proj-thumb-wrapper">
                {PROJECT_ITEMS.map((item) => (
                  <Projects
                    key={item.title}
                    title={item.title}
                    techUsed={item.techUsed}
                    onSelect={() => setSelected({ title: item.title, subtitle: item.techUsed, description: item.description })}
                    isSelected={selected?.title === item.title}
                  />
                ))}
              </div>
            </section>
          </div>
          <Highlight selected={selected} />
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
