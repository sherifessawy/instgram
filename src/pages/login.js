import React, {useEffect, useState, useContext} from 'react';
import Form from '../components/form';
import { Link, useNavigate } from 'react-router-dom';
import * as PAGES from '../constants/routes'
import { FirebaseContext } from '../context/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import SpinnerLoader from '../components/loaders.js/Spinner';

export default function Login() {
    useEffect(() => {
        document.title = 'Login - Instagram';
    }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const isValid = password === '' || email === '';
    
    const {firebaseApp} = useContext(FirebaseContext)
    const navigate = useNavigate()
    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)

        const auth = getAuth(firebaseApp);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                //const user = userCredential.user;
                navigate(PAGES.DASHBOARD)
            })
            .catch((error) => {
                setLoading(false)
                setEmail('')
                setPassword('')
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    return loading ? (
        <SpinnerLoader />
    ) : (
        <div style={{background: '#fafafa'}}>
        <Form.Frame>
            <img 
                src='https://drive.google.com/uc?id=19p92C5QMfNKZZ9fTNn1AzqOjSY2mQP6r' 
                alt='iphone with profile' 
                style={{width: '50%', maxWidth:'370px'}}
            />
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
                <Form.Button disabled={isValid} onClick={(e) => handleLogin(e)}>Log In</Form.Button>
                {error && <p className="text-xs text-red-500 mg-to-50px mt-4">{error}</p>} 
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