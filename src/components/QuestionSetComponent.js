import React from 'react'
import QuestionSetItem from './QuestionSetItem'
import root from "../root"

export default function QuestionSetComponent( {questionSet} ) {
    function getFile(event) {
        let input = event.target
        let file = input.files[0]
        let failCount = 0
        let successCount = 0
        const reader = new FileReader()
        reader.onload = function(evt) {
            let text = evt.target.result
            let textParts = text.split("\r\n")
            for (let i in textParts) {
                let questionParts = textParts[i].split(",")
                if (questionParts.length !== 2) {
                    failCount++
                } else {
                    successCount++
                    fetch(root + "/AddQuestion", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "label": `${questionParts[0]}`,
                            "answer": `${questionParts[1]}`,
                            "quizId": questionSet.id
                        })
                    })
                }
            }
            alert(`Import Complete: ${successCount} ${successCount === 1 ? "question" : "questions"} successfully imported, ${failCount} ${failCount === 1 ? "question" : "questions"} failed to import. Refresh the page to see the changes.`)
        }
        reader.readAsText(file)
        for (let i in questionSet.questions) {
            fetch(root + `/DeleteQuestionByID/${questionSet.questions[i].id}`, {
                method: "POST"
            })
        }
    }
    
    return (
        <div className="database-question">
            <div className='info-label'>
                <p className='text-label'>Name:</p>
                <p className='text-label'>Difficulty:</p>
                <p className='text-label'>Length:</p>
            </div>
            <div className='info-details'>
                <p className='text-details'>{questionSet.name}</p>
                <p className='text-details'>{questionSet.difficulty}</p>
                <p className='text-details'>{questionSet.length}</p>
            </div>
            <p>ㅤ</p> {/*empty character placed*/}
            <div>
                <label id="label-input" for="input-file">Import Questions</label>
                <input id="input-file" type="file" onChange={(event) => {getFile(event)}} accept=".csv" />
                <p>Accepted format: CSV (Each line should be one question, with the question and the answer separated by a comma.)</p>
            </div>
            <table rules="all">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    {questionSet.questions.length === 0 ?
                    <></> :
                    questionSet.questions.map((question, index) => (
                        <QuestionSetItem
                            key = {index}
                            question = {question}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
