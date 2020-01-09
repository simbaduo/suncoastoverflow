import React from 'react'

const Answer = props => {
  return (
    <div className="answerContainer">
      <section className="voteBox">
        <li key="-1" className="numVote">
          {props.voteValue}
        </li>
        <li key="-2" className="voteWord">
          votes
        </li>
      </section>
      <section className="answerBox">
        <li key={props.id}>{props.answerText}</li>
      </section>
    </div>
  )
}

export default Answer
