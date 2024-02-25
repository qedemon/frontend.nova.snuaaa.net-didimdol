import React, { useCallback, useRef, useState } from "react";
import { useContext as useModalController } from "../../../Context/Modal";
import { LaunchButton, Input } from "../../../Components";
import { MessageBoxBody, MessageBoxContainer, MessageBoxFooter, MessageBoxHeader } from "../Components/MessageBox/Components";

function DepositSubmitPage({onSubmit, ...props}){
    const controller = useModalController().current;
    const inputRef = useRef();
    const [message, setMessage] = useState("");
    const onClose = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )
    const onSubmitHandler = useCallback(
        ()=>{
            const value = inputRef.current.value;
            if(/신입 \d{2} .{1,}/.test(value)===0){
                setMessage("이름은 신입 학번 이름 입니다.");
            }
            else{
                if(typeof(onSubmit)==="function"){
                    onSubmit(inputRef.current.value);
                }    
            }
        },
        [onSubmit]
    )
    return (
        <MessageBoxContainer onClose={onClose}>
            <MessageBoxHeader>
                <h1>
                    송금하신 계좌 <span>예금주</span>명
                </h1>
                <p>
                    입금확인용으로만 사용됩니다.
                </p>
            </MessageBoxHeader>
            <MessageBoxBody>
                <Input ref={inputRef} placeholder="신입 24 김이름"/>
                <label>{message??"\u00A0"}</label>
            </MessageBoxBody>
            <MessageBoxFooter>
                <LaunchButton onClick={onSubmitHandler}>
                    Submit
                </LaunchButton>
            </MessageBoxFooter>
        </MessageBoxContainer>
    )
}

export default DepositSubmitPage;