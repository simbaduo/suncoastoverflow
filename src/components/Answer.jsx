import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const upV = <FontAwesomeIcon icon={faCaretUp} />
const dnV = <FontAwesomeIcon icon={faCaretDown} />

const Answer = props => {
  // prettier-ignore
  return (
    <div className="answerContainer">
      <section className="voteBox">
        <section className="item-height">
          {props.displayAnswerUpDownVote && (<button className="vote voteArrow upVote" id={props.id} name="aUpVote" onClick={props.handleVoteChange}>{upV}</button>)}
          <p key="-1" className="vote voteNum">{props.voteValue}</p>
          <p key="-2" className="vote voteWord">votes</p>
          {props.displayAnswerUpDownVote && (<button className="vote voteArrow downVote" id={props.id} name="aDnVote" onClick={props.handleVoteChange}>{dnV}</button>)}
        </section>
      </section>
      <section className="answerBox">
        <p key={props.id}>{props.answerText}</p>
      </section>
    </div>
  )
}

export default Answer
