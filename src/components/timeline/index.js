import React from 'react';
import Post from '../post';

export default function Timeline({children, ...rest}) {

    return (
        <div className="flex flex-col w-8/12">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}