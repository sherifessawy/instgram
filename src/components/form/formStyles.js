import styled from "styled-components";

export const Content = styled.form`
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    max-width: 380px;
`

export const Title = styled.h1`
    
`

export const Image = styled.img`
    width: 150px;
    margin: 0.25rem 0;
`

export const Input = styled.input`
    background: lightblue;
    padding: 0.5rem 1rem;
    margin-top: 1em;
    width: 100%;
    border-radius: 4px;

    &:last-of-type{
        margin-top: 0.5em;
    }
`

export const Button = styled.button`
    background: #038cfc;
    color: white;
    font-weight: bold;
    width: 100%;
    margin-top: 0.5rem;
    padding: 3px;
    border-radius: 4px;

    &:hover{
        background: #4fa4e0;
    }
`

export const Footer = styled.p`
    margin: 2em 0 1em 0;
`
export const Frame = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    max-width: 720px;
    margin: 0 auto;
    min-height: 100vh;
`