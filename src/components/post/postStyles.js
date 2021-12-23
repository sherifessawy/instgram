import styled from "styled-components";

export const Content = styled.div`
    margin: 0 0 2em;
    border: 1px solid #d3e6d8;
    border-bottom: none;
    background: white;
`

export const Caption = styled.p`
    margin-left: 1rem;
`

export const Comment = styled.p`
`

export const Input = styled.input`
    border-top: 1px solid #d3e6d8;
    border-bottom: 1px solid #d3e6d8;
    padding: 1rem;
    width: 85%
`

export const Button = styled.button`
    color: #347eb3;
    font-weight: bold;
    border-top: 1px solid #d3e6d8;
    border-bottom: 1px solid #d3e6d8;
    padding: 1rem;
    width: 15%;

    &:hover{
        color: #236899;
    }

    ${({disabled}) => disabled && 'color:grey; opacity: 0.75; cursor:unset; &:hover{color: grey}'}

    @media(max-width: 380px){
        
    }
`

export const LikeIcon = styled.div`
    
    &:hover{
        cursor: pointer;
    }
`