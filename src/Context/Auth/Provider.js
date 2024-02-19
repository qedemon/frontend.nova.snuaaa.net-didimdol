import { useState, useEffect } from "react";
import authContext from "./Context";
import request from "../../Utility/Connection";

function Provider({children}){
    const [auth, setAuth] = useState(null);
    useEffect(
        ()=>{
            if(auth === null){
                (
                    async ()=>{
                        const {data: auth} = await request.get("/user/whoAmI");
                        setAuth(auth);
                    }
                )()
            }
        },
        [auth]
    )
    return (
        <authContext.Provider value={auth}>
            {
                auth?
                children:
                (<></>)
            }
        </authContext.Provider>
    )
}

export default Provider;