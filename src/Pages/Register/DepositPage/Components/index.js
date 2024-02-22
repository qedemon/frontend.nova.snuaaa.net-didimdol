/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";
import {ReactComponent as CloseButton} from "../Assets/CloseButton.svg";
import {ReactComponent as Copybutton} from "../Assets/CopyButton.svg";

const DepositPageContainerCSS = css`
    width: 346px;
    height: 298px;
    background-color: white;
    position: relative;
    &>.closeButton{
        position: absolute;
        top: 16px;
        right: 16px;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
`;

function DepositPageContainer({children, onClose, ...props}){
    return (
        <div css={DepositPageContainerCSS}>
            {children}
            <CloseButton className="closeButton" onClick={onClose} />
        </div>
    )
}

export {DepositPageContainer};

const DepositPageHeaderCSS = css`
    margin: 32px 16px 10px 16px;

    display: flex;
    flex-direction: column;
    align-items: center;

    &>H1{
        width: 235px;
        font-family: Poppins;
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        letter-spacing: 0em;
        text-align: center;
        margin: 0px;
        &>span{
            color: rgba(22, 88, 182, 1);
        }
    }
    &>p{
        margin: 0px;
        margin-top: 16px;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: center;
        text-decoration: underline;
        color: rgba(102, 102, 102, 1);
    }
`;
function DepositPageHeader({children}){
    return (
        <div css={DepositPageHeaderCSS}>
            {children}
        </div>
    )
}
export {DepositPageHeader}

const DepositPageBodyCSS = css`
    display: flex;
    align-items: center;
    gap: 16px;
    &>.content{
        flex-grow: 1;
        &>*{
            font-family: Poppins;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: left;
            color: rgba(22, 88, 182, 1);
        }
    }
    &>.copyButton{
        cursor: pointer;
    }
    margin-bottom: 16px;
`
function DepositPageBody({onCopy, children}){
    return (
        <div css={DepositPageBodyCSS}>
            <div className="content">
                {children}
            </div>
            <Copybutton className="copyButton" onClick={onCopy}/>
        </div>
    )
}
export {DepositPageBody}