import React, { useEffect } from "react";
import {useContext as useAuth} from "../../Context/Auth";
import {useContext as useModalController} from "../../Context/Modal";
import { useNavigate, useParams } from "react-router-dom";
import request from "../../Utility/Connection";
import { LoginPage } from "../Modal";

function LogQRAuthentication(props){
    const auth = useAuth();
    const modalController = useModalController().current;
    const navigate = useNavigate();
    const params = useParams();
    const authenticationId = params?.authenticationId;
    useEffect(
        ()=>{
            if(!auth?.authorized){
                modalController.setChildren(
                    {
                        component: LoginPage,
                        props: {
                            returnPath: `/LogQRAuthentication/${authenticationId}`
                        }
                    }
                );
                modalController.open();
                return;
            }
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
                }
            )();
        },
        [auth, authenticationId]
    )
    return (
        <div></div>
    )
}

export default LogQRAuthentication;