import React, { useState } from "react";
import { FormItemContainer } from "./Components";

class FormController{
    constructor(formSchema){
        this.schema = formSchema;
    }
    getValue(key){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        return item?.ref?.value;
    }
    setValue(key, value){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        if(item && item.ref){
            item.ref.value=value;
        }
    }
    getValues(){
        return this.schema.reduce(
            (result, {key, ref})=>({...result, [key]: this.getValue(key)}),
            {}
        );
    }
    setMessage(setMessages){
        if(typeof(setMessages) === "function"){
            this._setMessagesHook=setMessages;
        }
        return (key, message)=>{
            this.setField(key, "message", message);
            this._setMessagesHook((messages)=>({...messages, [key]: message}));
        }
    }
    getField(key, field){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        return item?item[field]:undefined;
    }
    setField(key, field, value){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        if(item){
            item[field]=value;
        }
    }
    updateRef(key){
        return (ref)=>{
            this.setField(key, "ref", ref);
        }
    }
    render(){
        const [messages, setMessages] = useState({});
        return this.schema.map(
            ({key, label, validate, component: Component, property, add})=>{
                const onChange = (e)=>{
                    const value = this.getValue(key);
                    const {result, message} = validate({key, value}, this);
                    this.setMessage(setMessages)(key, message);
                }
                const addComponent = (
                    (add)=>{
                        if(!add)
                            return null;
                        const Component = add.component;
                        const {children, handlers, ...props} = add.property;
                        const editedHandlers = Object.entries(handlers).reduce(
                            (result, [handlerKey, handler])=>{
                                return {
                                    ...result,
                                    [handlerKey]: ()=>{
                                        return handler({key, value: this.getValue(key)}, this);
                                    }
                                }
                            },
                            {}
                        )
                        return (
                            <Component className="add" {...props} {...editedHandlers}>{children}</Component>
                        );
                    }
                )(add)
                return (
                    <FormItemContainer key={key} className={!add?"without-add":""}>
                        <Component className="input" ref={this.updateRef(key)} onChange={onChange} {...property}/>
                        <div className="message">{messages[key]}</div>
                        {addComponent}
                    </FormItemContainer>
                )
            }
        )
    }
}

export default FormController;