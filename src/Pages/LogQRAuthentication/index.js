import React, { useEffect } from "react";
import {useContext as useAuth} from "../../Context/Auth";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../Utility/Connection";

function LogQRAuthentication(props){
    const navigate = useNavigate();
    const params = useParams();
    const authenticationId = params?.authenticationId;
    useEffect(
        ()=>{
            console.log(authenticationId);
            (
                async ()=>{
                    const {data} = await request.post("qrAuthentication/logQRAuthentication/", {
                        authenticationId
                    });
                    if(data){
                        const {qrAuthenticationLog} = data;
                        if(qrAuthenticationLog?.message){
                            alert(qrAuthenticationLog.message);
                            navigate("/");
                            return;
                        }
                    }
                    alert("인증 실패");
                    navigate("/");

                }
            )()
        },
        [authenticationId]
    )
    return (
        <div></div>
    )
}

export default LogQRAuthentication;