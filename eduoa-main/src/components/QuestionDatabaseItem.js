import React from 'react'
import { Link } from 'react-router-dom'

export default function QuestionDatabaseItem( {questionSet} ) {

    let extraLine = false
    if (questionSet.name.length <= 18) {
        extraLine = true
    }

    return (
        <div className='database-item'>
            <img className="img-small" src={process.env.PUBLIC_URL + '/calculator.png'} alt='Item' />
            <p style={{fontSize: 'x-large'}}>{questionSet.name}</p>
            {extraLine ? <p style={{fontSize: '11pt'}}>‎</p> : <></>} {/*empty character placed*/}
            <p>{questionSet.difficulty}</p>
            <p>{questionSet.length} {(questionSet.length === 1) ? 'Question' : 'Questions'}</p>
            <Link to={`/qset/${questionSet.id}`}>
                <button className="button-details">Details</button>
            </Link>
        </div>
    )
}
