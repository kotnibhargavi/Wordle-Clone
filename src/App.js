"use client"

import { useState, useEffect, useCallback } from "react"
import Grid from "./components/Grid"
import Keyboard from "./components/Keyboard"
import Message from "./components/Message"
import { getRandomWord, isValidWord, checkGuess } from "./utils/wordUtils"
import "./App.css"

function App() {
  const [targetWord, setTargetWord] = useState("")
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameStatus, setGameStatus] = useState("playing") // 'playing', 'won', 'lost'
  const [message, setMessage] = useState("Guess the word!")
  const [usedLetters, setUsedLetters] = useState({})
  const [showInitialMessage, setShowInitialMessage] = useState(true);
// New state for initial message

useEffect(() => {
  const timer = setTimeout(() => {
    setShowInitialMessage(false);
  }, 3000); // Message disappears after 3 seconds

  return () => clearTimeout(timer); // Cleanup
}, []);


  const handleKeyPress = useCallback(
    (key) => {
      if (gameStatus !== "playing") return

      if (key === "Enter") {
        if (currentGuess.length !== 5) {
          setMessage("Word must be 5 letters long")
          return
        }
        if (!isValidWord(currentGuess)) {
          setMessage("Not a valid word")
          return
        }
        const result = checkGuess(currentGuess, targetWord)
        const newGuesses = [...guesses, { guess: currentGuess, result }]
        setGuesses(newGuesses)
        setCurrentGuess("")

        // Update used letters
        const newUsedLetters = { ...usedLetters }
        currentGuess.split("").forEach((letter, index) => {
          if (!newUsedLetters[letter] || result[index] === "green") {
            newUsedLetters[letter] = result[index]
          }
        })
        setUsedLetters(newUsedLetters)

        if (currentGuess === targetWord) {
          setGameStatus("won")
          setMessage("Congratulations! You won!")
        } else if (newGuesses.length === 6) {
          setGameStatus("lost")
          setMessage(`Game over! The word was ${targetWord}`)
        }
      } else if (key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1))
      } else if (currentGuess.length < 5 && key.match(/^[A-Z]$/)) {
        setCurrentGuess(currentGuess + key)
      }
    },
    [currentGuess, gameStatus, guesses, targetWord, usedLetters]
  )

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      handleKeyPress(event.key.toUpperCase())
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyPress])

  const resetGame = () => {
    setTargetWord(getRandomWord())
    setGuesses([])
    setCurrentGuess("")
    setGameStatus("playing")
    setMessage("Guess the word!")
    setUsedLetters({})
    setShowInitialMessage(true)

    // Hide the initial message after 3 seconds again
    setTimeout(() => {
      setShowInitialMessage(false)
    }, 3000)
  }

  return (
    <div className="App">
      <h1>Wordle Clone</h1>

      {showInitialMessage && <div className="message">Guess the word!</div>}


      <Grid guesses={guesses} currentGuess={currentGuess} targetWord={targetWord} />
      <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />
      {message && !showInitialMessage && <Message type={gameStatus} message={message} />}
      
      {gameStatus !== "playing" && (
        <button className="new-game-btn" onClick={resetGame}>
          New Game
        </button>
      )}
    </div>
  )
}

export default App
