import React from "react"
import { LaunchButton, Input } from "../../Components";
import UserAllowance from "./UserAllowance";

import Connection from "../../Utility/Connection";

async function checkId(value){
    const {data} = await Connection.get(`/user/checkId/${value}`);
    if(data){
        const {check, error} = data;
        if(error){
            return {
                available: false,
                message: error
            }
        }
        return {
            available: check?.check,
            message: check.message
        }
    }
    return {
        available: false,
        message: "연결 실패"
    }
}

export default [
    {
        key: "name",
        label: "이름",
        component: Input,
        property: {
            type: "text",
            placeholder: "이름",
        },
        validate: ({value})=>{
            return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한 글자 이상 입력해주세요."
            }
        }
    },
    {
        key: "colNo",
        label: "학번",
        component: Input,
        property: {
            type: "text",
            placeholder: "학번 ex) 2024"
        },
        validate: ({value})=>{
            return (/^\d{4}$/.test(value))?
            {
                result: true
            }:
            {
                result: false,
                message: "학번 형식에 맞추어 주세요."
            }
        }
    },
    {
        key: "major",
        label: "학과",
        component: Input,
        property: {
            type: "text",
            placeholder: "학과"
        },
        validate: ({value})=>{
            return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한 글자 이상 입력해주세요."
            }
        }
    },
    {
        key: "email",
        label: "이메일",
        component: Input,
        property: {
            type: "text",
            placeholder: "aaa@snu.ac.kr"
        },
        validate: ({value})=>{
            return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))?
            {
                result: true
            }:
            {
                result: false,
                message: "이메일 형식에 맞추어 주세요."
            }
        }
    },
    {
        key: "mobile",
        label: "HP",
        component: Input,
        property: {
            type: "text",
            placeholder: "010-0000-0000"
        },
        validate: ({value})=>{
            return (/^\d{3}-\d{3,4}-\d{4}$/.test(value))?
            {
                result: true
            }:
            {
                result: false,
                message: "전화번호 형식에 맞추어 주세요."
            }
        }
    },
    {
        key: "id",
        label: "아이디",
        component: Input,
        property: {
            type: "text",
            placeholder: "아이디",
            sideButtonLabel: "중복체크"
        },
        validate: ({value})=>{
            return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한 글자 이상 입력해주세요."
            }
        },
        asyncValidate: async ({value})=>{
            const {available, message} = await checkId(value);
            return {
                result: available,
                message: message
            }
        },
        handlers: {
            onSideButtonClick: async ({key, value}, controller)=>{
                const {available, message} = await checkId(value);
                controller.setMessage(key, message);
                controller.setField(key, "validation", available);
            }
        }
    },
    {
        key: "password",
        label: "비밀번호",
        component: Input,
        property: {
            type: "password",
            placeholder: "비밀번호",
            sideButtonLabel: "Show"
        },
        validate: ({value})=>{
            return (value.length>0)?
            {
                result: true
            }:
            {
                result: false,
                message: "적어도 한글자는 입력해 주세요."
            }
        },
        handlers: {
            onSideButtonClick: ({key, value}, controller)=>{
                controller.setField(key, "property", (property)=>{
                    return (property.type==="password")?
                        {
                            ...property,
                            type: "text",
                            sideButtonLabel: "Hide"
                        }:
                        {
                            ...property,
                            type: "password",
                            sideButtonLabel: "Show"
                        }
                });
            }
        }
    },
    {
        key: "passwordRetype",
        label: "비밀번호",
        component: Input,
        property: {
            type: "password",
            placeholder: "비밀번호 확인",
            sideButtonLabel: "Show"
        },
        validate: ({value}, controller)=>{
            return (value === controller.getValue("password"))?
            {
                result: true
            }:
            {
                result: false,
                message: "비밀번호가 일치하지 않습니다."
            }
        },
        watch: ["password"],
        handlers: {
            onSideButtonClick: ({key, value}, controller)=>{
                controller.setField(key, "property", (property)=>{
                    return (property.type==="password")?
                        {
                            ...property,
                            type: "text",
                            sideButtonLabel: "Hide"
                        }:
                        {
                            ...property,
                            type: "password",
                            sideButtonLabel: "Show"
                        }
                });
            }
        }
    },
    {
        key: "allowance",
        label: "개인정보동의",
        component: UserAllowance,
        property: {
        },
        validate: ({value}, controller)=>{
            return value?
            {
                result: true
            }:
            {
                result: false,
                message: "개인 정보 활용 동의에 체크해 주세요."
            }
        },
    }
]