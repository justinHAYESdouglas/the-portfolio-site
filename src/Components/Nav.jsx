import React from 'react'
import './nav.css'

function scrollToSection(id, offset = 0) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}

export default function Nav() {
  return (
    <nav>
      <div id="internal-links">
      <a id="home-link" href='#' title='Home'>✦</a>
      <a href='#' onClick={(e) => { e.preventDefault(); scrollToSection("work-container", -45); }}>Work</a>
      <a href='#' onClick={(e) => { e.preventDefault(); scrollToSection("about-wrapper", -185); }}>About</a>
      </div>
      
      <div id="external-links">
        <a href='mailto:justin.hayes.douglas@gmail.com'>Email</a>
        <a href='https://www.linkedin.com/in/justin-h-5a24191a1/' target="_blank">LinkedIn</a>
      </div>
      

    </nav>
  )
}
