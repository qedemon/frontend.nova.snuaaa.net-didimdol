/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const ContentContainerCSS = css`
    display: grid;
    grid-template-rows: 177px 44px 53px 75px 75px;
    justify-items: center;
    align-items: start;
    & a{
        text-decoration-line: none;
    }
`;
function ContentContainer({children, ...props}){
    return (
        <div css={ContentContainerCSS} {...props}>
            {children}
        </div>
    )
}

export default ContentContainer;