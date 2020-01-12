import React, { useState } from 'react'
import axios from 'axios'
import apiServer from '../apiServer'

const AskPage = () => {
  const [questionData, setQuestionData] = useState()
  const [newQuestion, setNewQuestion] = useState()

  const handleFormSubmission = async e => {
    e.preventDefault()
    const apiReq = `${apiServer}/api/Question`
    const obj = { questionId: questionData.id, questionText: newQuestion, voteValue: 0 }
    console.log(`Now sending POST request to ${apiReq} and object:`)
    console.dir({ obj })
    const resp = await axios.post(apiReq, obj)
    if (resp.status !== 200) {
      console.log(`Error: ${resp.status}`)
      return
    }
    // console.log(`Successfully written to database (status: ${resp.status}) and updated question data with newly added answer ${resp.data}`)
    // console.log('Now re-retrieving data from database')
    // re-retrieve the complete question data (with all answers) from the database
    // getSingleQuestion()
    // Clear the New Answer text area
    setNewQuestion('')
  }

  return (
    <>
      <div className="askContainer">
        <img className="askImage" src="./images/askimage.png" />
        <p className="askInstructions">Ask a public question</p>
        <div className="askBox">
          <h2 className="askTitle">Title</h2>
          <p className="askTitleInstructions">Be specific and imagine you're asking a question to another person</p>
          <input className="askTitleInput" type="text"></input>
          <h2 className="askBody">Body</h2>
          <p className="askBodyInstructions">Include all the information someone would need to answer your question</p>
          <textarea className="askBodyInput" type="text" cols="156" rows="15"></textarea>
        </div>
        <button className="askButton" type="submit" onClick={handleFormSubmission}>
          Post your question
        </button>
      </div>
    </>
  )
}

export default AskPage
