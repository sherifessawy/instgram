import React, { useState, useContext } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Timeline from '../components/timeline'
import {LOGIN, SIGN_UP, DASHBOARD} from '../constanst/routes'
import {FirebaseContext} from '../context/firebase'
import {getAuth, signOut} from 'firebase/auth'
import {Link} from 'react-router-dom'

function Dashboard() {
    const [user, setUser] = useState({displayName: 'dali'})
    const {firebaseApp} = useContext(FirebaseContext)
    const auth = getAuth(firebaseApp)

    return (
        <div className="bg-gray-100">
            <Header>
                {user ? (
                    <div className="flex items-center cursor-pointer">
                        <Link to={DASHBOARD} arial-label="Home">
                            <svg
                                className="w-8 mr-6 text-black-light cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </Link>
                        <button 
                            onClick={() => signOut(auth).then(() => setUser(null))} 
                            className='font-bold'
                        >Sign Out</button>
                        <div>
                            <Link to={`/p/${user.displayName}`}>
                                <img
                                    className="rounded-full h-8 w-8 flex ml-6 mr-12"
                                    src={`/images/avatars/${user.displayName}.jpg`}
                                    alt={`${user.displayName} profile picture`}
                                />
                            </Link>
                        </div>
                    </div> 
                ) : (
                    <div>
                        <Header.Button to={LOGIN} bg='#038cfc' color='white' >Log In</Header.Button>
                        <Header.Button to={SIGN_UP}>Sign Up</Header.Button>
                    </div>
                )}
            </Header>
            <div className="grid grid-cols-3 gap-4 justify-items-center max-w-screen-lg">
                <Timeline className="col-start-1 col-end-3"/>
                <Sidebar />
            </div>
        </div>
    )
}

export default Dashboard
