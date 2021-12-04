import React from 'react';
import { Logo, Content, Button } from './headerStyles';
import * as PAGES from '../../constanst/routes'

export default function Header({children, ...rest}) {
    
    return (
        <Content {...rest}>
            <Logo to={PAGES.DASHBOARD}>
                <img src={'/images/logo.png'} />
            </Logo>
            {children}
        </Content>
    )
}

Header.Button = function HeaderButton ({children, ...rest}){
    return <Button {...rest} >{children}</Button>
}