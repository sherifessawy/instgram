import React, {useState} from 'react'
import reactDom from 'react-dom'
import {Overlay, Expand, CloseButton, PostLayer} from './profileStyles'
import Post from '../post'

export function OpenPost({post}) {
    const [expand, setExpand] = useState(false)
    const [openPost, updateOpenPost] = useState(false)

    console.log(post)
    return expand ? (
        reactDom.createPortal(
            <>
                <Overlay onClick={() => setExpand(false)} />
                <PostLayer>
                    <Post postInfo={post} updateTimeline={updateOpenPost}/>
                    <CloseButton onClick={() => setExpand(false)}>X</CloseButton>
                </PostLayer>
            </>
        ,document.body)
    ) : (
        <Expand onClick={() => setExpand(true)} />
    )
}
