import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Answer from '../components/Answer'
import Question from '../components/Question'
import apiServer from '../apiServer'

const SingleQuestionPage = props => {
  const [questionData, setQuestionData] = useState()
  const [questionVoteValue, setQuestionVoteValue] = useState()

  const getSingleQuestion = async () => {
    if (typeof props.match.params.id === 'undefined') return
    const apiKey = `${apiServer}/api/Question/${props.match.params.id}`
    console.log(`Submitting GET request to: ${apiKey}`)
    const resp = await axios.get(apiKey)
    if (resp.status !== 200) return
    // console.log(resp.data)
    setQuestionData(resp.data)
  }

  useEffect(() => {
    getSingleQuestion()
  }, [])

  const setSingleQuestion = () => {}

  const upDownVote = e => {
    e.persist()
    console.log('Pressed ' + e.currentTarget.name + `(${e.currentTarget.id})`) // e.target.parentNode.tagName) // e.target.className.baseVal)
    // console.dir(e.target)
  }

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
        </ul>
      )}
    </>
  )
}

export default SingleQuestionPage
