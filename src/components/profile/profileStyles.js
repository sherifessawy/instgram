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
    transform: scale(0.9, 0.9); 
    margin: 0 auto;
    z-index: 10;
    position: fixed;
    top: -25px;
    left: 0;
    right: 0;
    
    @media(min-width: 400px){
        max-width: 400px;
        top: -70px;
        transform: scale(0.8, 0.8); 
    }
`

export const CloseButton = styled.div`
    position: absolute;
    font-size: 2rem;
    font-weight: bold;
    top: 10px;
    left: 350px;
    right: 0;
    cursor: pointer;
    &:hover{
        color: grey;
    }

    @media(max-width: 480px){
        left: 320px;
    }
`
