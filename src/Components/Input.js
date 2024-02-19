/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const InputCSS = css`
    min-height: 50px;

    text-indent: 16px;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;

    border: 1px solid rgba(232, 232, 232, 1);
    border-radius: 5px;
    background: linear-gradient(0deg, #F6F6F6, #F6F6F6),
    linear-gradient(0deg, #E8E8E8, #E8E8E8);
`;

const Input = forwardRef(
    ({children, ...props}, ref)=>{
        return (
            <input ref={ref} css={InputCSS} {...props}>
                {children}
            </input>
        )
    }
)

export default Input;