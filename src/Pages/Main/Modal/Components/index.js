/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const ModalLayerCSS = css`
    background-color: rgba(100, 100, 100, 0.8);
    width: 100%;
    height: 100%;
    display: none;
    &.open{
        display:flex;
    }
    justify-content: center;
    align-items: center;
    &>div{
        position relative;
    }
`;
function ModalLayer({children, ...props}){
    return (
        <div css={ModalLayerCSS} {...props}>
            <div>
                {children}
            </div>
        </div>
    );
}
export {ModalLayer};