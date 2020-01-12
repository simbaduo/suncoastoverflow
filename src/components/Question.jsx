import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const upV = <FontAwesomeIcon className="upIcon" icon={faCaretUp} />
const dnV = <FontAwesomeIcon className="downIcon" icon={faCaretDown} />

const Question = q => {
  // prettier-ignore
  return (
    <div className="browseContainer"> 
      <section className="voteBox">
         <section className="item-height">
           {q.displayQuestionUpDownVote && (<button className="vote voteArrow upVote" id={q.id} name="qUpVote" onClick={q.handleVoteChange}>{upV}</button>)}
            <p key="-1" className="vote voteNum">{q.voteValue}</p>
            <p key="-2" className="vote voteWord">votes</p>
            {q.displayQuestionUpDownVote && (<button className="vote voteArrow downVote" id={q.id} name="qDnVote" onClick={q.handleVoteChange}>{dnV}</button>)}
         </section>
          {q.displayAnswerCount && 
          (<section className="item-height">
            <p key="-3" className="vote answerNum">{q.answersCount}</p>
            <p key="-4" className="vote answerWord">answers</p>
          </section>)}
      </section>
      <section className="questionBox">
        {q.displayQuestionUpDownVote ? (
          <h2 className="questionTitle">{q.questionTitle}</h2>
          ) :
          <Link to={`/Single/${q.id}`}><h2 className="questionTitle">{q.questionTitle}</h2></Link>
        }
          <p className="questionText">{q.questionText}</p>
      </section>
    </div>
  )
}

export default Question
