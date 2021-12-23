import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import styled from 'styled-components';

const override = css`
  display: block;
  margin: 0 auto;
  align-self: center;
`;

const Overlay = styled.div`
    height: 100vh;
    display: flex;
`

function SpinnerLoader() {

    return (
        <Overlay className="bg-gray-100">
            <ClipLoader loading={true} css={override} />
        </Overlay>
    )
}

export default SpinnerLoader


