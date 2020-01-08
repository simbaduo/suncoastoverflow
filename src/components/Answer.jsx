import React from 'react'

const Answer = props => {
  return (
    <ul className="answersList">
      {props.answers.map(a => {
        return <li key={a.id}>{a.answerText}</li>
      })}
    </ul>
  )
}

export default Answer
