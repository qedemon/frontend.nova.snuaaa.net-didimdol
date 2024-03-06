/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const LogQRAuthenticationContainerCSS = css`
    display: grid;
    gap: 16px;
    justify-items: center;
    & h1, & h2{
        margin: 0px;
    }
    & h1{
        margin-bottom: 32px;
    }
`;
function LogQRAuthenticationContainer({children}){
    return (
        <div css={LogQRAuthenticationContainerCSS}>
            {children}
        </div>
    )
}
export {LogQRAuthenticationContainer}

export {default as Background} from "./Background";