/** @jsxImportSource @emotion/react */
import React, {forwardRef} from "react";
import {css} from "@emotion/react";
import Background from "../../../Components/Background";
import { ReactComponent as UpperLeft } from "../Assets/UpperLeft.svg";
import { ReactComponent as UpperRight } from "../Assets/UpperRight.svg";

export default Background(
    [
        {
            components: UpperLeft,
            position: Background.Positions.Upper.Left
        },
        {
            components: UpperRight,
            position: Background.Positions.Upper.Right
        }
    ]
);