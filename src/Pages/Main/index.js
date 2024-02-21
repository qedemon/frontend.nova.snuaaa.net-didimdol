import { useRef } from "react";
import { MainContainer } from "./Components";
import Modal from "./Modal";
import ModalController from "./Modal/Controller";

function Main({children, ...props}){
    const modalControllerRef = useRef(new ModalController());
    return (
        <MainContainer {...props}>
            {children}
            <Modal controller={modalControllerRef.current} className="topLayer"/>
        </MainContainer>
    )
}

export default Main;