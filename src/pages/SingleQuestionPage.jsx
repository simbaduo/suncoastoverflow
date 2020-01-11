import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Answer from '../components/Answer'
import Question from '../components/Question'
import apiServer from '../apiServer'

const SingleQuestionPage = props => {
  const [questionData, setQuestionData] = useState()
  const [newAnswer, setNewAnswer] = useState()

  const getSingleQuestion = async () => {
    if (typeof props.match.params.id === 'undefined') return
    const apiReq = `${apiServer}/api/Question/${props.match.params.id}`
    console.log(`Submitting GET request to: ${apiReq}`)
    const resp = await axios.get(apiReq)
    if (resp.status !== 200) {
      console.log(`Error: ${resp.status}`)
      return
    }
    setQuestionData(resp.data)
  }

  useEffect(() => {
    getSingleQuestion()
  }, [])

  // Writes the updated/new vote value given the relative change (+1/-1) in {deltaValue}
  // to the screen and the database.
  // answerQuestion: ["Answer"|"Question"]
  //                 used for identifying whether a question's or answer's vote is being updated and
  //                 specifying the api endpoint URL
  //      indexOrId: integer
  //                 the id of the question (for answerOrQuestion=="Question")
  //                 the index of the element in the answers array for which to update voteValue (for answerOrQuestion=="Answer")
  //     deltaValue: (-1 or +1)
  //                 the value to add to the current voteValue
  // prettier-ignore
  const setNewVoteValue = async (answerOrQuestion, indexOrId, deltaValue) => {
    const obj = {}
    let endPointId

    switch (answerOrQuestion) {
      case 'Question':
        obj.id = indexOrId // could also use questionData.id
        obj.questionTitle = questionData.questionTitle
        obj.questionText = questionData.questionText
        obj.voteValue = questionData.voteValue + deltaValue
        endPointId = questionData.id
        setQuestionData(prev => {
          return { ...prev, voteValue: prev.voteValue + deltaValue }
        })
        break
      case 'Answer':
        obj.id = questionData.answers[indexOrId].id
        obj.questionId = questionData.id
        obj.answerText = questionData.answers[indexOrId].answerText
        obj.voteValue = questionData.answers[indexOrId].voteValue + deltaValue
        setQuestionData(prev => { 
          //, [prev.answers[indexOrId].voteValue]: prev.answers[indexOrId].voteValue + deltaValue} }) <-- this does not work, is syntactically incorrect
          prev.answers[indexOrId].voteValue += deltaValue
          return { ...prev }}) 
        console.log(`Would now have updated ${answerOrQuestion} as follows:`)
        console.dir(obj)
        endPointId = questionData.answers[indexOrId].id
        break
      default:
        break
    }
       
    // console.log(`Would now have updated ${answerOrQuestion} as follows:`)
    // console.dir(obj)

    // Update the Question or Answer with the new vote value in the database via the API
    const apiReq = `${apiServer}/api/${answerOrQuestion}/${endPointId}`
    console.log('Sending PUT request to: ' + apiReq)
    const resp = await axios.put(apiReq, obj)
    if (resp.status !== 200) return
    console.dir(resp.data)
  }

  // prettier-ignore
  const upDownVote = e => {
    e.persist()
    
    let qOrA
    let indexOrId
    let deltaValue
    
    console.log('Pressed ' + e.currentTarget.name + `(${e.currentTarget.id})`) // e.target.parentNode.tagName) // e.target.className.baseVal)

    qOrA = e.currentTarget.name.substring(0,1)
    switch (qOrA) {
      case 'q':
        qOrA = 'Question'
        indexOrId = e.currentTarget.id
        break
      case 'a':
        qOrA = 'Answer'
        // Find the array index in the answers array of the element to be updated
        indexOrId = questionData.answers.map(a => a.id.toString()).indexOf(e.currentTarget.id)
        break
      default:
        console.log(`Question/Answer ${qOrA} not identified`)
        return
        break
    }
    switch (e.currentTarget.name.substring(1,3)) {
      case 'Up':
        deltaValue = 1
        break
      case 'Dn':
        deltaValue = -1
        break
      default:
        console.log("Up/Down not identified")
        return
        break
    }
    // Call the function to update to the new vote value on screen and in the database (via an API call)
    setNewVoteValue(qOrA,Number(indexOrId),deltaValue)
  }

  // prettier-ignore
  const handleFormSubmission = async e => {
    e.preventDefault()
    const apiReq = `${apiServer}/api/Answer`
    const obj = { questionId: questionData.id, answerText: newAnswer, voteValue: 0 }
    console.log(`Now sending POST request to ${apiReq} and object:`)
    console.dir({obj})
    const resp = await axios.post(apiReq, obj)
    if (resp.status !== 200) {
      console.log(`Error: ${resp.status}`)
      return
    }
    // console.log(`Successfully written to database (status: ${resp.status}) and updated question data with newly added answer ${resp.data}`)
    // console.log('Now re-retrieving data from database')
    // re-retrieve the complete question data (with all answers) from the database
    getSingleQuestion()
    // Clear the New Answer text area
    setNewAnswer('')
  }

  // prettier-ignore
  return (
    <>
      {questionData && (
        <ul className="question">
          <Question
            key={questionData.id}
            id={questionData.id}
            questionTitle={questionData.questionTitle}
            questionText={questionData.questionText}
            voteValue={questionData.voteValue}
            answersCount={questionData.answers.length}
            displayAnswerCount={false}
            displayQuestionUpDownVote={true}
            handleVoteChange={upDownVote}
          />
          {questionData.answers && (
            <ul className="answerList">
              {questionData.answers.map(a => {
                return (
                  <Answer
                    key={a.id}
                    id={a.id}
                    answerText={a.answerText}
                    voteValue={a.voteValue}
                    displayAnswerUpDownVote={true}
                    handleVoteChange={upDownVote}
                  />
                )
              })}
            </ul>
          )}
          <ul>
            <section>Add Your Answer</section>
            <form>
              <textarea name="newAnswer" rows="10" cols="80" value={newAnswer} onChange={e => setNewAnswer(e.target.value)}></textarea>
              <br />
              <button onClick={handleFormSubmission}>Submit</button>
            </form>
          </ul>
        </ul>
      )}
    </>
  )
}

export default SingleQuestionPage
