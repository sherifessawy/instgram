import React, {useState, useEffect} from 'react'
import {Content, Header, Posts} from './profileStyles'
import { getUserDataById } from '../../utils/getUserData'


function Profile({userId}) {
    const [profileData, setProfileData] = useState()

    useEffect(async () => {
        const res = await getUserDataById(userId)
        setProfileData(res[0])
    }, [userId])

    console.log(profileData)

    return (
        <div style={{background: '#fafafa'}}>
            <Content>
                <Profile.Header profileData={profileData} />
                <Profile.Posts />
            </Content>
        </div>
    )
}

Profile.Header = function ProfileHeader({profileData}){
    return(
        <Header>
            <img 
                src={`/images/avatars/${profileData.username}.jpg`}
                alt={`${profileData.username} profile picture`}
            />
            <div className='flex flex-col justify-between h-40'>
                <p className='text-4xl'>{profileData.username}</p>
                <div className='flex'>
                    <p><strong>{profileData.userId}</strong> posts</p>
                    <p><strong>{profileData.followers.length}</strong> followers</p>
                    <p><strong>{profileData.following.length}</strong> following</p>
                </div>
                <p className='text-xl font-bold'>{profileData.fullName}</p>
            </div>
        </Header>
    )
}

Profile.Posts = function ProfilePosts(){
    return(
        <Posts>
            posts
        </Posts>
    )
}

export default Profile
