import React, {useState, useEffect, useRef, useContext} from 'react'
import { Content, Comment, Caption, Input, Button, LikeIcon, CommentsDiv } from '../post/postStyles'
import {Link} from 'react-router-dom'
import { doc, updateDoc, arrayUnion, getFirestore, arrayRemove } from "firebase/firestore"
import { firebaseApp } from '../../lib/firebase'
import { formatDistance } from 'date-fns'
import {getUserDataById} from '../../utils/getUserData'
import {UserContext} from '../../context/user'

function Post({postInfo: {caption, likes, comments, imageSrc, dateCreated, photoId, userId}}) {
    const [commentInput, setCommentInput] = useState('')
    const [newComment, setNewComment] = useState('')
    const [tempComments, setTempComments] = useState(comments)
    const [postUser, setPostUser] = useState('')
    const [tempLikes, settempLikes] = useState(likes)
   
    const {user} = useContext(UserContext)

    useEffect(() => { //Effect callbacks are synchronous to prevent race conditions. async function is now placed inside
        async function fetchUserData(){
            const getPoster = await getUserDataById(userId)
            setPostUser(getPoster[0].username)
        }
        fetchUserData()
    }, [userId])

    const inputEl = useRef(null)

    const postCommentsVisibility = (sliceValue = -3) => (
        tempComments.slice(sliceValue).map( (comment, index) => (
            <Comment key={index} className="ml-4" >
                <Link to={`/p/${comment.displayName}`} className='font-bold mr-2'>{comment.displayName}</Link> 
                {comment.comment}
            </Comment>
        ))
    )
    const [postComments, setPostComments] = useState(postCommentsVisibility)
    
    useEffect(() => {
        //adding new comment to post in firestore
        if (newComment){ // to prevent useEffect from making a firebase call on component mount
            setTempComments(prevComments => [...prevComments, {comment: newComment, displayName:user.displayName}])
            
            setCommentInput('')
            setNewComment('')
            
            const db  = getFirestore(firebaseApp)
            const docRef = doc(db, "photos", `photo${photoId}`);
            async function addComment(){
                await updateDoc(docRef, {
                    comments: arrayUnion({displayName: user.displayName, comment:newComment})
                }).catch(err => console.log(err))
            }
            addComment()
        }
    }, [newComment])
    
    useEffect(() => {
        setPostComments(() => postCommentsVisibility(-3))
    }, [tempComments])

    function displayComments(){
        if (postComments.length <= 3){
            setPostComments(() => postCommentsVisibility(0)) //returns the complete comments array to be viewed on the post
        } else if (postComments.length > 3){
            setPostComments(() => postCommentsVisibility(-3)) 
        }
    }

    return (
        <Content>
            <Link to={`/p/${postUser}`} className='flex items-center'>
                <img
                    className="rounded-full h-12 w-12 flex m-3 ml-6"
                    src={`/images/avatars/${postUser}.jpg`}
                    alt={`${postUser} profile`}
                />
                <p className='font-bold'>{postUser}</p>
            </Link>

            <img src={imageSrc} alt="post" />

            <div className='flex justify-between w-14 m-4'>
                <Post.LikeIcon 
                    user={user} 
                    photoId={photoId} 
                    likes={likes} 
                    settempLikes={settempLikes} 
                /> 
                <Post.CommentIcon inputEl={inputEl} />
            </div>

            <p className="pl-4 pb-2 text-xs font-bold" >{tempLikes.length} Likes</p>

            <Caption>
                <Link to={`/p/${postUser}`} className='font-bold mr-2'>{postUser}</Link> 
                {caption}
            </Caption>

            {
                tempComments.length > 3 && (
                    <p className="pl-4 cursor-pointer text-gray-600" onClick={() => displayComments()}>
                        {postComments.length <= 3 ? `View all ${tempComments.length} comments` : 'Hide comments'}
                    </p>
                )
            }
            <CommentsDiv>
                {postComments}
            </CommentsDiv>

            <p className="p-4 text-xs" >{formatDistance(dateCreated, new Date())} ago</p>

            <Input 
                placeholder='Add a comment ...'
                value = {commentInput}
                onChange={({target}) => setCommentInput(target.value)}
                ref={inputEl}
            />
            <Button onClick={() => setNewComment(commentInput)} disabled={!commentInput}>Post</Button>
        </Content>
    )
}

Post.LikeIcon = function PostLikeIcon({user, photoId, likes, settempLikes}){
    const [isLiked, setIsLiked] = useState(likes.includes(user.uid)) //is true if Active User ID is existed in the photo likes array
    
    const db  = getFirestore(firebaseApp)
    const docRef = doc(db, "photos", `photo${photoId}`)
    const toggleLike = async () =>{
        setIsLiked((prev) => !prev) //it's not preferable to setState here before doing the query to database as the behavoir might not be expected as we change isLiked and then we use it (it's prev value) in the following lines (updating the doc). however, this setState async operation did not came into effect when the following lines were excuted (based on multible trials) so i used it here for the following reason: A better user experience, as setting the state of isLiked after doing the firestore query led to a relativly larger lag which made the like icon changes shape with a relativly larger delay (update: see comment in following line)    
        
        isLiked ?  settempLikes(prev => [...prev].filter(item => item !== user.uid)) : settempLikes(prev => [...prev, user.uid])
        
        isLiked ? ( //isLiked? is a synchronous operation so setting the state of isliked before this operation would not affect it (i.e. isLiked value is still prev value not !prev)
            await updateDoc(docRef, {
                likes: arrayRemove(user.uid)
            })
        ) : (
            await updateDoc(docRef, {
                likes: arrayUnion(user.uid)
            })
        )
    }

    return(
        <LikeIcon onClick={() => toggleLike()}>
            {isLiked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#c90f08" viewBox="0 0 24 24" stroke="#c90f08">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

