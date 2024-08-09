import React from 'react';
import styles from './questions.module.css';
export default function Questions({question, onQuestionAnswered, currentQuestion, totalQuestions}) { 
  return (
        <div>
            <div>
                <h1 dangerouslySetInnerHTML={{__html: question.question}}></h1>
                <i className={styles.questionNumber}>{currentQuestion + 1} of {totalQuestions}</i>
            </div>
            <ul className={styles.optionList}>
                {[question.correct_answer, ...question.incorrect_answers].map((answer, index) => (
                    <li key={index}>
                        <button 
                            onClick={() => onQuestionAnswered(answer, question.correct_answer === answer, question.correct_answer)}
                            className={styles.optionButton}
                            dangerouslySetInnerHTML={{__html: answer}}
                            />
                    </li>
                ))}
            </ul>
        </div>
    )
}