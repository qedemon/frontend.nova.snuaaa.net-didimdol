/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const CheckBoxCSS = css`

`;
const CheckBox = forwardRef(
    ({children, className, ...props}, ref)=>{
        return (
            <label className={className}>
                <input ref={ref} css={CheckBoxCSS} type="checkbox" {...props}></input>
                {children}
            </label>
        )
    }
)
export {CheckBox}

const UserAllowanceContainerCSS = css`
    width: 100%;
    display: flex;
    &>.left{
        flex-grow: 1;
    }
`;
function UserAllowanceContainer({children, ...props}){
    return (
        <div css={UserAllowanceContainerCSS} {...props}>
            {children}
        </div>
    )
}
export {UserAllowanceContainer}