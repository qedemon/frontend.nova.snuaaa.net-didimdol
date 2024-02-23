/** @jsxImportSource @emotion/react */
import React, {forwardRef, useCallback} from "react";
import {css} from "@emotion/react";

import {ReactComponent as MainBackground} from "../Assets/main.svg"
import { useNavigate } from "react-router-dom";

const MainContainerCSS = css`
    width: 100%;
    height: 100%;
`

function MainContainer({...props}){
    const navigate = useNavigate();
    const onClick = useCallback(
        ()=>{
            navigate("/");
        },
        [navigate]
    )
    return (
        <div css={MainContainerCSS} onClick={onClick}>
            <MainBackground/>
        </div>
    )
}
export {MainContainer};