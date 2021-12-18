import React from 'react';
import useUserData from '../hooks/useUserData'
import Header from '../components/header';
import ProfileContent from '../components/profile/Profile';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { user: { userId, following, username, fullName } = {} } = useUserData()  //destructuring user elements (e.g. userId) from the destructured user. we also default this to empty obj to avoid the error of "trying to read property of undefined" when user is undefined at the begining as this is async call
    const {username: profileName} = useParams()
    console.log(profileName)

    return (
        <>
            <Header />
            <ProfileContent 
                username = {profileName}
            />
        </>
    )
}