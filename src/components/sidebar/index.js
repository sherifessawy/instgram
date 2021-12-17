import React, {useState, useEffect} from 'react';
import useUserData from '../../hooks/useUserData'
import { Content, Suggestions, Profile, FollowButton } from './sidebarStyles';
import {getUserDataById} from '../../utils/getUserData'

export default function Sidebar({children, ...rest}) {
    const {user} = useUserData()
    const [suggestedUsers, setSuggestedUsers] = useState([])    

    useEffect(async () => {
        //in the following function we passing, as arguments, array of users to exclude from the firestore query (which are the active user and the users the active user follow)
        if(user && user.following){
            const res = await getUserDataById([...user.following, user.userId], false) //returns array of profiles not followed by the current active user)
            console.log(res)
            const renderSuggestions = res.map(suggestion => (
                <Sidebar.Profile 
                        key={suggestion.userId}
                        src={`/images/avatars/${suggestion.username}.jpg`} 
                        alt={`${suggestion.fullName} photo`}
                        user={suggestion}
                        scaleDown
                        followBtn
                />
            ))
            setSuggestedUsers(renderSuggestions)
        }
    }, [user])
    
    return (
        <Content {...rest}>
            <Sidebar.Profile 
                src={`/images/avatars/${user.username}.jpg`} 
                alt={`${user.fullName} photo`}
                user={user}
            />
            <Suggestions>
                <p className='mt-10 mb-6 font-bold'>Suggestions For You</p>
                {suggestedUsers}
            </Suggestions>
        </Content>
    );
}

Sidebar.Profile = function SidebarProfile({children, src, alt, user, followBtn, ...rest}){
    
    function handleClick(){
        console.log('cliked')
    }

    return(
        <Profile {...rest}>
            <img src={src} alt={`${user.fullName} photo`}/>
            <div>
                <p>{user.username}</p>
                <p>{user.fullName}</p>
            </div>
            {followBtn && (
                <FollowButton onClick={()=>handleClick()}>
                    Follow
                </FollowButton>
            )}
        </Profile>
    )
}