import { useRef } from "react";
import { MainContainer } from "./Components";
import Modal from "./Modal";
import ModalController from "./Modal/Controller";
import { Provider as ModalProvider } from "../../Context/Modal";

function Main({children, ...props}){
    const modalControllerRef = useRef(new ModalController());
    return (
        <MainContainer {...props}>
            <ModalProvider value = {modalControllerRef}>
                {children}
            </ModalProvider>
            <Modal controller={modalControllerRef.current} className="topLayer"/>
        </MainContainer>
    )
}

export default Main;