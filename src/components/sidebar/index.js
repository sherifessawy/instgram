import React, {useState, useEffect, useContext} from 'react';
import useUserData from '../../hooks/useUserData'
import { Content, Suggestions, Profile, FollowButton } from './sidebarStyles';
import {getUserDataById} from '../../utils/getUserData'
import {FirebaseContext} from '../../context/firebase'
import {getFirestore, doc, updateDoc, arrayUnion} from 'firebase/firestore'
import SidebarLoader from './sidebar-loader'
import { Link } from 'react-router-dom';

export default function Sidebar({children, ...rest}) {
    const {user} = useUserData()
    const [suggestedUsers, setSuggestedUsers] = useState([])    

    useEffect(async () => {
        //in the following function we passing, as arguments, array of users to exclude from the firestore query (which are the active user and the users the active user follow)
        if(user && user.following){
            const res = await getUserDataById([...user.following, user.userId], false) //returns array of profiles not followed by the current active user)
            const renderSuggestions = res.map(suggestion => (
                <Sidebar.Profile 
                        key={suggestion.userId}
                        src={`/images/avatars/${suggestion.username}.jpg`} 
                        alt={`${suggestion.fullName} photo`}
                        user={suggestion}
                        scaleDown
                        setSuggestedUsers = {setSuggestedUsers}
                        activeUser={user}
                />
            ))
            setSuggestedUsers(renderSuggestions)
        }
    }, [user])
    
    return (
        <Content {...rest}>
            {user && user.username ? (
            <Sidebar.Profile 
                src={`/images/avatars/${user.username}.jpg`} 
                alt={`${user.fullName} photo`}
                user={user}
            /> ) : (
            <SidebarLoader className='mt-4' />
            )}
            {suggestedUsers.length > 0 && 
            <Suggestions>
                <p className='mt-10 mb-6 font-bold'>Suggestions For You</p>
                {suggestedUsers}
            </Suggestions>
            }
        </Content>
    );
}

Sidebar.Profile = function SidebarProfile({children, src, alt, user, setSuggestedUsers, activeUser, ...rest}){
    const {firebaseApp} = useContext(FirebaseContext)
    
    async function followUser(){
        setSuggestedUsers( prev => (
            prev.filter(item => item.props.user.userId != user.userId)
        ))
        const db  = getFirestore(firebaseApp)
        const docRef = doc(db, "users", activeUser.username)
        await updateDoc(docRef, {
            following: arrayUnion(user.userId)
        })
    }

    return(
        <Profile {...rest}>
            <Link to={`/p/${user.username}`} >
                <img src={src} alt={`${user.fullName} photo`}/>
            </Link>
            <div>
                <p>{user.username}</p>
                <p>{user.fullName}</p>
            </div>
            
            {setSuggestedUsers && (
                <FollowButton onClick={()=>followUser()}>
                    Follow
                </FollowButton>
            )}
        </Profile>
    )
}