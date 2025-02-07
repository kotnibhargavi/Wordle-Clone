const Letter = ({ value, status }) => {
    return <div className={`letter ${status}`}>{value}</div>
  }
  
  export default Letter
  
  