import { useState, useEffect } from 'react';
import Questions from './Components/Questions';
import styles from './app.module.css';
import Results from './Components/Results';
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchQuestions = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        if(data?.results?.length > 0) setQuestions(data.results);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

  fetchQuestions();

  const handleQuestionAnswered = (answer, isCorrect, correctAnswer) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setIsCompleted(currentQuestion === questions.length - 1);
    setSelectedAnswer([...selectedAnswer, { answer, isCorrect, correctAnswer }]);
  }

  return (
    <main className={styles.container}>
      <div>
        {
          isCompleted ? (
            <div>
              <Results selectedAnswer={selectedAnswer} score={score} questions={questions} />
            </div>
          ) : (
            questions.length > 0 ? <div>
              <Questions
              question={questions[currentQuestion]}
              onQuestionAnswered={handleQuestionAnswered}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
            />
            </div> : <h1>Loading...</h1>
          )
        }
      </div>
    </main>
  )
}

export default App