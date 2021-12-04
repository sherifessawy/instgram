import styled from "styled-components";
import { Link } from "react-router-dom";

export const Content = styled.div`
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Logo = styled(Link)`

    img {
        max-width: 150px;
        padding: 1em;
        margin-left: 2em;
    }
`

export const Button = styled(Link)`
    margin: 1rem;
    padding: 5px 10px;
    font-weight: bold;
    border-radius: 5px;
    background: ${({bg}) => bg};
    color: ${({color}) => color};

    &:last-of-type{
        margin-right: 3rem;
        margin-left: 0;
    }

    &:hover{
        box-shadow: 1px 1px 5px #888888;
    }
`