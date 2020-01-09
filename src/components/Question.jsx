import React from 'react'
import { Link } from 'react-router-dom'

const Question = q => {
  // prettier-ignore
  return (
    <div className="browseContainer">
      <section className="voteBox">
        <li key="-1" className="numVote">{q.voteValue}</li>
        <li key="-2" className="voteWord">votes</li>
        <li key="-3" className="numVote">{q.answersCount}</li>
        <li key="-4" className="voteWord">answers</li>
      </section>
      <section className="questionBox">
        <li key={q.id}>
          <Link to={`/Single/${q.id}`}>
            <h2>{q.questionTitle}</h2>
          </Link>
          <h3>{q.questionText}</h3>
          {/* <Answer answers={q.answers} /> */}
        </li>
        <hr className="greyBar"></hr>
      </section>
    </div>
  )
}

export default Question
