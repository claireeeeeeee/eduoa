import React from 'react'
import UserDatabaseItem from './UserDatabaseItem'

export default function UserDatabaseComponent( {database, toggleComment, showComments, addComment} ) {

    if (database.length === 0) {
        return <h1 className="card">No users to show.</h1>
    }

    return (
        <>
            {database.map((user, index) => (
                <UserDatabaseItem
                    key = {index}
                    id = {index}
                    user = {user}
                    toggleComment = {toggleComment}
                    showComments={showComments}
                    addComment={addComment}
                />
            ))}
        </>
    )
}
