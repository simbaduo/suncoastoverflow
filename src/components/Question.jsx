import React from 'react'
import { Link } from 'react-router-dom'

const Question = q => {
  // prettier-ignore
  return (
    <div className="browseContainer">
      <section className="voteBox">
         <section className="item-height">
            <p key="-1" className="voteNum">{q.voteValue}</p>
            <p key="-2" className="voteWord">votes</p>
         </section>
          <section className="item-height">
            <p key="-3" className="answerNum">{q.answersCount}</p>
            <p key="-4" className="answerWord">answers</p>
          </section>
      </section>
      <section className="questionBox">
          <Link to={`/Single/${q.id}`}>
            <h2 className="questionTitle">{q.questionTitle}</h2>
          </Link>
          <h3 className="questionText">{q.questionText}</h3>
      </section>
    </div>
  )
}

export default Question
