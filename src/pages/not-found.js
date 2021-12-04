import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/form/formStyles';

export default function NotFound() {
    useEffect(() => {
        document.title = "404 - page not found"
    }, [])


    return (
        <div style={{backgroundImage: 'url("./images/404.jpg")', backgroundSize: 'cover'}} className="h-screen">
            <p className="mx-8 text-xs pt-8">image by macrovector/Freepik</p>
            <div className="mx-auto max-w-screen-lg w-48 py-48">
                <Link to="/" >
                    <Button>Take me to homepage</Button>             
                </Link>
            </div>
        </div>
    )
}