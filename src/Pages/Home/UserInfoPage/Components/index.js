/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";
import {ReactComponent as CloseButton} from "../Assets/CloseButton.svg";

const UserInfoPageContainerCSS = css`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &>.closeButton{
        position: absolute;
        top: 71px;
        right: 18px;
        cursor: pointer;
    }
`;

function UserInfoPageContainer({onClose, children, ...props}){
    return (
        <div css={UserInfoPageContainerCSS} {...props}>
            {children}
            <CloseButton className="closeButton" onClick={onClose}/>
        </div>
    );
}
export {UserInfoPageContainer};