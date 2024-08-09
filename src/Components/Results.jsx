import styles from './results.module.css';
export default function Results({ selectedAnswer, score, questions }) {
    return (
        <div>
            <div>
                <h1>Your Score is {score} out of {selectedAnswer.length}</h1>
                <button className={styles.playAgain} onClick={() => window.location.reload()}>Play Again</button>
            </div>
            <ul>
                {selectedAnswer.map((answer, index) => (
                    <li key={index}>
                        <h3 dangerouslySetInnerHTML={{ __html: questions[index].question }}></h3>
                        <p>Your Answer: {answer.answer}</p>
                        <p>Correct Answer: {answer.correctAnswer}</p>
                        <p className={answer.isCorrect ? styles.correct : styles.incorrect}>{answer.isCorrect ? 'Correct' : 'Incorrect'}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}