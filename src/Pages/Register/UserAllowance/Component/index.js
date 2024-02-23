/** @jsxImportSource @emotion/react */
import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {css} from "@emotion/react";
import {ReactComponent as UnChecked} from "../Assets/CheckBox.svg";
import {ReactComponent as Checked} from "../Assets/CheckBoxChecked.svg";
import {ReactComponent as More} from "../Assets/moreButton.svg";

const CheckBoxCSS = css`
    display: flex;
    align-items: center;
    &>label{
        margin-left: 8px;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;
    }
    text-decoration: underline;
    &.valid{
        text-decoration: none;
    }
`;

const CheckBox = forwardRef(
    ({children, className, onChange, valid, ...props}, ref)=>{
        const delegateRef = useRef({});
        const [checked, setChecked] = useState(false);
        delegateRef.current.checked=checked;
        
        const onClick = useCallback(
            ()=>{
                setChecked((checked)=>!checked);
            },
            [setChecked]
        )
        
        useEffect(
            ()=>{
                (
                    (typeof(ref)==="function")?ref:(target)=>{
                        ref.current=target;
                    }
                )(delegateRef.current);
            },
            [delegateRef.current, ref]
        )

        const onCheckedChange = useCallback(
            ()=>{
                if(typeof(onChange)==="function"){
                    onChange();
                }
            },
            [onChange]
        )
        useEffect(
            ()=>{
                onCheckedChange();
            },
            [checked]
        )
        return (
            <div css={CheckBoxCSS} className={`${className} ${valid===true?"valid":valid===false?"invalid":""}`} onClick={onClick}>
                {checked?(<Checked/>):(<UnChecked/>)}
                <label>{children}</label>
            </div>
        )
    }
)
export {CheckBox}

const MoreButtonCSS = css`

`;
function MoreButton({className, ...props}){
    return (
        <More css={MoreButtonCSS} className={className} {...props}/>
    )
}
export {MoreButton}

const UserAllowanceContainerCSS = css`
    width: 100%;
    display: flex;
    padding: 0px 20px;
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