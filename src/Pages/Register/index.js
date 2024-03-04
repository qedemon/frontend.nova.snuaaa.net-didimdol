import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Background } from "./Components";
import { LaunchButton, RocketContentContainer } from "../../Components"
import {Form} from "../../Components";
import FormSchema from "./FormSchema";
import {useContext as useAuth} from "../../Context/Auth";
import {useContext as useModalController} from "../../Context/Modal";
import DepositPage from "./DepositPage";
import { useNavigate } from "react-router-dom";
import request from "../../Utility/Connection";
import { WelcomePage } from "../Modal";

function Register(props){
    const navigate = useNavigate();
    const formController = useRef();
    const modalController = useModalController().current;
    const auth = useAuth();
    const register = useCallback(
        async (userInfo)=>{
            try{
                const {data} = await request.post("/user/register", userInfo);
                const {registred, token, error} = data;
                if(error){
                    throw error
                }
                modalController.setChildren(
                    {
                        component: WelcomePage
                    }
                );
                modalController.open();
                await new Promise(
                    (resolve)=>{
                        setTimeout(
                            ()=>{
                                resolve(true);
                            },
                            250
                        )
                    }
                );
                modalController.close();
                auth.setToken(token);
                navigate("/UserInfo");
            }
            catch(error){
                console.log(error);
                alert("가입 실패");
                navigate("/Register");
            }
        },
        []
    )
    const openDepositWindow = useCallback(
        async ()=>{
            const userInfo = {
                name: formController.current.getValue("name"),
                colNo: formController.current.getValue("colNo")
            };
            
            modalController.setChildren(
                {
                    component: DepositPage,
                    props: {
                        userInfo: (
                            (userInfo)=>{
                                const {name, colNo} = userInfo;
                                return {name, colNo};
                            }
                        )(userInfo),
                        onSubmit: ()=>{
                            modalController.close();
                        }
                    }
                }
            );
            modalController.open();
        },
        [modalController, formController]
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
            register(values);
        }
    }
    return (
        <Background>
            <RocketContentContainer>
                <p className="title">AAA 2024</p>
                <p className="title">신입생 가입폼</p>
                <Form ref={formController} formSchema={FormSchema({openDepositWindow})} className="content"/>
                <LaunchButton onClick={onSubmit} className="content">Sign Up</LaunchButton>
            </RocketContentContainer>
        </Background>
    )
}

export default Register;