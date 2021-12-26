import React, {useState} from 'react'
import reactDom from 'react-dom'
import {Overlay, Expand, CloseButton, PostLayer} from './profileStyles'
import Post from '../post'

export function OpenPost({post, setUpdateProfileData}) {
    const [expand, setExpand] = useState(false)

    function handleClick(){
        setExpand(false)
        setUpdateProfileData(prev => !prev)
    }
    return expand ? (
        reactDom.createPortal(
            <>
                <Overlay onClick={() => handleClick()} />
                <PostLayer>
                    <Post postInfo={post}/>
                    <CloseButton onClick={() => handleClick()}>x</CloseButton>
                </PostLayer>
            </>
        ,document.body)
    ) : (
        <Expand onClick={() => setExpand(true)} />
    )
}
