import React, { useCallback, useEffect, useRef, useState } from "react";
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
    const {authenticationId, expiredAt} = await (
        async (type)=>{
            if(type==="가입하기"){
                return {
                    authenticationId: "register",
                    expiredAt: null
                }
            }
            const {data} = await request.get(`qrAuthentication/acquireQRAuthentication/${type}`);
            if(data && data.qrAuthentication){
                const {qrAuthentication} = data;
                return {
                    authenticationId: qrAuthentication?._id,
                    expiredAt: qrAuthentication?.expiredAt?new Date(qrAuthentication.expiredAt):null
                }
            }
        }
    )(type);

    return {
        dataURL: await (
            async (authenticationId)=>{
                const {data} = await request.get(`qrAuthentication/getQRImage/${authenticationId}`);
                console.log(data?.targetURL);
                return data?.dataURL;
            }
        )(authenticationId),
        timeToReload: expiredAt?(expiredAt.getTime()-Date.now())/2+10000:null
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
    const [timeToReload, setTimeToReload] = useState(null);
    const timer = useRef(null);

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

    const resetTimeToReload = useCallback(
        (timeToReload)=>{
            if(timer.current){
                clearInterval(timer.current);
                timer.current = null;
            }

            setTimeToReload(timeToReload);

            if(timeToReload!==null){
                if(timeToReload>0){
                    timer.current = setInterval(
                        ()=>{
                            setTimeToReload((timeToReload)=>timeToReload-1000)
                        }
                        ,1000
                    )
                }
            }
        },
        [setTimeToReload, timer]
    )

    const generateQR = useCallback(
        ()=>{
            (
                async ()=>{
                    const {dataURL: qrImageURL, timeToReload} = await getQRURL(types[typeIndex]);
                    setQRImageURL(qrImageURL);
                    resetTimeToReload(timeToReload);
                }
            )();
        },
        [typeIndex, setQRImageURL, resetTimeToReload]
    )

    useEffect(
        ()=>{
            resetTimeToReload(null);
        },
        [typeIndex]
    )
    useEffect(
        ()=>{
            if(timeToReload<=0){
                generateQR();
            }
        },
        [timeToReload]
    )

    const formattedTimeString = (
        (milliseconds)=>{
            if(milliseconds===null){
                return "";
            }
            let seconds = Math.floor(milliseconds / 1000);
    
            // 초를 분과 초로 변환
            let minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            
            // 분과 초가 한 자리수일 경우 앞에 '0'을 추가
            minutes = minutes.toString().padStart(2, '0');
            seconds = seconds.toString().padStart(2, '0');
            
            return `${minutes}:${seconds}`;
        }
    )(timeToReload);

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
                <p className="label">{formattedTimeString}</p>
            </MessageBoxBody>
            <MessageBoxFooter>
                <LaunchButton onClick={generateQR}>
                    QR 생성하기
                </LaunchButton>
            </MessageBoxFooter>
        </MessageBoxContainer>
    )
}

export default QRPage;