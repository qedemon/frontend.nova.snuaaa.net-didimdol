import React, { useCallback, useContext, useRef } from "react";
import { Background } from "./Components";
import { LaunchButton, RocketContentContainer } from "../../Components"
import {Form} from "../../Components";
import FormSchema from "./FormSchema";
import {useContext as useAuth} from "../../Context/Auth";
import {useContext as useModalController} from "../../Context/Modal";
import DepositPage from "./DepositPage";
import DepositSubmitPage from "./DepositSubmitPage";
import { useNavigate } from "react-router-dom";
import request from "../../Utility/Connection";
import { setCookie } from "../../Utility/Cookie";

function Register(props){
    const navigate = useNavigate();
    const formController = useRef();
    const modalController = useModalController().current;
    const auth = useAuth();
    const register = useCallback(
        async (userInfo)=>{
            try{
                const {data} = await request.post("/user/register", userInfo);
                const {registed, token, error} = data;
                if(error){
                    throw error
                }
                console.log("register", registed);
                alert("가입되었습니다.");
                modalController.close();
                auth.setToken(token);
                navigate("/UserInfo");
            }
            catch(error){
                console.log(error);
                alert("가입 실패");
                modalController.close();
                navigate("/Register");
            }
        },
        []
    )
    const onSubmit = async ()=>{
        const formResult = await formController.current.getValues({requireSetMessage: true, requireSetValidation: true});
        const [values, validation] = Object.entries(formResult)
        .reduce(
            ([data, validationResult], [key, {value, validation, asyncValidation}])=>{
                return [
                    {
                        ...data,
                        [key]: value
                    },
                    validationResult && validation.result && asyncValidation.result
                ]
            },
            [{}, true]
        );
        if(validation || values.name==="넘기기"){
            modalController.setChildren(
                {
                    component: DepositPage,
                    props: {
                        userInfo: (
                            (userInfo)=>{
                                const {name, colNo} = userInfo;
                                return {name, colNo};
                            }
                        )(values),
                        onSubmit: ()=>{
                            modalController.setChildren(
                                {
                                    component: DepositSubmitPage,
                                    props: {
                                        onSubmit: (value)=>{
                                            register({...values, depositor: value})
                                        }
                                    }
                                }
                            )
                            modalController.open();
                        }
                    }
                }
            );
            modalController.open();
        }
    }
    return (
        <Background>
            <RocketContentContainer>
                <p className="title">AAA 2024</p>
                <p className="title">신입생 가입폼</p>
                <Form ref={formController} formSchema={FormSchema} className="content"/>
                <LaunchButton onClick={onSubmit} className="content">Sign Up</LaunchButton>
            </RocketContentContainer>
        </Background>
    )
}

export default Register;