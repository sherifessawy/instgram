import React, {useEffect, useState} from 'react';
import Form from '../components/form';
import { Link } from 'react-router-dom';
import * as PAGES from '../constanst/routes'

export default function Login() {
    useEffect(() => {
        document.title = 'Login - Instagram';
    }, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        if (email && password){
            setIsValid(false)
        } else{
            setIsValid(true)
        }
    }, [email, password])
    
    return (
        <div style={{background: '#fafafa'}}>
        <Form.Frame>
            <img src='./images/iphone-with-profile.jpg' style={{width: '50%', maxWidth:'370px'}}/>
            <Form>
                <Form.Image src='./images/logo.png'/>
                <Form.Input 
                    placeholder = "email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value = {email}
                />
                <Form.Input 
                    placeholder = "password" 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    value = {password}
                />
                <Form.Button disabled={isValid}>Log In</Form.Button>
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