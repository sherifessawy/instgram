import React from 'react';

export default function Sidebar({children, ...rest}) {
    return (<p {...rest}>I am the sidebar</p>);
}