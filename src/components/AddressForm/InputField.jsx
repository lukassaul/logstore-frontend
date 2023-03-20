import React  from "react";

const InputField = ({ label, name, type, value, handleChange, errMsg }) => (
    <div className={errMsg ? "input-group error" : "input-group"}>
        <label htmlFor="input-field">{label}</label>
        <input 
            type={type}
            value={value}
            onChange={(value) => handleChange(value, name)}
        />
        <span className="msg">{errMsg}</span>
    </div>
);

export default InputField;

