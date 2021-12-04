import React from 'react';

export default function Header({children, ...rest}) {
    return (<p {...rest}>I am the header</p>);
}