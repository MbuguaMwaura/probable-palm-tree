import React from "react"
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";

const FormikSelect = (props) =>{
    let form = props.form
    let field = props.field
    return(
        <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="commodityCategoryId"
            value={props.value}
            onChange={option => props.handleChange(option, form, field)}
            options={props.options}
        />
    )
}


export default FormikSelect