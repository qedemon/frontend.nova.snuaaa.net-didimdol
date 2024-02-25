import React, { useCallback } from "react";
import { useContext as useModalController } from "../../../Context/Modal";
import { LaunchButton } from "../../../Components";
import { MessageBoxBody, MessageBoxContainer, MessageBoxFooter, MessageBoxHeader } from "../Components/MessageBox/Components";
import CopyBody from "../Components/CopyBody";

const accountName = process.env.REACT_APP_ACCOUNT_NAME;
const accountNo = process.env.REACT_APP_ACCOUNT_NO;

function DepositPage({onSubmit, ...props}){
    const controller = useModalController().current;
    const onClose = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )
    const onCopy = useCallback(
        ()=>{
            navigator.clipboard.writeText(`${accountName} ${accountNo}`);
        },
        []
    )
    return (
        <MessageBoxContainer onClose={onClose}>
            <MessageBoxHeader>
                <h1>
                    가입비 <span>20,000원</span>을<br/> 입금하셨나요?
                </h1>
                <p>
                    동아리 가입비를 납부하셔야지만 가입이 완료됩니다.
                </p>
            </MessageBoxHeader>
            <MessageBoxBody>
                <CopyBody onCopy={onCopy}>
                    <h1>{accountName}<br/>{accountNo}</h1>
                </CopyBody>
            </MessageBoxBody>
            <MessageBoxFooter>
                <LaunchButton onClick={onSubmit}>
                    입금 완료
                </LaunchButton>
            </MessageBoxFooter>
        </MessageBoxContainer>
    )
}

export default DepositPage;