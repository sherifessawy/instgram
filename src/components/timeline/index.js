import React from 'react';
import Post from '../post';
import usePostData from '../../hooks/usePostData';

export default function Timeline({children, ...rest}) {
    const {posts} = usePostData()
    console.log(posts)
    let timelinePosts = null
    if (posts) {timelinePosts = posts.map(postInfo => <Post key={postInfo.photoId} postInfo={postInfo} />)}

    return (
        <div className="flex flex-col w-8/12">
            {timelinePosts}
        </div>
    );
}