/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";
import { ReactComponent as Rocket } from "../Assets/Rocket.svg";

const rocketOff = 80;
const rocketRatio = 250/375;

const ContentContainerCSS = css`
    width: 100%;
    height: 100%;
    &>div{
        position: relative;
        margin-top: calc(${rocketRatio*rocketOff}% + 144px);
        background-color: white;
        &>.rocket{
            position: absolute;
            left: 0px;
            top: 0px;
            transform: translateY(-${rocketOff}%);
            width: 100%;
            height: auto;
        }
        &>.content{
            position: relative;
            &>div{
                padding: 16px;
            }
        }
    }
`
function ContentContainer({children, ...props}){
    return (
        <div css={ContentContainerCSS} {...props}>
            <div>
                <Rocket className="rocket"/>
                <div className="content">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentContainer;