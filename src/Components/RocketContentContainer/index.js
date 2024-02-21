/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";
import { ReactComponent as Rocket } from "./Assets/Rocket.svg";

const rocketOff = 80;
const rocketRatio = 250/375;

const ContentContainerCSS = css`
    width: 100%;
    height: 100%;
    &>div{
        position: relative;
        margin-top: calc(${rocketRatio*rocketOff}% + 144px);
        background-color: white;
        &>.title{
            position: absolute;
            width: 100%;
            aspect-ratio: 1 / 1;
            left: 34px;
            top: 16px;
            transform: translateY(-${rocketRatio*rocketOff}%);
            &>div{
                width: max-content;
                &>*{
                    margin: 0px;
                    font-family: Poppins;
                    font-size: 24px;
                    font-weight: 800;
                    line-height: 36px;
                    letter-spacing: 0em;
                    text-align: left;
                }
            }
        }
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
function RocketContentContainer({children, ...props}){
    const [titleChildren, contentChildren] = (Array.isArray(children)?children:[children])
    .reduce(
        ([title, content], item)=>{
            const className=(
                (item)=>{
                    const {props: {className}} = item;
                    return className??"";
                }
            )(item)
            return [
                className.split(" ").includes("title")?[...title, item]:title,
                className.split(" ").includes("content")?[...content, item]:content
            ]
        },
        [[], []]
    );
    return (
        <div css={ContentContainerCSS} {...props}>
            <div>
                <div className="title">
                    <div>
                        {titleChildren}
                    </div>
                </div>
                <Rocket className="rocket"/>
                <div className="content">
                    <div>
                        {contentChildren}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RocketContentContainer;