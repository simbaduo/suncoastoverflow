import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Answer from '../components/Answer'
import Question from '../components/Question'
import apiServer from '../apiServer'

const SearchPage = props => {
  const [questionData, setQuestionData] = useState()

  // prettier-ignore
  const getSearchResults = async () => {
    const resp = await axios.get(`${apiServer}/api/Search/${props.match.params.SearchTerm}`)
    // const resp = await axios.get(`${apiServer}/api/Search/${props.searchTerm}`)
    if (resp.status !== 200) {
      return
    }
    console.log(`Successfully retrieved ${resp.data.length} question(s) from database based on search term ${props.searchTerm}`)
    setQuestionData(resp.data) //putting response from API in the questionData hook
  }

  // load all questions on page load.
  useEffect(() => {
    getSearchResults()
  }, [props.match.params.SearchTerm])

  return (
    <>
      {questionData && (
        <ul className="questionsList">
          {questionData.map(q => {
            return (
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
            )
          })}
        </ul>
      )}
    </>
  )
}

export default SearchPage
