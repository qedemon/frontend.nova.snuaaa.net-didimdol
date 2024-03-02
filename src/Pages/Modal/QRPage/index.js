import React, { useCallback, useState } from "react";
import { useContext as useModalController } from "../../../Context/Modal";
import { LaunchButton } from "../../../Components";
import { MessageBoxBody, MessageBoxContainer, MessageBoxFooter, MessageBoxHeader } from "./Components/MessageBox";
import request from "../../../Utility/Connection";

const types = [
    "가입하기",
    "별모임",
    "디딤돌",
    "소관"
]

async function getQRURL(type){
    const targetURL = await (
        async (type)=>{
            if(type==="가입하기"){
                return "https://didimdol.nova.snuaaa.net/"
            }
            const {data} = await request.get(`qrAuthentication/acquireQRAuthentication/${type}`);
            if(data && data.qrAuthentication){
                const {qrAuthentication} = data;
                if(qrAuthentication?._id){
                    return `https://nova.snuaaa.net:9891/LogQRAuthentication/${qrAuthentication._id}`;
                }
            }
        }
    )(type)
    if(targetURL){
        console.log(targetURL);
        return `https://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=${targetURL}`;
    }
}

function QRPage({...props}){
    const controller = useModalController().current;
    const onClose = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )

    const [typeIndex, setTypeIndex] = useState(0);
    const [qrImageURL, setQRImageURL] = useState();

    const changeIndex = useCallback(
        (add)=>()=>{
            setQRImageURL(null);
            setTypeIndex(
                (typeIndex)=>{
                    const newIndex = typeIndex+add;
                    if(newIndex<0){
                        return 0;
                    }
                    if(newIndex>=types.length){
                        return types.length-1;
                    }
                    return newIndex
                }
            )
        },
        [setTypeIndex]
    );

    const onGenerateClick = useCallback(
        ()=>{
            (
                async ()=>{
                    const qrImageURL = await getQRURL(types[typeIndex]);
                    setQRImageURL(qrImageURL);
                }
            )();
        },
        [typeIndex, setQRImageURL]
    )

    return (
        <MessageBoxContainer onClose={onClose}>
            <MessageBoxHeader>
                <button onClick={changeIndex(-1)}>{"<<"}</button>
                <h1>
                    {types[typeIndex]}
                </h1>
                <button onClick={changeIndex(1)}>{">>"}</button>
            </MessageBoxHeader>
            <MessageBoxBody>
                {
                    qrImageURL?
                        (<img src={qrImageURL}/>):
                        null
                }
            </MessageBoxBody>
            <MessageBoxFooter>
                <LaunchButton onClick={onGenerateClick}>
                    QR 생성하기
                </LaunchButton>
            </MessageBoxFooter>
        </MessageBoxContainer>
    )
}

export default QRPage;