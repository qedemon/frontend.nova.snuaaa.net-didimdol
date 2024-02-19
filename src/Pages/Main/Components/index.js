/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const MainContainerCSS = css`
    margin: 0px;
    width: 100vw;
    height: 100vh;
    @supports (-webkit-touch-callout: none) {
        height: -webkit-fill-available;
    }
`
function MainContainer({children, ...props}){
    return (
        <div css={MainContainerCSS} {...props}>
            {children}
        </div>
    )
}

export {MainContainer};