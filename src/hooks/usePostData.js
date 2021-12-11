import { useState, useEffect } from 'react';
import postsData from '../utils/getFollowedSUsersPosts';
import useUserData from './useUserData';


function usePostData() {
    const [posts, setPosts] = useState()
    const {user} = useUserData() //get authed user data
    
    useEffect(() => {
        if (user && user.following){
            async function getPostObjData () {
                const res = await postsData(user.following[0])
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
