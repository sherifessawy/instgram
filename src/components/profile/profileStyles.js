import styled from "styled-components";

export const Content = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 3em 0;
    
`

export const Header = styled.div`
    display: flex;
    align-items: center;

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
    }
`

export const Posts = styled.div`
`