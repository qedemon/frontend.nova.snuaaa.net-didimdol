import React, { useCallback, useEffect } from "react";
import { MembersViewTable } from "./Components";
import request from "../../../Utility/Connection";

function MembersView({members=[], onChange}){
    const onCheckBoxChanged = useCallback(
        (typeof(onChange)==="function")?
            (id)=>(e)=>{
                onChange(id, e.target.checked);
            }:
            (_)=>(e)=>{

            }
        ,
        [onChange]
    )
    return (
        <MembersViewTable>
            <tbody>
                <tr>
                    <th>가입 번호</th>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>과정</th>
                    <th>입학년도</th>
                    <th>전공</th>
                    <th>가입비 납부</th>
                    <th>입금자명</th>
                </tr>
                {
                    members.map(
                        ({aaaNo, name, id, mobile, email, course, schoolNo, major, paid, depositor}, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{aaaNo}</td>
                                    <td>{name}</td>
                                    <td>{id}</td>
                                    <td>{mobile}</td>
                                    <td>{email}</td>
                                    <td>{course}</td>
                                    <td>{schoolNo}</td>
                                    <td>{major}</td>
                                    <td>
                                        <input type="checkbox" defaultChecked={paid} onChange={onCheckBoxChanged(id)}/>
                                    </td>
                                    <td>{depositor}</td>
                                </tr>
                            )
                        }
                    )
                }
            </tbody>
        </MembersViewTable>
    )
}

export default MembersView;