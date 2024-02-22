/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const AllowancePageContainerCSS = css`
    width: 80%;
    height: 80%;
    background: rgba(245, 224, 213, 1);
`;

function AllowancePageContainer({children, ...props}){
    return (
        <div css={AllowancePageContainerCSS} {...props}>
            {children}
        </div>
    )
}
export {AllowancePageContainer}