import { MainContainer } from "./Components";

function Main({children, ...props}){
    return (
        <MainContainer {...props}>
            {children}
        </MainContainer>
    )
}

export default Main;