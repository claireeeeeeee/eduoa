import React from 'react'
import { Link } from 'react-router-dom'

export default function UserDatabaseItem( {id, user, toggleComment, showComments, addComment} ) {

    function onChange(e) {
        comment = e.target.value
    }

    function submitComment() {
        addComment(comment, user)
        toggleComment(id)
    }

    let comment = ""

    return (
        <div className='database-item'>
            <img className='img-small' src={process.env.PUBLIC_URL + '/profile.png'} alt='Profile'></img>
            <p style={{fontSize: 'x-large'}}>{user.name}</p>
            <div className='student-profile-panel'>
                <Link to={`/user/${user.name}`}>
                    <img className='img-button' src={process.env.PUBLIC_URL + '/stats.png'} alt='Statstics'></img>
                </Link>
                <img className='img-button' src={process.env.PUBLIC_URL + '/chat.jpg'} alt='Chat' onClick={() => toggleComment(id)}></img>
                <img className='img-button' src={process.env.PUBLIC_URL + '/more.png'} alt='More'></img>
            </div>
            {showComments[id] &&
            <div>
                <input onChange={onChange} />
                <div>
                    <button className="button-comment" onClick={submitComment}>Comment</button>
                </div>
                <Link to={`/comments/${user.name}`}>
                    <button className="button-comment">Comment Log</button>
                </Link>
            </div>}
        </div>
    )
}
