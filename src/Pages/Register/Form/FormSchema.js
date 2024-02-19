import React from "react"
import { LaunchButton, Input } from "../../../Components";

export default [
    {
        key: "name",
        label: "이름",
        component: Input,
        property: {
            type: "text",
            placeholder: "이름"
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
            placeholder: "아이디"
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
        add: {
            component: LaunchButton,
            property: {
                children: "아이디 확인",
                handlers: {
                    onClick: ({key, value}, controller)=>{
                        controller.setMessage()(key, value);
                    }
                }
            }
        }
    },
    {
        key: "password",
        label: "비밀번호",
        component: Input,
        property: {
            type: "password",
            placeholder: "비밀번호"
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
        }
    },
    {
        key: "passwordRetype",
        label: "비밀번호",
        component: Input,
        property: {
            type: "password",
            placeholder: "비밀번호 확인"
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
        }
    }
]