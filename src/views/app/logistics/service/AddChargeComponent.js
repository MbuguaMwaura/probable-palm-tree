import React, {useState} from "react";
import {FormGroup, Label, Card, CardBody, CardTitle, Button} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { Field } from "formik";
import FormikSelect from "../../../../containers/forms/FormikSelect";

const AddChargeComponent = ({ index, options ,serviceTypeFieldName, amountFieldName, remove}) =>{
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState('')
    const handleChange = (option, form, field) =>{
        form.setFieldValue(field.name, option.value)
        form.setFieldTouched(field.name, true)
        setSelectedOption(option.label)
    }
    return (
        <div key={index}>
            <Card>
                <CardBody>
                    <CardTitle>{selectedOption ? selectedOption : " Select Service Type"}
                        <div className="custom-control custom-checkbox pl-1 align-self-center d-inline-block float-right">
                            <Button
                                outline
                                color={"theme-3"}
                                className="icon-button ml-1"
                                onClick={() => remove(index)}
                            >
                                <i className="simple-icon-ban" />
                            </Button>
                        </div>
                    </CardTitle>

                    <FormGroup >
                        <Label className="mt-1">
                            <IntlMessages id="provider.service-type-label-text" />
                        </Label>
                        <Field
                            className="form-control"
                            name={serviceTypeFieldName}
                            component={FormikSelect}
                            options={options}
                            handleChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup key={index}>
                        <Label className="mt-4">
                            <IntlMessages id="pages.amount" />
                        </Label>
                        <Field className="form-control" name={amountFieldName} />
                    </FormGroup>
                </CardBody>

            </Card>
        </div>
    )
}

export default AddChargeComponent