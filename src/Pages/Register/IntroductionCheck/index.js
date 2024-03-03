import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { CheckBox } from "../../../Components";
import { IntroductionCheckContainer } from "./Components";

const IntroductionCheck = forwardRef(
    ({valid, onChange, className}, ref)=>{
        const delegateRef = useRef({value: false});
        const checkBoxRef = useRef();

        useEffect(
            ()=>{
                if(typeof(ref) === "function"){
                    ref(delegateRef.current);
                }
                else{
                    ref.current = delegateRef.current;
                }
            }
            ,[ref, delegateRef.current]
        )

        const onCheckChange = useCallback(
            (checked)=>{
                delegateRef.current.value = checked;
                if(typeof(onChange)==="function"){
                    onChange();
                }
            },
            [delegateRef]
        )

        return (
            <IntroductionCheckContainer className={className}>
                <CheckBox ref={checkBoxRef} onChange={onCheckChange} valid={valid} label="자기소개서는 작성하셨나요?"/>
            </IntroductionCheckContainer>
        )
    }
);

export default IntroductionCheck;