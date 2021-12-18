import React, {useState, useEffect} from 'react'
import {Content, Header, Posts} from './profileStyles'
import { getUserDataByusername } from '../../utils/getUserData'
import {profilePosts} from '../../utils/get-post-data'

function Profile({username}) {
    const [profileData, setProfileData] = useState()
    const [posts, setPosts] = useState()
    
    useEffect(async () => {
        const res = await getUserDataByusername(username)
        setProfileData(res)
    }, [username])
    
    useEffect(async () => {
        if (profileData && profileData.userId){
            console.log(profileData.userId)
            const res2 = await profilePosts(profileData.userId)
            setPosts(res2)
        }
    }, [profileData])

    return (
        <div style={{background: '#fafafa'}}>
            <Content>
                <Profile.Header profileData={profileData} posts={posts} />
                <Profile.Posts posts={posts} />
            </Content>
        </div>
    )
}

Profile.Header = function ProfileHeader({profileData, posts = []}){
    
    return profileData ? (
            <Header>
                <img 
                    src={`/images/avatars/${profileData.username}.jpg`}
                    alt={`${profileData.username} profile picture`}
                />
                <div className='flex flex-col justify-between h-40'>
                    <p className='text-4xl'>{profileData.username}</p>
                    <div className='flex'>
                        <p><strong>{posts.length}</strong> posts</p>
                        <p><strong>{profileData.followers.length}</strong> followers</p>
                        <p><strong>{profileData.following.length}</strong> following</p>
                    </div>
                    <p className='text-xl font-bold'>{profileData.fullName}</p>
                </div>
            </Header>

        ) : (
            null
        )
}

Profile.Posts = function ProfilePosts({posts = []}){
    const [renderPosts, setRenderPosts] = useState()
    
    useEffect(() => {
        if (posts){
            const allPosts = posts.map((post) => (
                <img key={post.photoId} src={post.imageSrc} alt={post.caption}/>
            ))
            setRenderPosts(allPosts)
        }
    }, [posts])
    
    //console.log(renderPosts)
    
    return posts.length > 0 ? (
        <Posts>
            {renderPosts}
        </Posts>
    ) : (
        <Posts>
            <h2>No posts yet</h2>
        </Posts>
    )
}

export default Profile
