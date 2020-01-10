import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const upV = <FontAwesomeIcon icon={faCaretUp} />
const dnV = <FontAwesomeIcon icon={faCaretDown} />

const Question = q => {
  // prettier-ignore
  return (
    <div className="browseContainer">
      <section className="voteBox">
         <section className="item-height">
           {q.displayQuestionUpDownVote && (<p className="vote voteArrow upVote">{upV}</p>)}
            <p key="-1" className="vote voteNum">{q.voteValue}</p>
            <p key="-2" className="vote voteWord">votes</p>
            {q.displayQuestionUpDownVote && (<p className="vote voteArrow downVote">{dnV}</p>)}
         </section>
          {q.displayAnswerCount && 
          (<section className="item-height">
            <p key="-3" className="vote answerNum">{q.answersCount}</p>
            <p key="-4" className="vote answerWord">answers</p>
          </section>)}
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
