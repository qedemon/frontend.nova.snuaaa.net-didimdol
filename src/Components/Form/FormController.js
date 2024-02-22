import React, { useState } from "react";
import { FormItemContainer } from "./Components";

class FormController{
    constructor(formSchema){
        this.schema = formSchema;
    }
    getWatchers(key){
        return this.schema
        .filter(
            ({watch})=>{
                return watch && watch.some((watchKey)=>watchKey===key);
            }
        );
    }
    getValue(key){
        const item = this.schema.find(
            (item)=>{
                return item.key===key;
            }
        );
        return item?.ref?.value;
    }
    getValues(options={}){
        return this.schema.reduce(
            (result, {key, validate})=>{
                const value = this.getValue(key);
                const validation = validate({key, value}, this);
                if(options?.requireSetMessage){
                    this.setMessage()(key, validation.message);
                }
                return {
                    ...result, 
                    [key]: {
                        value,
                        validation,
                    }
                }
            }
            ,{}
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
    setValidation(setValidations){
        if(typeof(setValidations) === "function"){
            this._setValidationsHook=setValidations;
        }
        return (key, validation)=>{
            this.setField(key, "validation", validation);
            this._setValidationsHook((validations)=>({...validations, [key]: validation}))
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
        const [validations, setValidations] = useState({});
        return this.schema.map(
            ({key, validate, component: Component, property, add})=>{
                const onChange = (e)=>{
                    const value = this.getValue(key);
                    const {result, message} = validate({key, value}, this);
                    this.setMessage(setMessages)(key, message);
                    this.setValidation(setValidations)(key, result);
                    this.getWatchers(key).forEach(
                        ({key, validate})=>{
                            const {result, message} = validate({key, value: this.getValue(key)}, this);
                            this.setMessage(setMessages)(key, message);
                            this.setValidation(setValidations)(key, result);
                        }
                    )
                }
                return (
                    <FormItemContainer key={key} className={!add?"without-add":""}>
                        <Component className="input" valid={validations[key]} ref={this.updateRef(key)} onChange={onChange} {...property}/>
                        <div className="message">{messages[key]??'\u00A0'}</div>
                    </FormItemContainer>
                )
            }
        )
    }
}

export default FormController;