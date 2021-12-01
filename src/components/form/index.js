import React, {useState} from 'react'
import { Content, Title, Input, Button, Footer, Image, Frame} from './formStyles'

function Form({children, ...rest}) {
    return (
        <Content {...rest}>
            {children}
        </Content>
    )
}

Form.Title = function FormTitle({children, ...rest}){
    return <Title {...rest}>{children}</Title>
}

Form.Image = function FormImage({...rest}){
    return <Image {...rest} />
}

Form.Input = function FormInput({children, ...rest}){
    return (
        <Input {...rest}>{children}</Input>
    )
}

Form.Button = function FormButton({children, ...rest}){
    return <Button {...rest} >{children}</Button>
}

Form.Footer = function FormFooter({children, ...rest}){
    return <Footer {...rest}>{children}</Footer>
}

Form.Frame = function FormFrame({children, ...rest}){
    return <Frame {...rest}>{children}</Frame>
}

export default Form
