import React from 'react'

export default function QuestionSetItem( {question} ) {
    return (
        <tr>
            <td>{question.id}</td>
            <td>{question.question}</td>
            <td>{question.answer}</td>
        </tr>
    )
}
