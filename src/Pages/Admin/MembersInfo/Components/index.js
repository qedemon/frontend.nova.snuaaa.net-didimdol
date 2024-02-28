/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";

const MembersInfoContainerCSS = css`
    width: 100%;
    display: grid;
`;

function MembersInfoContainer({children, ...props}){
    return (
        <div css={MembersInfoContainerCSS} {...props}>
            {children}
        </div>
    )
}

export {MembersInfoContainer};

const MembersInfoHeaderCSS = css`
    display: flex;
    gap: 0px 8px;
    padding: 0px 16px;
`;
function MembersInfoHeader({children, ...props}){
    return (
        <div css={MembersInfoHeaderCSS}>
            {children}
        </div>
    )
}
export {MembersInfoHeader}

const MembersViewTableCSS = css`
    margin: 16px;
    width: calc(100% - 32px);
    border-collapse: collapse;
    & td, & th{
        border: 1px solid black;
    }
    & td{
        padding: 2px;
        font-size: smaller;
    }
`;

function MembersViewTable({children, ...props}){
    return (
        <table css={MembersViewTableCSS}>
            {children}
        </table>
    )
}

export {MembersViewTable}