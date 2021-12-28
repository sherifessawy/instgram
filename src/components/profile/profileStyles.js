import styled from "styled-components";

export const Content = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 3em 0;
    min-height: 90vh;
    
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto 3em;
    padding-bottom: 4em;
    border-bottom: 1px solid grey;
    max-width: 95%;

    img{
        border-radius: 50%;
        width: 200px;
        margin-right: 8em;
    }

    div div p{
        margin-right: 1em;
        font-size: 1.4rem;
    }

    .contacts{
        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }

    @media(max-width: 600px){
        img{
            margin-right: unset;
            padding: 2em;
            width: 140px;
        }

        div div p{
            margin-right: 0.5em;
            font-size: 1rem;
        }
    }
`

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    grid-gap: 30px;
    align-items: start;
    position: relative;
    
    img{
        cursor: pointer;

        &:hover{
            
        }
    }

    h2{
        text-align: center;
        font-size: 3rem;
        margin-top: 3rem;
        color: grey;
    }
`

export const Icons = styled.div`
    position: absolute;
    top: 45%;
    right: 25%;
    
    div{
        transform: scale(1.5, 1.5);
        padding-right: 30px;
        P{
            margin-left: 5px;
        }
    }

    p{
        color: white;
    }
`
export const PostFrame = styled.div`
    position: relative;

    ${Icons}{
        display: none;
    }

    &:hover{
        ${Icons}{
            display: flex;
        }
    }
`

//profile-post-feature styles

export const Expand = styled.div`
    background: rgba(0,0,0,0);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
    
    &:hover{
        background: rgba(0,0,0,0.1);
    }
`

export const Overlay = styled.div`
    background: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
`

export const PostLayer = styled.div`
    max-width: 95%;
    z-index: 10;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    left: 0;
    margin: auto;
    max-height: 95vh;
    overflow: auto;
    background: white;
    
    @media(min-width: 480px){
        max-width: 480px;
    }
`

export const CloseButton = styled.div`
    position: absolute;
    font-size: 2rem;
    font-weight: bold;
    top: 9px;
    left: 420px;
    right: 0;
    cursor: pointer;
    &:hover{
        color: grey;
    }

    @media(max-width: 400px){
        left: 310px;
    }
`

// profile-header-feature styles

export const ContactsLayer = styled.div`
    z-index: 10;
    padding: 2em 1.5em;
    border-radius: 15px;
    position: fixed;
    background: white;
    top: 5%;
    left: 0;
    right: 0;
    max-width: 400px;
   
    margin: 0 auto;
    max-height: 480px;
    overflow: auto;

    .contacts-text{
        font-weight: bold;
        text-align: center;
        background: grey;
        border-radius: 20px;
        color: white;
        margin-bottom: 3em;
    }
`

export const CloseContacts = styled.div`
    position: absolute;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    z-index: 11;
    top: 65px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 352px;
    border-radius: 20px;
    color: white;
    background: maroon;
    cursor: pointer;
    &:hover{
        color: grey;
    }
`