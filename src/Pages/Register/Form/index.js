import React, {forwardRef, useCallback, useRef} from "react";

import FormSchema from "./FormSchema";
import FormController from "./FormController";
import { LaunchButton } from "../../../Components";
const Form = forwardRef(
    (props, ref)=>{
        const controllerRef = useRef(new FormController(FormSchema));
        const onSubmitClicked = useCallback(
            ()=>{
                console.log(controllerRef.current.getValues());
            },
            [controllerRef]
        );
        return (
            <>
                {
                    controllerRef.current.render()
                }
                <LaunchButton onClick={onSubmitClicked}>제출하기</LaunchButton>
            </>
        )
    }
)

export default Form;