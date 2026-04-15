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
    screenMaterial: "vk_babel_work",
    url: "https://www.babelstreet.com/about-us?utm_source=Direct&utm_medium=Direct&utm_campaign=Not+Provided",
    description: [
      "Lead migration of enterprise-level managed attribution platform from jQuery to React + TypeScript, improving maintainability and performance for 1,000+ users across multiple organizations.",
      "Ensured full Section 508 and WCAG compliance, enhancing accessibility for all users.",
      "Resolved years of accumulated technical debt, significantly improving platform usability, and reducing support tickets.",
      "Designed and implemented new features (e.g., call center emulation) from wireframes through production.",
    ],
  },
  {
    role: "Frontend Developer",
    companyName: "Realnets",
    tenure: "2021-2022",
    screenMaterial: "realnets_work",
    url: "https://realnets.com/",
    description: [
      "Designed and developed responsive frontends for web and mobile apps, including a boutique hotel management system.",
      "Maintained and enhanced 30+ WordPress sites through custom code (HTML, CSS, JS, PHP) and plugins.",
      "Built internal quality-of-life tools in React.js to streamline team workflows.",
      "Collaborated directly with clients to translate business goals into design and technical solutions.",
    ],
  },
  {
    role: "Web Developer",
    companyName: "Wilbur Wright College",
    tenure: "2020-2021",
    screenMaterial: "wright_college_work",
    url: "https://www.ccc.edu/wright/home/",
    description: [
      "Developed and maintained the college's public-facing web presence, including event pages, department sites, and student resource portals.",
      "Improved page load performance and mobile responsiveness across legacy pages.",
      "Sole developer and designer for the Wright College Student Art Gallery website.",
      "Delivered a unique, responsive site with custom logos and design assets, and conducted usability testing.",
    ],
  },
];

const PROJECT_ITEMS = [
  {
    title: "Enterprise Bulk User Editor",
    techUsed: "React, TypeScript, MUI, CSS",
    screenMaterial: "ebue_proj",
    url: "https://justinhayesdouglas.github.io/bulk-user-ui/",
    repoUrl: "https://github.com/justinHAYESdouglas/bulk-user-ui",
    description: [
      "A responsive, accessibility-first user management system with full keyboard navigation, ARIA refinements, and screen-reader support keeping core workflows usable across screen sizes.",
      "Supports bulk operations (add, replace, remove), advanced life cycle controls (archive/restore, password resets), and safety features like hold-to-confirm deletion to prevent errors at scale.",
      "Built on a reusable modal architecture with inline validation, progressive workflows, and fast search/filtering all within a consistent dark-themed design system.",
    ],
  },
  {
    title: "Covid Concious",
    techUsed: "jQuery, HTML, CSS",
    screenMaterial: "covid_proj",
    url: "https://covidconscious.herokuapp.com/",
    repoUrl: "https://github.com/justinHAYESdouglas/CovidConcious",
    description: [
      "An accessible, easy to use, and responsive COVID stats dashboard using the COVID Act Now API, serving real-time case data organized by state.",
      "On the frontend, jQuery is used to make asynchronous AJAX requests, allowing the UI to dynamically fetch and update data without requiring full page reloads.",
    ],
  },
  {
    title: "Portfolio Site",
    techUsed: "React, Three.js, CSS, Blender",
    screenMaterial: "portfolio_proj",
    url: "https://github.com/justinHAYESdouglas/the-portfolio-site",
    repoUrl: [

    ],
    description: [
      "My fully custom 3D portfolio built with React and  and Three.js with models created in and exported from Blender!",
      "Features include ,scroll-driven camera animation with smooth keyframe interpolation, mouse parallax panning, and NDC-to-screen-space projection for pixel-accurate hover detection on a 3D character as well as character animation.",
      "Physically-based rendering with ACES filmic tone mapping, PCF shadow mapping, HDR environment lighting, and a responsive zoom system.",
    ],
  },
];

