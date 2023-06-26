import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import root from '../root'

export default function Grades( {studentEmail, admin} ) {

    const [grades, setGrades] = useState(undefined)
    const [ready, setReady] = useState(false)
    const history = useHistory()

    let link
    if (admin) {
        link = "qset"
    } else {
        link = "quiz"
    }

    function getPercentage(s) {
        let parts = s.split("/")
        return (parseFloat(parts[0]) / parseFloat(parts[1]) * 100).toFixed(2)
    }

    function getGrades() {
        fetch(`${root}/GetMarkByStudentEmail/${studentEmail}`)
        .then(res => res.json())
        .then(data => {
            setGrades(data)
        })
    }

    function linkToPage(id) {
        history.push(`/${link}/${id}`)
    }

    useEffect(() => {
        getGrades()
    }, [])

    useEffect(() => {
        if (grades !== undefined) {
            setReady(true)
        }
    }, [grades])

    if (ready) {
        return (
            <div className="info-bottom">
                <p className='text-label'>Gradebook:</p>
                <table className="kpTable">
                    <thead>
                        <tr>
                            <th>Quiz No.</th>
                            <th>Grade</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade, index) => {
                            return (
                                <tr key={index}>
                                    <td><button onClick={() => linkToPage(grade.quiz_id)}>{grade.quiz_id}</button></td>
                                    <td>{grade.result}</td>
                                    <td>{getPercentage(grade.result)}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return <></>
    }
}
