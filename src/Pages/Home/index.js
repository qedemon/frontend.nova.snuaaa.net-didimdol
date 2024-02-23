import React from "react";
import { Link } from "react-router-dom";
import { Background, ContentContainer, LaunchButton, LinkMessage, TitleMessage } from "./Components";
import { ReactComponent as Rocket } from "./Assets/Rocket.svg";

function Register(props){
    return (
        <Background>
            <ContentContainer>
                <Rocket/>
                <TitleMessage>별의 세계로 떠나 볼까요?</TitleMessage>
                <LinkMessage>AAA 2024 신입생 가입하기</LinkMessage>
                <Link to="/Register">
                    <LaunchButton>가입하기</LaunchButton>
                </Link>
                <Link to="/UserInfo">
                    <LaunchButton>가입번호 조회</LaunchButton>
                </Link>
            </ContentContainer>
        </Background>
    )
}

export default Register;