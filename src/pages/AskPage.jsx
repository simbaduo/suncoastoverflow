import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiServer from '../apiServer'

const AskPage = () => {
  const [questionId, setQuestionId] = useState()
  const [newQuestion, setNewQuestion] = useState()

  const handleFormSubmission = async e => {
    e.preventDefault()
    const apiReq = `${apiServer}/api/Question`
    const obj = { ...newQuestion, voteValue: 0 }
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
    setQuestionId(resp.data.id)
    setNewQuestion('')
  }

  const handleFormUpdate = e => {
    e.persist()
    setNewQuestion(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  // prettier-ignore
  return (
    <>
      {questionId ? <Redirect to={`/Single/${questionId}`} /> : null}
      <div className="askContainer">
        <img className="askImage" src="./images/askimage.png" />
        <p className="askInstructions">Ask a public question</p>
        <div className="askBox">
          <h2 className="askTitle">Title</h2>
          <p className="askTitleInstructions">Be specific and imagine you're asking a question to another person</p>
          <input className="askTitleInput" type="text" name="questionTitle" onChange={handleFormUpdate}></input>
          <h2 className="askBody">Body</h2>
          <p className="askBodyInstructions">Include all the information someone would need to answer your question</p>
          <textarea className="askBodyInput" type="text" name="questionText" cols="156" rows="15" onChange={handleFormUpdate}></textarea>
        </div>
        <button className="askButton" type="submit" onClick={handleFormSubmission}>
          Post your question
        </button>
      </div>
    </>
  )
}

export default AskPage
