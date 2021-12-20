import React, {useState} from 'react';
import Post from '../post';
import usePostData from '../../hooks/usePostData';
import 'react-loading-skeleton/dist/skeleton.css'
import { Instagram } from 'react-content-loader'

export default function Timeline({children, ...rest}) {
    const [timeline, updateTimeline] = useState(false) //used to update timeline when new comment is posted to show changes on screen real time
    
    const {posts} = usePostData(timeline) // passing the timeline changing state to make the hook do a query to firestore and get updated Post data
    
    let timelinePosts = null
    if (posts) {
        timelinePosts = posts.map(postInfo => (
            <Post key={postInfo.photoId} postInfo={postInfo} updateTimeline={updateTimeline}/>)
        )
    }

    return (
        <div className="flex flex-col w-8/12 phone:w-full">
            {timelinePosts || <Instagram className='-mt-4' backgroundColor={'#d9d9d9'} foregroundColor={'#999'} />}
        </div>
    );
}