import { useState, useEffect } from 'react';
import {FollowedUsersPosts} from '../utils/get-post-data';
import useUserData from './useUserData';


function usePostData(recievedUpdateFromTimeline) {
    const [posts, setPosts] = useState()
    const {user} = useUserData() //get authed user data
    
    useEffect(() => {
        if (user && user.following){
            async function getPostObjData () {
                const res = await FollowedUsersPosts(user.following[0]) //for now the user only follows one person this part to be modified later to return multipile followed users posts
                setPosts(res)
            }
            getPostObjData()
        } else {
            setPosts(null)
        }
    }, [user, recievedUpdateFromTimeline])

    return {posts}
}

export default usePostData
