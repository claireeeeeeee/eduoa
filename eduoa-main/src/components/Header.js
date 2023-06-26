import React from 'react'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router'

export default function Header() {

    // const history = useHistory()

    // function logout() {
    //     history.push("/index")
    // }

    return (
        <div className='header'>
            <Link to={'/app'}>
                <img className='logo' src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
            </Link>
            {/* <div className='header-frame'>
                <p style={{fontSize: 'x-small'}}>‎</p> empty character placed
                <button className='button-header' onClick={logout}>Log Out</button>
            </div> */}
        </div>
    )
}
