import React, { useCallback } from "react";
import { DepositPageBody, DepositPageContainer, DepositPageHeader } from "./Components";
import { LaunchButton } from "../../../Components";

function DepositPage({controller, onDeposit, ...props}){
    console.log(onDeposit);
    const onClose = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )
    const onCopy = useCallback(
        ()=>{
            navigator.clipboard.writeText("농협 3010276717481");
        },
        []
    )
    return (
        <DepositPageContainer onClose={onClose}>
            <DepositPageHeader>
                <h1>
                    가입비 <span>20,000원</span>을<br/> 입금하셨나요?
                </h1>
                <p>
                    동아리 가입비를 납부하셔야지만 가입이 완료됩니다.
                </p>
            </DepositPageHeader>
            <DepositPageBody onCopy={onCopy}>
                <h1>서울대학교아마추어천문회<br/>농협 3010276717481</h1>
            </DepositPageBody>
            <LaunchButton onClick={onDeposit}>
                입금 완료
            </LaunchButton>
        </DepositPageContainer>
    )
}

export default DepositPage;