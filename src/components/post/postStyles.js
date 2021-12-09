import styled from "styled-components";

export const Content = styled.div`
    margin: 1em 0;
    border: 1px solid grey;
    border-bottom: none;
    background: white;
`

export const Caption = styled.p`
    margin-left: 1rem;
    margin-bottom: 1rem;
`

export const Comment = styled.p`
`

export const Input = styled.input`
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding: 1rem;
    width: 80%
`

export const Button = styled.button`
    color: #347eb3;
    font-weight: bold;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding: 1rem;
    width: 20%;

    &:hover{
        color: #236899;
    }
`