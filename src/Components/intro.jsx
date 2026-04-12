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
              <div id="top-1">
                <span id="top-1a"></span>
              </div>
              
              <div className='top-2-bot-3'>
                <span className='bar'></span>
                <span className='star'>✦</span>
              </div>

              <div id="top-3">
                <span id="top-3a"></span>
                <span id="top-3b"></span>
                <span id="top-3c">✦</span>
              </div>

              <div className="top-4-bot-1">
                <span id="top-4a"></span>
                <span className='top-4b-bot-1b'>✦</span>
                <span className='top-4c-bot1c'></span>
              </div>
            </div>
            <div id="name-logo-title-wrapper">
              <div id="name-title-container">
                <h1 id="name-wrapper">
                <span>Justin</span>
                <span>Hayes Douglas</span>
              </h1>

              <h2 id="title-wrapper">
                UI/UX | Frontend Engineer | Designer
              </h2>
              </div>
              
            </div>
            <div id="bot-adonrment-container">
              <div className="top-4-bot-1">
                <span id="bot-1a"></span>
                <span className='top-4b-bot-1b'>✦</span>
                <span className='top-4c-bot1c'></span>
              </div>

              <div id="bot-2">
                <span id="bot-2a"></span>
                <span id="bot-2b">✦</span>
              </div>


               <div className='top-2-bot-3'>
                <span className='bar'></span>
                <span className='star'>✦</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
