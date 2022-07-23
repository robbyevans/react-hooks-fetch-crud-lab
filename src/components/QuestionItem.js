function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
 
  const deleteQuestion = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
     .then(res => res.json())
     .then(item => onDelete(item))
  }

  const updateAnswer =  (event) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        correctIndex: event.target.value 
      })
    })
     .then(res => res.json())
     .then(item => onUpdate(item))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateAnswer}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;