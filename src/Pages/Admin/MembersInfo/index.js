import React, { useEffect, useState } from "react";
import { MembersInfoContainer, MembersInfoHeader } from "./Components";
import MembersView from "./MembersView";
import request from "../../../Utility/Connection";

async function loadMembers(){
    return await request.get("/user/getAllUsers");
}

function MembersInfo({...props}){
    const [message, setMessage] = useState("");
    const [members, setMembers] = useState([]);
    useEffect(
        ()=>{
            setMessage("불러오는 중");
            loadMembers().then(
                ({data:{users, error}})=>{
                    if(error){
                        console.log(error);
                        return;
                    }
                    setMembers(users??[]);
                    setMessage("불러오기 완료")
                }
            )
        },
        []
    )
    return (
        <MembersInfoContainer>
            <h1>가입 현황</h1>
            <MembersInfoHeader>
                <button>Load</button>
                <button>Save</button>
                <label>{message}</label>
            </MembersInfoHeader>
            <MembersView members={members}></MembersView>
        </MembersInfoContainer>
    )
}

export default MembersInfo;