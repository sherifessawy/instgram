import React, {useState, useEffect, useContext} from 'react'
import {Content, Header, Posts, Icons, PostFrame} from './profileStyles'
import { getUserDataByusername } from '../../utils/getUserData'
import {profilePosts} from '../../utils/get-post-data'
import Form from '../form'
import { FirebaseContext } from '../../context/firebase'
import {getFirestore, doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {HeaderLoader} from './profile-loader'
import { OpenPost } from './profile-post-feature'
import {ShowContacts} from './profile-header-feature'

function Profile({username, activeUser}) {
    const [profileData, setProfileData] = useState()
    const [posts, setPosts] = useState()
    const [updateProfileData, setUpdateProfileData] = useState(false)
    
    useEffect(() => {
        async function getUserData(){
            const res = await getUserDataByusername(username)
            setProfileData(res)
        }
        getUserData()
    }, [username, updateProfileData])
    
    useEffect(() => {
        if (profileData && profileData.userId){
            async function getPosts(){
                const res2 = await profilePosts(profileData.userId)
                setPosts(res2)
            }
            getPosts()
        }
    }, [profileData, updateProfileData])

    

    return (
        <div style={{background: '#fafafa'}}>
            <Content>
                <Profile.Header 
                    profileData={profileData} 
                    posts={posts} 
                    activeUserId={activeUser.userId} 
                    activeUsername={activeUser.username}
                    setUpdateProfileData={setUpdateProfileData}
                />
                <Profile.Posts posts={posts} setUpdateProfileData={setUpdateProfileData}/>
            </Content>
        </div>
    )
}

Profile.Header = function ProfileHeader({profileData, activeUserId, activeUsername, posts = [], setUpdateProfileData}){
    const [isFollowedUser, setIsFollowedUser] = useState(false)
    const [followersCount, setFollowersCount] = useState(0)
    
    const {firebaseApp} = useContext(FirebaseContext)
    async function toggleFollow(){
        const db = getFirestore(firebaseApp)
        const profileRef = doc(db, "users", profileData.username)
        const activeUserRef = doc(db, "users", activeUsername)
        if(isFollowedUser){
            setIsFollowedUser(false)
            setFollowersCount(prev => prev-1)
            await updateDoc(profileRef, {
                followers: arrayRemove(activeUserId)
            })
            await updateDoc(activeUserRef, {
                following: arrayRemove(profileData.userId)
            })
        } else{
            setIsFollowedUser(true)
            setFollowersCount(prev => prev+1)
            await updateDoc(profileRef, {
                followers: arrayUnion(activeUserId)
            })
            await updateDoc(activeUserRef, {
                following: arrayUnion(profileData.userId)
            })
        }
        setUpdateProfileData(prev => !prev) //update profile after doing the database query
    }
    
    const followBtnText = isFollowedUser ? 'Unfollow' : 'Follow'

    useEffect(() => {
        if(profileData && profileData.followers.includes(activeUserId) && !isFollowedUser){
            setIsFollowedUser(true)
        }
        if(profileData && profileData.followers){
            setFollowersCount(profileData.followers.length)
        }
    }, [profileData, activeUserId])
    
    return profileData ? (
            <Header>
                <img 
                    src={`https://sherifessawy.github.io/instgram/images/avatars/${profileData.username}.jpg`}
                    onError={(e)=>{e.target.onerror = null; e.target.src="/images/avatars/blank.png"}} 
                    alt={`${profileData.username} profile`}
                />
                <div className='flex flex-col justify-between h-40 phone:h-28 phone:justify-center'>
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
                        <ShowContacts 
                            targetContacts={'followers'} 
                            profileData={profileData} 
                            followersCount={followersCount} 
                        />
                        <ShowContacts 
                            targetContacts={'following'} 
                            profileData={profileData} 
                        />
                    </div>
                    <p className='text-xl font-bold phone:text-sm phone:mt-2'>{profileData.fullName}</p>
                </div>
            </Header>
        ) : (
            <HeaderLoader />
        )
}

Profile.Posts = function ProfilePosts({posts = [], setUpdateProfileData}){
    const [renderPosts, setRenderPosts] = useState()
    
    useEffect(() => {
        if (posts.length>0){
            const allPosts = posts.map((post) => (
                <PostFrame key={post.photoId}>
                    <img src={post.imageSrc} alt={post.caption} />
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
                    <OpenPost post={post} setUpdateProfileData={setUpdateProfileData}/>
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
