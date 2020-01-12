import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Answer from '../components/Answer'
import Question from '../components/Question'
import apiServer from '../apiServer'

const BrowsePage = () => {
  const [questionData, setQuestionData] = useState()

  const getAllQuestions = async () => {
    const resp = await axios.get(`${apiServer}/api/Question`)

    if (resp.status !== 200) {
      return
    }

    setQuestionData(resp.data) //putting response from API in the questionData hook
  }

  useEffect(() => {
    getAllQuestions()
  }, [])
  //load all questions on page load.

  return (
    <>
      <div className="browseBox">
        <p className="browseTitle">All Questions</p>

        {questionData && (
          <ul className="questionsList">
            {questionData.map(q => {
              return (
                <>
                  <Question
                    key={q.id}
                    id={q.id}
                    questionTitle={q.questionTitle}
                    questionText={q.questionText}
                    voteValue={q.voteValue}
                    answersCount={q.answers.length}
                    displayAnswerCount={true}
                    displayQuestionUpDownVote={false}
                    displayAnswerUpDownVote={false}
                  />
                </>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default BrowsePage
