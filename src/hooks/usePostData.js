import { useState, useEffect } from 'react';
import {FollowedUsersPosts} from '../utils/get-post-data';
import useUserData from './useUserData';


function usePostData() {
    const [posts, setPosts] = useState()
    const {user} = useUserData() //get authed user data
    
    useEffect(() => {
        if (user && user.following){
            async function getPostObjData () {
                const res = await FollowedUsersPosts(user.following) //passing an array of all followed profiles
                setPosts(res)
            }
            getPostObjData()
        } else {
            setPosts(null)
        }
    }, [user])

    return {posts}
}

export default usePostData
