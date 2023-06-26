import React from 'react'

export default function Comments( {name, commentList} ) {
    if (commentList.length === 0) {
        return <h1 className="card">No comments to show.</h1>
    }
    commentList = commentList.reverse()
    return (
        <div className="comments">
            {commentList.map((comment, index) => {
                if (comment.teacher_Sender === comment.studuent_Receiver) {
                    return <div key={index}></div>
                }
                if (comment.teacher_Sender === name) {
                    return (
                        <div className="comment-left" key={index}>
                            <h1>{comment.text}</h1>
                            <p>Sent by {name} at {comment.date_Time}</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="comment-right" key={index}>
                            <h1>{comment.text}</h1>
                            <p>Sent by you at {comment.date_Time}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}
