import Select from "react-select";
import React from "react";
import { Empty } from 'antd'

export const CustomSelectComponent = ({
                                          field, // { name, value, onChange, onBlur }
                                          form: {touched, errors, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                          ...props
}) => (
    <div>
        <Select
            options={props.options}
            value={props.options ? props.options.find(option => option.value === field.value) : ''}
            onChange={ option => setFieldValue(field.name, option.value) }
            onBlur={field.onBlur}
        />
    </div>
);
//
export const CustomSelectComponentII = ({
                                          field, // { name, value, onChange, onBlur }
                                          form: {touched, errors, setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                          ...props
                                      }) => (
    <div>
        <Select
            options={props.options}
            value={props.options ? props.options.find(option => option.value === field.value) : ''}
            onChange={ (option) => props.onHandleChange(option, setFieldValue, field ) }
            onBlur={field.onBlur}
        />
        {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
);

export const CustomEmpty = props => (
    <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description={
            <span>{props.description}</span>
        }
    />
)

export const CustomContainer = props =>(
    <div style={{width: '500px',  margin: '0 auto', textAlign: 'center'}}>
        {props.children}
    </div>
)