function App() {
  const [selected, setSelected] = useState({
    title: WORK_ITEMS[0].role,
    subtitle: `@${WORK_ITEMS[0].companyName}`,
    tenure: WORK_ITEMS[0].tenure,
    url: WORK_ITEMS[0].url,
    screenMaterial: WORK_ITEMS[0].screenMaterial,
    description: WORK_ITEMS[0].description,
  });

  const selectAndMaybeScrollToHighlight = (nextSelected) => {
    setSelected(nextSelected);
  };

  return (
    <>
      <div id="canvas-test">
        <Scene screenMaterial={selected?.screenMaterial} />
        <Nav />
        <Intro />
        <main>
          <div id="work-proj-highlight-bar">
            <section id="work-container">
              <h3>✦ Work</h3>
              <div id="work-thumb-wrapper">
                {WORK_ITEMS.map((item) => (
                  <Work
                    key={item.companyName}
                    role={item.role}
                    companyName={item.companyName}
                    tenure={item.tenure}
                    url={item.url}
                    onSelect={() =>
                      selectAndMaybeScrollToHighlight({
                        title: item.role,
                        subtitle: `@${item.companyName}`,
                        tenure: item.tenure,
                        url: item.url,
                        screenMaterial: item.screenMaterial,
                        description: item.description,
                      })
                    }
                    isSelected={selected?.subtitle === `@${item.companyName}`}
                  />
                ))}
                <div className="divider-wrapper">
                  <span className="divider"></span>
                  <span className="divider-point">✦</span>
                </div>
              </div>
            </section>

            <section id="proj-container">
              <h3>✦ Projects</h3>
              <div id="proj-thumb-wrapper">
                {PROJECT_ITEMS.map((item) => (
                  <Projects
                    key={item.title}
                    title={item.title}
                    techUsed={item.techUsed}
                    url={item.url}
                    repoUrl={item.repoUrl}
                    onSelect={() =>
                      selectAndMaybeScrollToHighlight({
                        title: item.title,
                        subtitle: item.techUsed,
                        url: item.url,
                        repoUrl: item.repoUrl,
                        screenMaterial: item.screenMaterial,
                        description: item.description,
                      })
                    }
                    isSelected={selected?.title === item.title}
                  />
                ))}
                <div className="divider-wrapper">
                  <span className="divider"></span>
                  <span className="divider-point">✦</span>
                </div>
              </div>
              <svg id="border-finish" viewBox="0 0 100 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 0 Q 50 50 100 0 L 50 50 Z" fill="#dcd4d1" />
              </svg>
            </section>
            <Highlight selected={selected} />
          </div>

          <div id="about-skill-bar">
            <section id="about-wrapper">
              <h3>✦ About Me</h3>
              
              <p className="about">
                {" "}
                Did you know that there are blend modes in CSS? I couldn't believe it!
                 If you don't know what blend modes are, the short answers that they're 
                 tools that determine the way the pixels of an image will interact with what's underneath it. 
                 I'm using them to invert colors on my name and the navagation so that
                 they remain readable no matter what the color of the background is. Anyway,
              </p>

              <p className="about">
               Hello! I'm Justin. <a href="/justin_hd_resume2026.pdf" id="resume-link" title="hire me!" target="_blank">Here's my resume</a>
              </p>

              <p className="about">  I'm a Chicago based UI/UX programmer, designer, frontend developer, and 3d artist.
                I work end-to-end, from research and wireframes to 
                polished UI and production-ready code. I'm also passionate about both useability and accessibility, making 
                sure that whatever I make can be easily used and enjoyed by anyone.</p>

                
            </section>

            <section id="skill-wrapper">
              <h3>✦ Skills</h3>
              <div className="skill-block">
                <h4>Dev</h4>
                <p>
                  React, Angular, JavaScript, TypeScript, Three.js, HTML, CSS, SCSS,
                  jQuery, MUI, Next.js, Node.js, Redux / Redux Toolkit, REST APIs, CI/CD Pipelines
                </p>
              </div>
              <div className="skill-block">
                <h4>UX & Design</h4>
                <p>
                  Design Systems, Figma, Adobe Illustrator, Adobe Photoshop,
                  Responsive / Mobile Design, UI/UX, Wireframing, Usability
                  Testing
                </p>
              </div>
              <div className="skill-block">
                <h4>Accessibility</h4>
                <p>
                  508 Compliance, WCAG Compliance, Screen reader testing
                  workflows, Cross-browser accessibility testing
                </p>
              </div>
              <div className="skill-block">
                <h4>3D Modeling</h4>
                <p>Blender, Box Modeling, Texturing, Rigging, Animation,</p>
              </div>
              <div className="skill-block">
                <h4>Misc.</h4>
                <p>
                  2nd best cook in my house of two, Undefeated in 1v1
                  tetris, AI Familiarity (Claude Code, Copilot, etc.)
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
