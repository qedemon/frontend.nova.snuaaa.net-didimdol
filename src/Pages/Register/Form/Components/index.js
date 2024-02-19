/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const FormItemContainerCSS = css`
    display: grid;
    grid-template-areas:
        "input add"
        "message .";
    grid-template-columns: 7fr 2fr;
    grid-column-gap: 16px;
    &.without-add{
        grid-template-columns: 1fr 0fr;
    }
    &>.label{
        grid-area: label;
    }
    &>.input{
        grid-area: input;
    }
    &>.add{
        grid-area: add;
    }
    &>.message{
        grid-area: message;
    }
    margin: 10px 0px;
    &:first-of-type{
        margin-top: 0px;
    }
`
function FormItemContainer({children, ...props}){
    return (
        <div css={FormItemContainerCSS} {...props}>
            {children}
        </div>
    )
}
export {FormItemContainer}