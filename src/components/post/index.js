import React, {useState, useEffect, useContext, useRef} from 'react'
import { Content, Comment, Caption, Input, Button, LikeIcon } from '../post/postStyles'
import {Link} from 'react-router-dom'
import { doc, updateDoc, arrayUnion, getFirestore, arrayRemove } from "firebase/firestore"
import { firebaseApp } from '../../lib/firebase'
import {UserContext} from '../../context/user'

function Post({postInfo: {caption, likes, comments, imageSrc, dateCreated, photoId}, updateTimeline}) {
    const [commentInput, setCommentInput] = useState('')
    const [newComment, setNewComment] = useState('')
    const {user} = useContext(UserContext)
    const inputEl = useRef(null)

    const date = new Date(dateCreated).toString()
    const postUser = {displayName: 'raphael'} //replace with poster from firebase
    
    const initializePostComments = (sliceValue = -3) => (
        comments.slice(sliceValue).map( (comment, index) => (
            <Comment key={index} className="ml-4" >
                <strong>{comment.displayName}</strong> {comment.comment}
            </Comment>
        ))
    )
    const [postComments, setPostComments] = useState(initializePostComments)
    
    
    useEffect(async () => {
        //adding new comment to post in firestore
        if (newComment){ // to prevent useEffect from making a firebase call on component mount
            const db  = getFirestore(firebaseApp)
            const docRef = doc(db, "photos", `photo${photoId}`);
            await updateDoc(docRef, {
                comments: arrayUnion({displayName: user.displayName, comment:newComment})
            })
            setCommentInput('')
            setNewComment('')
            updateTimeline((prev) => !prev) //used to update timeline (parent component) when new comment is posted to show changes on screen real time
        }
    }, [newComment])
    
    function displayComments(){
        if (postComments.length <= 3){
            setPostComments(() => initializePostComments(0)) //returns the complete comments array to be viewed on the post
        } else if (postComments.length > 3){
            setPostComments(() => initializePostComments(-3)) 
        }
    }

    return (
        <Content>
            <Link to={`/p/${postUser.displayName}`} className='flex items-center'>
                <img
                    className="rounded-full h-8 w-8 flex m-4"
                    src={`/images/avatars/${postUser.displayName}.jpg`}
                    alt={`${postUser.displayName} profile picture`}
                />
                <p className='font-bold'>{postUser.displayName}</p>
            </Link>
            <img src={imageSrc} alt="post image" />
            <div className='flex justify-between w-14 m-4'>
                <Post.LikeIcon user={user} photoId={photoId} likes={likes} updateTimeline={updateTimeline}/> 
                <Post.CommentIcon inputEl={inputEl} />
            </div>
            <p className="pl-4 pb-4 text-xs font-bold" >{likes.length} Likes</p>
            <Caption><strong>{postUser.displayName}</strong> {caption}</Caption>
            {
                comments.length > 3 && (
                    <p className="pl-6 cursor-pointer" onClick={() => displayComments()}>
                        {postComments.length <= 3 ? `View all ${comments.length} comments` : 'Hide comments'}
                    </p>
                )
            }
            {postComments}
            <p className="p-4 text-xs" >{date}</p>
            <Input 
                placeholder='Add a comment ...'
                value = {commentInput}
                onChange={({target}) => setCommentInput(target.value)}
                ref={inputEl}
            />
            <Button onClick={() => setNewComment(commentInput)}>Post</Button>
        </Content>
    )
}

Post.LikeIcon = function PostLikeIcon({user, photoId, likes, updateTimeline}){
    const [isLiked, setIsLiked] = useState(likes.includes(user.uid)) //is true if userId is existed in the photo likes array

    const hoverLike = async () =>{
        const db  = getFirestore(firebaseApp)
        const docRef = doc(db, "photos", `photo${photoId}`)
        setIsLiked((prev) => !prev) //it's not preferable to setState here before doing the query to database as the behavoir might not be expected as we change isLiked and then we use it (it's prev value) in the following lines (updating the doc). however, this setState async operation did not came into effect when the following lines were excuted (based on multible trials) so i used it here for the following reason: A better user experience, as setting the state of isLiked after doing the firestore query led to a relativly larger lag which made the like icon changes shape with a relativly larger delay (update: see comment in following line)
        isLiked ? ( //isLiked? is a synchronous operation so setting the state of isliked before this operation would not affect it (i.e. isLiked value is still prev value not !prev)
            await updateDoc(docRef, {
                likes: arrayRemove(user.uid)
            })
        ) : (
            await updateDoc(docRef, {
                likes: arrayUnion(user.uid)
            })
        )
        updateTimeline(prev => !prev) //used to update timeline (parent component) when post is liked, or unliked, to show changes on screen real time
    }

    return(
        <LikeIcon onClick={() => hoverLike()}>
            {isLiked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 18 18" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            )}
        </LikeIcon>
    )
}

Post.CommentIcon = function PostCommentIcon({inputEl}){
    return(
        <div onClick={() => inputEl.current.focus()} className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </div>
    )
}

export default Post

