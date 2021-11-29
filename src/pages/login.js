import React from 'react';
import Form from '../components/form';
import { Link } from 'react-router-dom';
import * as PAGES from '../constanst/routes'

export default function Login() {
    return (
        <>
        {/* <image src='./images/iphone-with-profile.jpg' /> */}
        <Form>
            <Form.Image src='./images/logo.png'/>
            <Form.Input placeholder = "email" />
            <Form.Input placeholder = "password" type="password" />
            <Form.Button>Log In</Form.Button>
            <Form.Footer>Don't have an account? 
                <Link to={PAGES.SIGN_UP}>
                    <strong> Sign up</strong>
                </Link>
            </Form.Footer>
        </Form>
        </>
    )
}