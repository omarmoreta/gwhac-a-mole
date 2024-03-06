
import './App.css';
import React,  { useEffect, useState } from 'react';
import MoleHill from './MoleHill.jsx';

function App() {

  let [score, setScore] = useState(0)
  let [timeLeft, setTimeLeft] = useState()
  let [countDown, setCountDown] = useState()
  let [status, setStatus] = useState("Press Start to begin!")
  let [message, setMessage] = useState(["message-good", "placeholder good message"])
  let [gameState, setGameState] = useState("pregame")
  
  const gameMessages = [
    {time: 10, message: ["message-good", "Go whacky on them!"]},
    {time: 9, message: ["message-bad", "They're coming out of the guacamole!"]},
    {time: 6, message: ["message-bad", ""]},
    {time: 5, message: ["message-mid", "Halfway through!"]},
    {time: 3, message: ["message-bad", "Running out of time!"]},
  ]

  const missMessages = [
    "Guac but no mole!",
    "You suck!", 
    "There's no mole there!"
  ]

  const hitMessages = [
    "You are whack!",
    "Caught him dipping!", 
    "So whacky!",
  ]
  
  //start game
  // && trigger countdown with useeffect
  // && set game state countdown
  const startGame = () => {
    setScore(0)
    setCountDown(3)
    setGameState("countdown")
  }

 //countdown useeffect which ultimately triggers timeleft use effect
 //&& set game state active
  useEffect(() => {
    if (countDown > 0) {
      setStatus("Game starts in: " + countDown)
      intervalToZero(countDown, setCountDown)
    } else if (countDown <= 0) {
      setStatus("")
      setGameState("active")
      setTimeLeft(10)
    }
  }, [countDown])

  //timeleft use effect
  //&& set message
  //&& set game state
  useEffect(() => {
    if(timeLeft > 0) {
      intervalToZero(timeLeft, setTimeLeft)
    } else if (timeLeft <= 0) {
      endGame()
    }
    gameMessages.forEach(message => {
      if (timeLeft === message.time) {
        setMessage(message.message)
      }
    })
  }, [timeLeft])

const endGame = () => {
    setGameState("over")
    setStatus("Game Over! Final Score: " + score)
  }

  const intervalToZero = (time, setTime) => {
    let interval = setInterval(() => {
      if (time > 0) {
        time--
        setTime(time)
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }


  

  const createHills = () => {
    let hills = []
    for (let count = 0; count < 9; count++) {
      hills.push(<MoleHill
          key={count}
          setScore={setScore}
          score={score} 
          message={message}
          setMessage={setMessage}
          missMessages={missMessages}
          hitMessages={hitMessages}
          />)
    }
    return <div className='mole-hill-container'>{hills}</div>
  }

  return (
    <div className='App'>
      <h1>G<strong>whac</strong>-A-Mole</h1>
      <h2>{status}</h2>

      {gameState === "pregame" ?
        <button onClick={startGame} className='start-button'>Start</button>
        : null }

      {gameState === "active" ?
        <div className='game-container'>
        <div className='score-time-bar'>
          <h2>Score: {score}</h2>
          <h2>Time left: {timeLeft}</h2>
        </div>
        {createHills()}
        <h3 className={message[0]}>{message[1]}</h3>
      </div> : null } 


      
      {gameState === "over"
        ? 
        
        <button onClick={startGame} className='start-button'>Restart</button>
        :
        null
      }
    </div>
  )
}

export default App;
