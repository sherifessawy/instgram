import React, {useEffect, useState, useContext} from 'react';
import Form from '../components/form';
import { Link, useNavigate } from 'react-router-dom';
import * as PAGES from '../constants/routes'
import { FirebaseContext } from '../context/firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getFirestore, arrayUnion, updateDoc} from 'firebase/firestore'
import doesUsernameExist from '../utils/usernameCheck';
import SpinnerLoader from '../components/loaders.js/Spinner';

export default function SignUp() {
    useEffect(() => {
        document.title = 'sign up - Instagram';
    }, [])

    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const isValid = password === '' || email === '' || fullName === '' || username === '';
    
    const {firebaseApp} = useContext(FirebaseContext)
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault()
        setLoading(true)

        const db = getFirestore(firebaseApp)
        const auth = getAuth(firebaseApp);

        const isDuplicatedUsername = await doesUsernameExist(username)
        if(isDuplicatedUsername){
            setPassword('')
            setUsername('')
            setError('username already in use')
            return null
        }  

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {displayName: username})
                .then(async () => {
                    await setDoc(doc(db, "users", username), 
                    {
                        userId: user.uid,
                        username: username,
                        fullName: fullName,
                        emailAddress: email.toLocaleLowerCase(),
                        following: ['9XjnR00NNBdIhvtUdfRbi3gKXxm1'],
                        followers: [],
                        dateCreated: Date.now()
                    })
                })
                .then(() => {
                    const defaultFollows = doc(db, "users", 'sherif')
                    console.log('s', defaultFollows, user.uid)
                    updateDoc(defaultFollows, {
                        followers: arrayUnion(user.uid)
                    })
                })
                .then(() => navigate(PAGES.DASHBOARD))
            })
            .catch((error) => {
                setLoading(false)
                setEmail('')
                setPassword('')
                //const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    return loading ? (
        <SpinnerLoader />
    ) : (
        <div style={{background: '#fafafa'}}>
        <Form.Frame>
            <Form method="POST">
                <Form.Image src='./images/logo.png'/>
                <Form.Input 
                    placeholder = "Username" 
                    onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
                    value = {username}
                />
                <Form.Input 
                    placeholder = "Full name" 
                    onChange={(e) => setFullName(e.target.value)}
                    value = {fullName}
                />
                <Form.Input 
                    placeholder = "Email Address" 
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                />
                <Form.Input 
                    placeholder = "Password" 
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