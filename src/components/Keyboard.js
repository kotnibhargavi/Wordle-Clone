const Keyboard = ({ onKeyPress, usedLetters }) => {
  const rows = ["QWERTYUIOP".split(""), "ASDFGHJKL".split(""), ["Enter", ..."ZXCVBNM".split(""), "Backspace"]]

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => (
            <button key={key} onClick={() => onKeyPress(key)} className={`key ${usedLetters[key] || ""}`}>
              {key === "Backspace" ? "←" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

