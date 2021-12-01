import React, {useEffect, useState, useContext} from 'react';
import Form from '../components/form';
import { Link } from 'react-router-dom';
import * as PAGES from '../constanst/routes'
import { FirebaseContext } from '../context/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    useEffect(() => {
        document.title = 'Login - Instagram';
    }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const isValid = password === '' || email === '';
    
    const {firebaseApp} = useContext(FirebaseContext)
    function handleClick(e) {
        e.preventDefault()

        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)
            });
    }

    return (
        <div style={{background: '#fafafa'}}>
        <Form.Frame>
            <img src='./images/iphone-with-profile.jpg' style={{width: '50%', maxWidth:'370px'}}/>
            <Form method="POST">
                <Form.Image src='./images/logo.png'/>
                <Form.Input 
                    placeholder = "email" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                />
                <Form.Input 
                    placeholder = "password" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                />
                <Form.Button disabled={isValid} onClick={(e) => handleClick(e)}>Log In</Form.Button>
                <Form.Footer>Don't have an account? 
                    <Link to={PAGES.SIGN_UP}>
                        <strong> Sign up</strong>
                    </Link>
                </Form.Footer>
            </Form>
        </Form.Frame>
        </div>
    )
}