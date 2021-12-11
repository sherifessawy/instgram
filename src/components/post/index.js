import React, {useState} from 'react'
import { Content, Comment, Caption, Input, Button } from '../post/postStyles'
import {Link} from 'react-router-dom'

function Post({postInfo: {caption, likes, comments, imageSrc, dateCreated}}) {
    const [newComment, setNewComment] = useState('')

    const date = new Date(dateCreated).toString()
    const user = {displayName: 'raphael'}
    //const comments = ['s', 'sd', 'sdd', 'qw'] 
    
    const postComments = comments.slice(-3).map( (comment, index) => (
        <Comment key={index} className="ml-4" >
            <strong>{comment.displayName}</strong> {comment.comment}
        </Comment>
    ))
    
    function handleClick(){
        // add newComment to post comments in firebase
        return 1
    }

    return (
        <Content>
            <Link to={`/p/${user.displayName}`} className='flex items-center'>
                <img
                    className="rounded-full h-8 w-8 flex m-4"
                    src={`/images/avatars/${user.displayName}.jpg`}
                    alt={`${user.displayName} profile picture`}
                />
                <p className='font-bold'>{user.displayName}</p>
            </Link>
            <img src={imageSrc} alt="post image" />
            <div className='flex justify-between w-14 m-4'>
                <Post.LikeIcon /> <Post.CommentIcon />
            </div>
            <p className="pl-4 pb-4 text-xs font-bold" >{likes.length} Likes</p>
            <Caption><strong>{user.displayName}</strong> {caption}</Caption>
            {comments.length > 3 && <p className="pl-4" onClick={() => handleClick()}>view all {comments.length} comments</p>}
            {postComments}
            <p className="p-4 text-xs" >{date}</p>
            <Input 
                placeholder='Add a comment ...'
                value = {newComment}
                onChange={({target}) => setNewComment(target.value)}
            />
            <Button>Post</Button>
        </Content>
    )
}

Post.LikeIcon = function PostLikeIcon({liked = false}){
    return(
        liked ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    )
}

Post.CommentIcon = function PostCommentIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    )
}

export default Post

