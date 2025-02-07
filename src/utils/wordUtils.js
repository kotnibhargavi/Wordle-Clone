// List of valid 5-letter words
const wordList = ["REACT", "GAMES", "CLONE", "WORLD", "HELLO"]

export const getRandomWord = () => {
  return wordList[Math.floor(Math.random() * wordList.length)]
}

export const isValidWord = (word) => {
  return wordList.includes(word)
}

export const checkGuess = (guess, target) => {
  const result = new Array(5).fill("gray")
  const targetLetters = target.split("")

  // Check for correct letters in correct positions
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = "green"
      targetLetters[i] = null
    }
  }

  // Check for correct letters in wrong positions
  for (let i = 0; i < 5; i++) {
    if (result[i] === "gray" && targetLetters.includes(guess[i])) {
      result[i] = "yellow"
      targetLetters[targetLetters.indexOf(guess[i])] = null
    }
  }

  return result
}

