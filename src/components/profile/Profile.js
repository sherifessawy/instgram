import React, {useState, useEffect, useContext} from 'react'
import {Content, Header, Posts, Icons, PostFrame} from './profileStyles'
import { getUserDataByusername } from '../../utils/getUserData'
import {profilePosts} from '../../utils/get-post-data'
import Form from '../form'
import { FirebaseContext } from '../../context/firebase'
import {getFirestore, doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {HeaderLoader} from './profile-loader'

function Profile({username, activeUser}) {
    const [profileData, setProfileData] = useState()
    const [posts, setPosts] = useState()
    
    useEffect(async () => {
        const res = await getUserDataByusername(username)
        setProfileData(res)
    }, [username])
    
    useEffect(async () => {
        if (profileData && profileData.userId){
            const res2 = await profilePosts(profileData.userId)
            setPosts(res2)
        }
    }, [profileData])

    return (
        <div style={{background: '#fafafa'}}>
            <Content>
                <Profile.Header profileData={profileData} posts={posts} activeUserId={activeUser.userId} activeUsername={activeUser.username}/>
                <Profile.Posts posts={posts} />
            </Content>
        </div>
    )
}

Profile.Header = function ProfileHeader({profileData, activeUserId, activeUsername, posts = []}){
    const [isFollowedUser, setIsFollowedUsed] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)
    
    const {firebaseApp} = useContext(FirebaseContext)
    async function toggleFollow(){
        const db = getFirestore(firebaseApp)
        const profileRef = doc(db, "users", profileData.username)
        const activeUserRef = doc(db, "users", activeUsername)
        if(isFollowedUser){
            setIsFollowedUsed(false)
            setFollowersCount(prev => prev-1)
            await updateDoc(profileRef, {
                followers: arrayRemove(activeUserId)
            })
            await updateDoc(activeUserRef, {
                following: arrayRemove(profileData.userId)
            })
        } else{
            setIsFollowedUsed(true)
            setFollowersCount(prev => prev+1)
            await updateDoc(profileRef, {
                followers: arrayUnion(activeUserId)
            })
            await updateDoc(activeUserRef, {
                following: arrayUnion(profileData.userId)
            })
        }
    }
    
    const followBtnText = isFollowedUser ? 'Unfollow' : 'Follow'

    useEffect(() => {
        if(profileData && profileData.followers.includes(activeUserId) && !isFollowedUser){
            setIsFollowedUsed(true)
        }
        if(profileData && profileData.followers){
            setFollowersCount(profileData.followers.length)
        }
    }, [profileData, activeUserId])
    
    return profileData ? (
            <Header>
                <img 
                    src={`/images/avatars/${profileData.username}.jpg`}
                    onError={(e)=>{e.target.onerror = null; e.target.src="/images/avatars/blank.png"}} 
                    alt={`${profileData.username} profile picture`}
                />
                <div className='flex flex-col justify-between h-40 phone:h-28'>
                    <div className='flex'>
                        <p className='text-4xl font-bold'>{profileData.username}</p>
                        {(profileData.username !== activeUsername && activeUsername) && ( //first check to hide follow button in case the profile is the activeUser profile and second one is to hide the follow button in case the visitor is not logged in
                            <Form.Button 
                                width={45}
                                onClick={() => toggleFollow()}
                            >
                                {followBtnText}
                            </Form.Button>
                            )}

                    </div>
                    <div className='flex small:flex-col'>
                        <p><strong>{posts.length}</strong> posts</p>
                        <p><strong>{followersCount}</strong> followers</p>
                        <p><strong>{profileData.following.length}</strong> following</p>
                    </div>
                    <p className='text-xl font-bold phone:text-sm'>{profileData.fullName}</p>
                </div>
            </Header>

        ) : (
            <HeaderLoader />
        )
}

Profile.Posts = function ProfilePosts({posts = []}){
    const [renderPosts, setRenderPosts] = useState()
    
    useEffect(() => {
        if (posts.length>0){
            const allPosts = posts.map((post) => (
                <PostFrame key={post.photoId}>
                    <img src={post.imageSrc} alt={post.caption}></img>
                    <Icons>
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg> 
                            <p>{post.likes.length}</p>
                        </div>
                        <div className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg> 
                            <p>{post.comments.length}</p>
                        </div>
                    </Icons>
                </PostFrame>
            ))
            setRenderPosts(allPosts)
        }
    }, [posts])
    
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
