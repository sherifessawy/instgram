import React, {useState} from 'react'
import { Content, Title, Input, Button, Footer, Image} from './formStyles'

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
    const [input, setInput] = useState('')
    return (
        <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            {...rest}
        >{children}</Input>
    )
}

Form.Button = function FormButton({children, ...rest}){
    const handleClick = (e) => {
        e.preventDefault()
        console.log('clicked')
    }

    return <Button {...rest} onClick={(e) => handleClick(e)}>{children}</Button>
}

Form.Footer = function FormFooter({children, ...rest}){
    return <Footer {...rest}>{children}</Footer>
}

export default Form
