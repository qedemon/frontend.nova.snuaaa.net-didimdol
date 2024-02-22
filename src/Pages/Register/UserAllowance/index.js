import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { CheckBox, UserAllowanceContainer } from "./Component";
import { useContext as useModalController } from "../../../Context/Modal";
import AllowancePage from "./AllowancePage";

const UserAllowance = forwardRef(
    ({valid, onClick, className, ...props}, ref)=>{
        const modalController = useModalController().current;
        const CheckBoxRef = useRef();
        const delegate = useRef(
            {
                ref: CheckBoxRef,
                get value(){
                    return this.ref?.current?.checked;
                }
            }
        );
        useEffect(
            ()=>{
                (
                    typeof(ref) === "function"?ref:(targetRef)=>{
                        ref.current=targetRef;
                    }
                )(delegate.current);
            }
        )
        const onCheckBoxClick = useCallback(
            (e)=>{
                if(typeof(onClick) === "function"){
                    onClick(e);
                }
            },
            [onClick]
        )
        const onButtonClicked = useCallback(
            (e)=>{
                modalController.setChildren(AllowancePage);
                modalController.open();
            },
            [modalController]
        )
        return (
            <UserAllowanceContainer className={className}>
                <CheckBox ref={CheckBoxRef} onClick={onCheckBoxClick} className="left">개인 정보 활용 동의</CheckBox>
                <button type="button" className="right" onClick={onButtonClicked}>{">>"}</button>
            </UserAllowanceContainer>
        )
    }
)

export default UserAllowance;