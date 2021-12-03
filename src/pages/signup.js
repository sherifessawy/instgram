import React, {useEffect, useState, useContext} from 'react';
import Form from '../components/form';
import { Link, useNavigate } from 'react-router-dom';
import * as PAGES from '../constanst/routes'
import { FirebaseContext } from '../context/firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getFirestore} from 'firebase/firestore'

export default function SignUp() {
    useEffect(() => {
        document.title = 'sign up - Instagram';
    }, [])

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isValid = password === '' || email === '' || fullName === '' || username === '';
    
    const {firebaseApp} = useContext(FirebaseContext)
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault()

        const db = getFirestore(firebaseApp)
        const auth = getAuth(firebaseApp);
        
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential)
                const user = userCredential.user;
                updateProfile(user, {displayName: username})
                .then(async () => {
                    await setDoc(doc(db, "users", username.toLocaleLowerCase()), 
                    {
                        userId: user.uid,
                        username: username.toLocaleLowerCase(),
                        fullName: fullName,
                        emailAddress: email.toLocaleLowerCase(),
                        following: [],
                        followers: [],
                        dateCreated: Date.now()
                    })
                })
                navigate(PAGES.DASHBOARD)
            })
            .catch((error) => {
                setEmail('')
                setPassword('')
                setUsername('')
                setFullName('')
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    return (
        <div style={{background: '#fafafa'}}>
        <Form.Frame>
            <Form method="POST">
                <Form.Image src='./images/logo.png'/>
                <Form.Input 
                    placeholder = "Username" 
                    onChange={(e) => setUsername(e.target.value)}
                    value = {username}
                />
                <Form.Input 
                    placeholder = "Full name" 
                    onChange={(e) => setFullName(e.target.value)}
                    value = {fullName}
                />
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
                <Form.Button disabled={isValid} onClick={(e) => handleSignup(e)}>Sign Up</Form.Button>
                {error && <p className="text-xs text-red-500 mg-to-50px mt-4">{error}</p>} 
                <Form.Footer>Already a user? 
                    <Link to={PAGES.LOGIN}>
                        <strong> Log in</strong>
                    </Link>
                </Form.Footer>
            </Form>
        </Form.Frame>
        </div>
    )
}