import React, { useContext, useRef } from "react";
import { Background } from "./Components";
import { LaunchButton, RocketContentContainer } from "../../Components"
import {Form} from "../../Components";
import FormSchema from "./FormSchema";
import {useContext as useModalController} from "../../Context/Modal";
import DepositPage from "./DepositPage";

function Register(props){
    const formController = useRef();
    const modalController = useModalController().current;
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
        if(validation || true){
            modalController.setChildren(
                {
                    component: DepositPage,
                    props: {
                        onDeposit: ()=>{
                            console.log("deposit");
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