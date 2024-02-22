import React, { useRef } from "react";
import { Background } from "./Components";
import { LaunchButton, RocketContentContainer } from "../../Components"
import {Form} from "../../Components";
import FormSchema from "./FormSchema";

function Register(props){
    const formController = useRef();
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
                    validationResult && validation && asyncValidation
                ]
            },
            [{}, true]
        );
        console.log(values, validation);
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