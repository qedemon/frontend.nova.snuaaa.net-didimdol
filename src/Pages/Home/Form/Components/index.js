/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const InputCSS = css`
    min-height: 30px;
    font-size: 20px;
    text-indent: 15px;
`;

const Input = forwardRef(
    ({children, ...props}, ref)=>{
        return (
            <input ref={ref} {...props}>
                {children}
            </input>
        )
    }
)

export {Input}