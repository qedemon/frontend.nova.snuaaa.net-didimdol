import { useState, useEffect } from "react";
import modalContext from "./Context";
import request from "../../Utility/Connection";

function Provider({value, children}){
    return (
        <modalContext.Provider value={value}>
            {
                children
            }
        </modalContext.Provider>
    )
}

export default Provider;