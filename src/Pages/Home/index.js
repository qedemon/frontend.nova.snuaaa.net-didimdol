import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Background, ContentContainer, LaunchButton, LinkMessage, TitleMessage } from "./Components";
import { ReactComponent as Rocket } from "./Assets/Rocket.svg";
import {useContext as useModalController} from "../../Context/Modal";
import {useContext as useAuth} from "../../Context/Auth";
import UserInfoPage from "./UserInfoPage";
import LoginPage from "./LoginPage";

function Home({userInfoOpen, ...props}){
    const auth = useAuth();
    const modalController = useModalController().current;
    const openUserInfo = useCallback(
        ()=>{
            modalController.setChildren(
                (auth?.authorized)?
                {
                    component: UserInfoPage,
                    props: {
                        userInfo: auth.userInfo
                    }
                }
                :
                {
                    component: LoginPage
                }
            );
            modalController.open();
        },
        [modalController, auth]
    )
    useEffect(
        ()=>{
            if(userInfoOpen){
                openUserInfo();
            }
        },
    )
    return (
        <Background>
            <ContentContainer>
                <Rocket/>
                <TitleMessage>별의 세계로 떠나 볼까요?</TitleMessage>
                <LinkMessage>AAA 2024 신입생 가입하기</LinkMessage>
                <Link to="/Register">
                    <LaunchButton>가입하기</LaunchButton>
                </Link>
                <LaunchButton onClick={openUserInfo}>가입번호 조회</LaunchButton>
            </ContentContainer>
        </Background>
    )
}

export default Home;