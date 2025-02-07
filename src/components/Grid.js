import Letter from "./Letter"

const Grid = ({ guesses, currentGuess, targetWord }) => {
  const emptyRows = 6 - guesses.length - (currentGuess ? 1 : 0)

  return (
    <div className="grid">
      {guesses.map((guess, i) => (
        <div key={i} className="row">
          {guess.guess.split("").map((letter, j) => (
            <Letter key={j} value={letter} status={guess.result[j]} />
          ))}
        </div>
      ))}
      {currentGuess && (
        <div className="row">
          {currentGuess.split("").map((letter, i) => (
            <Letter key={i} value={letter} status="active" />
          ))}
          {[...Array(5 - currentGuess.length)].map((_, i) => (
            <Letter key={i + currentGuess.length} value="" status="empty" />
          ))}
        </div>
      )}
      {[...Array(emptyRows)].map((_, i) => (
        <div key={i} className="row">
          {[...Array(5)].map((_, j) => (
            <Letter key={j} value="" status="empty" />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Grid

