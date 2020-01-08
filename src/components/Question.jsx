import React from 'react'

const Question = q => {
  return (
    <div className="browseContainer">
      <section className="voteBox">
        <li className="numVote">8</li>
        <li className="voteWord">votes</li>
        <li className="numVote">5</li>
        <li className="voteWord">answers</li>
      </section>
      <section className="questionBox">
        <li key={q.id}>
          <h2>{q.questionTitle}</h2>
          <h3>{q.questionText}</h3>
          {/* <Answer answers={q.answers} /> */}
        </li>
      </section>
    </div>
  )
}

export default Question
