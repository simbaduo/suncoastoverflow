import React from 'react'
import axios from 'axios'

const Page2 = () => {
  return (
    <>
      <div className="askContainer">
        <p className="askInstructions">Ask a public question</p>
        <div className="askBox">
          <h2 className="askTitle">Title</h2>
          <p className="askTitleInstructions">Be specific and imagine you're asking a question to another person</p>
          <input className="askTitleInput" type="text"></input>
          <h2 className="askBody">Body</h2>
          <p className="askBodyInstructions">Include all the information someone would need to answer your question</p>
          <textarea className="askBodyInput" type="text" cols="156" rows="15"></textarea>
        </div>
        <button className="askButton" type="submit">
          Post your question
        </button>
      </div>
    </>
  )
}

export default Page2
