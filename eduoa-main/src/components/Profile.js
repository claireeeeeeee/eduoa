import React, { useState, useEffect } from 'react'
import Grades from './Grades'
import root from '../root'

class User {
    constructor(id, name, email='', phone='', bio='', admin=false) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.bio = bio
        this.admin = admin
    }
}

export default function Profile( {pendingUser, admin} ) {

    const [user, setUser] = useState(pendingUser)
    const [ready, setReady] = useState(false)

    if (typeof pendingUser === "string") {
        fetch(`${root}/GetProfile/${user}`)
        .then(res => res.json())
        .then(data => {
            let u
            if (data.hasOwnProperty("teacher_id")) {
                u = new User(data.teacher_id, `${data.firstName} ${data.lastName}`, data.email, data.phone, data.bio, true)
            } else {
                u = new User(data.student_id, `${data.firstName} ${data.lastName}`, data.email, data.phone, data.bio, false)
            }
            setUser(u)
        })
    }

    useEffect(() => {
        if (user instanceof User || user instanceof Object) {
            setReady(true)
        }
    }, [user])

    if (ready) {
        return (
            <>
                <div className='info info-left'>
                    <img className='img-profile' src={process.env.PUBLIC_URL + '/profile.png'} alt="Profile" />
                    <p className='text-details'>{(user.name === '') ? '‎' : `${user.name}`}</p> {/*empty character placed*/}
                </div>
                <div className='info info-right'>
                    <p className='text-details' style={{textAlign: 'center'}}>{(user.admin) ? 'Teacher' : 'Student'}</p>
                    <div className='info-label'>
                        <p className='text-label'>ID:</p>
                        <p className='text-label'>Email:</p>
                        <p className='text-label'>Phone:</p>
                    </div>
                    <div className='info-details'>
                        <p className='text-details'>{(isNaN(user.id)) ? '‎' : `${user.id}`}</p> {/*empty character placed*/}
                        <p className='text-details'>{(user.email === '') ? '‎' : `${user.email}`}</p> {/*empty character placed*/}
                        <p className='text-details'>{(user.phone === '') ? '‎' : `${user.phone}`}</p> {/*empty character placed*/}
                    </div>
                </div>
                <div className='info info-bottom'>
                    <p className='text-label'>Bio:</p>
                    <p className='text-details'>{(user.bio === '') ? '‎' : `${user.bio}`}</p> {/*empty character placed*/}
                </div>
                {(!(user.admin)) && <Grades studentEmail={user.email} admin={admin} />}
            </>
        )
    } else {
        return <h1 className="card">Loading...</h1>
    }
}
