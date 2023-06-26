import React from 'react'

export default function Panel( {admin, onClick} ) {
    if (admin) {
        return (
            <div className='button-panel-frame'>
                    <button className='button-panel' onClick={() => {onClick(1)}}>Manage Students</button>
                    <button className='button-panel' onClick={() => {onClick(2)}}>Manage Questions</button>
                    <button className='button-panel' onClick={() => {onClick(0)}}>Profile</button>
            </div>
        )
    } else {
        return (
            <div className='button-panel-frame'>
                    <button className='button-panel' onClick={() => {onClick(1)}}>Learning Tree</button>
                    <button className='button-panel' onClick={() => {onClick(2)}}>Contact Teachers</button>
                    <button className='button-panel' onClick={() => {onClick(0)}}>Profile</button>
            </div>
        )
    }
}
