import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/form/formStyles';
import Header from '../components/header';

export default function NotFound() {
    useEffect(() => {
        document.title = "404 - page not found"
    }, [])


    return (
        <div className="h-screen">
            <Header/>
            <h1 className="text-center text-2xl my-12">Page Not Found</h1>
            <div className="mx-auto max-w-screen-lg w-48 my-12">
                <Link to="/" >
                    <Button>Take me to homepage</Button>             
                </Link>
            </div>
        </div>
    )
}