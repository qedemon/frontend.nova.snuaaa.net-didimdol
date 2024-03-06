import React, { useCallback, useEffect, useRef, useState } from "react";
import {useContext as useAuth} from "../../Context/Auth";
import {useContext as useModalController} from "../../Context/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Background, ChangePasswordContainer, ChangePasswordFormContainer, LogQRAuthenticationContainer } from "./Components";
import request from "../../Utility/Connection";
import { LoginPage } from "../Modal";
import { Form, Input, LaunchButton } from "../../Components";
import FormSchema from "./FormSchema";

function ChangePassword(props){
    const modalController = useModalController().current;
    const formController = useRef();
    const params = useParams();
    const passwordResetId = params?.passwordResetId;

    return (
        <Background>
            <ChangePasswordContainer>
                <h1>비밀번호 변경하기</h1>
                <ChangePasswordFormContainer>
                    <Form ref={formController} formSchema={FormSchema}/>
                </ChangePasswordFormContainer>
                <LaunchButton>비밀번호 변경</LaunchButton>
            </ChangePasswordContainer>
        </Background>
    )
}

export default ChangePassword;