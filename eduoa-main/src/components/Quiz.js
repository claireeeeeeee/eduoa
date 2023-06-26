import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import root from '../root'

export default function Quiz( {questionSet, email, qsetId} ) {
    
    function createQuestionData(qs) { // generate random answers
        let questionList = []
        for (let i in qs) {
            let q = qs[i]
            let a = parseInt(q.answer)
            let options
            if (isNaN(a)) {
                a = q.answer
                options = [
                    { answerText: a, isCorrect: true },
                    { answerText: `${a}A`, isCorrect: false },
                    { answerText: `${a}B`, isCorrect: false },
                    { answerText: `${a}C`, isCorrect: false }
                ]
            } else {
                options = [
                    { answerText: a, isCorrect: true }
                ]
                for (let i=0; i<3; i++) {
                    if (Math.random() < 0.5) {
                        options.push({ answerText: a + Math.ceil(Math.random() * 10), isCorrect: false })
                    } else {
                        options.push({ answerText: a + Math.floor(Math.random() * (-10)), isCorrect: false })
                    }
                }
            }
            let randomizedOptions = []
            for (let i=0; i<4; i++) {
                let n = Math.floor(Math.random() * (4 - i))
                randomizedOptions.push(options[n])
                options.splice(n, 1)
            }
            questionList.push({
                questionText: `${q.question}`,
                answerOptions: randomizedOptions
            })
        }
        return questionList
    }
    
    function getPercentage(s) {
        let parts = s.split("/")
        return (parseFloat(parts[0]) / parseFloat(parts[1]) * 100).toFixed(2)
    }

    const questions = createQuestionData(questionSet.questions)

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [newModule, setNewModule] = useState(false)
    const answerBotton = (isCorrect) => {
        if (isCorrect === true) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    if (questions.length === 0) {
        return (
            <div key={questionSet.id}>
                <p className="card">This question set is empty, please contact your supervisor.</p>
                <Link to="/app">
                    <p className="card">Learning Tree</p>
                </Link>
            </div>
        )
    }

    if (showScore) {
        fetch(root + "/AddMark", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studentEmail":`${email}`,
                "quiz_id":`${qsetId}`,
                "result":`${score}/${questions.length}`
            })
        })
    }

    if ((score / questions.length) > 0.8) {
        fetch(root + `/GetMarkByStudentEmail/${email}`)
        .then(res => res.json())
        .then(marks => {
            let passedQuizzes = [qsetId]
            for (let k in marks) {
                let mark = marks[k]
                if ((getPercentage(mark.result) > 0.8) && (!(mark.quiz_id in passedQuizzes))) {
                    passedQuizzes.push(mark.quiz_id)
                }
            }
            fetch(root + "/GetAllModules")
            .then(res => res.json())
            .then(data => {
                for (let i in data) {
                    let m = data[i]
                    let quizzes = m.quizs
                    let pass = true
                    if (m.quizs.length === 0) {
                        pass = false
                    }
                    for (let j in quizzes) {
                        if (passedQuizzes.every(p => parseInt(p) !== quizzes[j].id)) {
                            pass = false
                        }
                    }
                    if (pass) {
                        fetch(root + `/GetNextModuleByCurrentId/${m.id}`)
                        .then(res => res.json())
                        .then(data => {
                            let nextModuleIds = []
                            for (let i in data) {
                                let link = data[i]
                                if (!(link.nextModule_Id in nextModuleIds)) {
                                    nextModuleIds.push(link.nextModule_Id)
                                }
                            }
                            return nextModuleIds
                        }).then(nextModuleIds => {
                            for (let i in nextModuleIds) {
                                fetch(root + "/AddProgress", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type":"application/json"
                                    },
                                    body: JSON.stringify({
                                        "studentEmail":`${email}`,
                                        "module_id":nextModuleIds[i]
                                    })
                                })
                                setNewModule(true)
                            }
                        })
                    }
                }
            })
        })
    }

    return (
        <div className="quiz" key={questionSet.id}>
            {showScore ? (
                <div className="swap-views" id="exit-learning">
                    <h3 className="card">
                        Your result is {score}/{questions.length} ({(parseFloat(score) / parseFloat(questions.length) * 100).toFixed(2)}%). {score/questions.length > 0.6 ? "Good job!" : "Try again!"}
                    </h3>
                    {newModule ? <p>New module unlocked. Refresh the app for access.</p> : <></>}
                    <Link to="/app" className="link">
                        <button className="button-details">Exit to Learning Tree</button>
                    </Link>
                </div>
            ) : (
                <div className="question">
                    <div className="questionNumber">
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className="questionText">
                        {questions[currentQuestion].questionText}
                    </div>
                    <div className="answer">
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button
                                key={index}
                                className="quizButton"
                                onClick={() => answerBotton(answerOption.isCorrect)}
                            >
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                    <div className="exitQuiz">
                        <Link to="/app">
                            <button className="exitButton">Exit to Evaluation</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
    
