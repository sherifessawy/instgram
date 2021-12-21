import React, {useContext} from 'react';
import { Logo, Content, Button } from './headerStyles'
import * as PAGES from '../../constants/routes'
import {FirebaseContext} from '../../context/firebase'
import {getAuth, signOut} from 'firebase/auth'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../context/user';

export default function Header({children, ...rest}) {
    const {user} = useContext(UserContext)
    const {firebaseApp} = useContext(FirebaseContext)
    const auth = getAuth(firebaseApp)
    const navigate = useNavigate()

    return (
        <Content {...rest} className="max-w-screen-lg mx-auto">
            <Logo to={PAGES.DASHBOARD}>
                <img src={'/images/logo.png'} />
            </Logo>
            {user ? (
                <div className="flex items-center cursor-pointer">
                    <Link to={PAGES.DASHBOARD} arial-label="Home">
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
                    <button onClick={() => {
                        signOut(auth)
                        navigate(PAGES.LOGIN)}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                    <div>
                        <Link to={`/p/${user.displayName}`}>
                            <img
                                className="rounded-full h-8 w-8 flex ml-6 mr-12"
                                src={`/images/avatars/${user.displayName}.jpg`}
                                onError={(e)=>{e.target.onerror = null; e.target.src="/images/avatars/blank.png"}} 
                                alt={`${user.displayName} profile picture`}
                            />
                        </Link>
                    </div>
                </div> 
            ) : (
                <div>
                    <Button to={PAGES.LOGIN} bg='#038cfc' color='white' >Log In</Button>
                    <Button to={PAGES.SIGN_UP}>Sign Up</Button>
                </div>
            )}
        </Content>
    )
}