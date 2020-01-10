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
    const apiKey = `${apiServer}/api/Question/${props.match.params.id}`
    console.log(`Submitting GET request to: ${apiKey}`)
    const resp = await axios.get(apiKey)
    if (resp.status !== 200) return
    console.log(resp.data)
    setQuestionData(resp.data)
  }

  useEffect(() => {
    getSingleQuestion()
  }, [])

  // prettier-ignore
  const setNewVoteValue = async (answerOrQuestion, indexOrId, deltaValue) => {
    const obj = {}
    let endPointId

    switch (answerOrQuestion) {
      case 'Question':
        obj.id = indexOrId
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
          prev.answers[indexOrId].voteValue += deltaValue
          return { ...prev }}) 
        //, [prev.answers[indexOrId].voteValue]: prev.answers[indexOrId].voteValue + deltaValue} })
        console.log(`Would now have updated ${answerOrQuestion} as follows:`)
        console.dir(obj)
        endPointId = questionData.answers[indexOrId].id
        break
      default:
        break
    }
       
    // console.log(`Would now have updated ${answerOrQuestion} as follows:`)
    // console.dir(obj)

    //Update the Question or Answer with the new vote value in the database via the API
    const apiReq = `${apiServer}/api/${answerOrQuestion}/${endPointId}`
    console.log('Sending PUT request to: ' + apiReq)
    const resp = await axios.put(apiReq, obj)
    if (resp.status !== 200) return
    console.dir(resp.data)
  }

  useEffect(() => {
    console.log('questionData:')
    console.dir(questionData)
  }, [questionData])

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
        // Find the array index of the element in the answers array to be updated
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
    setNewVoteValue(qOrA,Number(indexOrId),deltaValue)
  }

  const handleFormSubmission = async e => {
    e.preventDefault()
    const apiReq = `${apiServer}/api/Answer`
    const resp = axios.post(apiReq, { questionId: questionData.id, answerText: newAnswer, voteValue: 0 })
    if (resp.status !== 200) return
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
