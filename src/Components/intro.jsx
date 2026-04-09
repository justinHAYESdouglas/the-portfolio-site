import React from 'react'
import './intro.css'
export default function Intro() {
  return (
    <>
      <header id="intro-container">
        <div id="intro-wrapper">
          <div className="down-arrow-wrapper">
            <span className="arrow-shaft"></span>
            <span className="arrow-head"></span>
          </div>
          <div id="intro-card-wrapper">
            <div id="top-adonrment-container">
              <span id="top-1"></span>
              <div className="red-bar">
                <span className="red-bar-a"></span>
                <span className="red-bar-b"></span>
              </div>
              <div id="top-3">
                <span id="top-3a"></span>
                <span id="top-3b"></span>
                <span className="blue-diamond"></span>
              </div>
              <div id="top-4">
                <span id="top-4a"></span>
                <span className="green-circle"></span>
                <span id="top-4c"></span>
              </div>

            </div>
            <div id="name-logo-title-wrapper">
              
              <div id="logo-wrapper">
                <span className="logo-icon" role="img" aria-label="Justin Hayes Douglas Logo" title="Hire me!"></span>
              </div>
              <div id="name-title-container">
                <h1 id="name-wrapper">
                <span>Justin</span>
                <span>Hayes Douglas</span>
              </h1>

              <h2 id="title-wrapper">
                UI/UX | Engineer
              </h2>
              </div>
              
            </div>
            <div id="bot-adonrment-container">
              <div id="bot-1">
                <span id="bot-1a"></span>
                <span className="green-circle"></span>
                <span id="bot-1c"></span>
              </div>
              <div id="bot-2">
                <span id="bot-2a"></span>
                <span className="blue-diamond"></span>
              </div>
              <div className="red-bar">
                <span className="red-bar-a"></span>
                <span className="red-bar-b"></span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
