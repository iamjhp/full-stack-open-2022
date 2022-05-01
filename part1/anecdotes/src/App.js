import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const DisplayVote = (props) => {
  return (
    <div>
      has {props.vote} votes
    </div>
  )
}

const Title = ({text}) => {
  return (
    <h1>
      {text}
    </h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const initialVotes = [0, 0, 0, 0, 0, 0, 0, 0] // index = 7 is for the frequently voted index of the anecdote
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
  }

  const setIndexOfMostVotedAnecdote = (updatedVotes) => {
    let max = -1
    let id = -1

    for (let i = 0; i < 7; i++) {
      if (updatedVotes[i] >= max) {
        max = updatedVotes[i]
        id = i
      }
    }
    updatedVotes[7] = id
  }

  const handleClick = () => {
    let randomNum = getRandomNumber(anecdotes.length)

    while (randomNum === selected) {
      randomNum = getRandomNumber(anecdotes.length)
    }

    setSelected(randomNum)
  }

  const increaseVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected]++
    setIndexOfMostVotedAnecdote(updatedVotes)
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Title text='Anecdote of the day'/>
      {anecdotes[selected]}
      <DisplayVote vote={votes[selected]}/>
      <div>
        <Button text='vote' onClick={increaseVote}/>
        <Button text='next anecdote' onClick={handleClick}/>
      </div>
      <Title text='Anecdote with most votes'/>
      {anecdotes[votes[7]]}
      <DisplayVote vote={votes[votes[7]]}/>
    </div>
  )
}

export default App