import React, { useCallback, useState } from "react";
import { ModalLayer } from "./Components";

function defaultComponent({controller, ...props}){
    setTimeout(
        ()=>{
            controller.close();
        },
        1000
    )
    return (
        <div {...props}>
            아무것도 없다면 이것을 띄웁니다.
        </div>
    )
}

function Modal({controller, className}){
    const [children, setChildren] = useState([]);
    const [open, setOpen] = useState(false);

    (typeof(controller?.setSetChildren)==="function") && controller.setSetChildren(setChildren);
    (typeof(controller?.setSetOpen)==="function") && controller.setSetOpen(setOpen);

    const onEdgeClick = useCallback(
        ()=>{
            controller.close();
        },
        [controller]
    )

    return (
        <ModalLayer className={`${className} ${open?"open":"close"}`} onEdgeClick={onEdgeClick}>
            {
                open?
                    (
                        (children)=>{
                            return Array.isArray(children)?
                                children:
                                [children]
                        }
                    )(!children||children.length===0?[defaultComponent]:children)
                    .map(
                        (Component, key)=>{
                            return (
                                <Component key={key} controller={controller}/>
                            )
                        }
                    )
                    :
                    null
            }
        </ModalLayer>
    )
}

export default Modal;