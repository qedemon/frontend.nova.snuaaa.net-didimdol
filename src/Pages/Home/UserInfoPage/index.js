import React, { useCallback } from "react";
import { UserInfoPageContainer } from "./Components";

function UserInfoPage({controller, ...props}){
    const closeModal = useCallback(
        ()=>{
            controller?.close && controller.close();
        },
        [controller]
    )
    return (
        <UserInfoPageContainer onClose={closeModal}>
            유저정보페이지야
        </UserInfoPageContainer>
    )
}
export default UserInfoPage;