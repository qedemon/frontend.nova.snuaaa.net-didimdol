import React, { useEffect } from "react";
import MembersInfo from "./MembersInfo";
import {useContext as useAuth} from "../../Context/Auth";
import { useNavigate } from "react-router-dom";

function Admin(props){
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(
        ()=>{
            if(!auth?.userInfo?.isStaff)
            navigate("/StaffLogin");
        }
    )
    return auth?.userInfo?.isStaff?
    (
        <MembersInfo/>
    ):
    <></>
}

export default Admin;