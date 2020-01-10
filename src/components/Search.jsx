import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const upV = <FontAwesomeIcon icon={faCaretUp} />
const dnV = <FontAwesomeIcon icon={faCaretDown} />

const Search = s => {
  return (
    <div className="browseContainer">
      <section className="voteBox">
        <section className="item-height">
          {s.displayQuestionUpDownVote && (
            <button className="vote voteArrow upVote" id={s.id} name="qUpVote" onClick={s.handleVoteChange}>
              {upV}
            </button>
          )}
          <p key="-1" className="vote voteNum">
            {s.voteValue}
          </p>
          <p key="-2" className="vote voteWord">
            votes
          </p>
          {s.displayQuestionUpDownVote && (
            <button className="vote voteArrow downVote" id={s.id} name="qDnVote" onClick={s.handleVoteChange}>
              {dnV}
            </button>
          )}
        </section>
        {s.displayAnswerCount && (
          <section className="item-height">
            <p key="-3" className="vote answerNum">
              {s.answersCount}
            </p>
            <p key="-4" className="vote answerWord">
              answers
            </p>
          </section>
        )}
      </section>
      <section className="questionBox">
        {s.displayQuestionUpDownVote ? (
          <h2 className="questionTitle">{s.questionTitle}</h2>
        ) : (
          <Link to={`/Single/${s.id}`}>
            <h2 className="questionTitle">{s.questionTitle}</h2>
          </Link>
        )}
        <h3 className="questionText">{s.questionText}</h3>
      </section>
    </div>
  )
}

export default Search
