import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Answer from '../components/Answer'
import Question from '../components/Question'

const Page = () => {
  const [questionData, setQuestionData] = useState()

  const getAllQuestions = async () => {
    const resp = await axios.get('https://localhost:5001/api/Question')

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
      {questionData && (
        <ul className="questionsList">
          {questionData.map(q => {
            return (
              <>
                <Question
                  id={q.id}
                  questionTitle={q.questionTitle}
                  questionText={q.questionText}
                />
              </>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Page
