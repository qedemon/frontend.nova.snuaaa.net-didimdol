import React, { useCallback, useState } from "react";
import { UserInfoPageContainer } from "./Components";

function UserInfoPage({controller, ...props}){
    const [userInfo, setUserInfo] = useState(
        {
            name: "김이름",
            aaaNo: "AAA24-00"
        }
    );
    const closeModal = useCallback(
        ()=>{
            controller?.close && controller.close();
        },
        [controller]
    )
    return (
        <UserInfoPageContainer onClose={closeModal}>
            <h2 className="name"><span>{userInfo.name}</span> On-Board</h2>
            <h3 className="label">가입번호</h3>
            <h1 className="AAANo">{userInfo.aaaNo}</h1>
        </UserInfoPageContainer>
    )
}
export default UserInfoPage;