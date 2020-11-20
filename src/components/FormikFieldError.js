import React from "react";

const FormikFieldError = (props)=>{

    return <div className="invalid-feedback d-block">{props.children}</div>
}

export default FormikFieldError;