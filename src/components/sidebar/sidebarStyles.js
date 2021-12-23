import styled from "styled-components";

export const Content = styled.div`
    width: 30%;

    @media(max-width: 720px){
        width: 100%;
    }
    
`

export const Suggestions = styled.div`

    
`

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1em;

    img{
        ${({scaleDown}) => scaleDown ? 'width: 45px;' : 'width:75px;'}
        border-radius: 50%;
        margin-right: 1em;
    }

    p:first-of-type{
        font-weight: bold;
    }

    @media(max-width: 720px){
        ${({dontDisplayForPhones}) => dontDisplayForPhones && 'display: none;'}
    }
`

export const FollowButton = styled.button`
    margin-left: auto;
    color: #5d9bde;
    font-weight: bold;
`