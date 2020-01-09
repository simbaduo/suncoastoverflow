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
          <div className="questionTitle">{q.questionTitle}</div>
          <div className="questionText">{q.questionText}</div>
          {/* <Answer answers={q.answers} /> */}
        </li>
        <hr className="greyBar"></hr>
      </section>
    </div>
  )
}

export default Question
