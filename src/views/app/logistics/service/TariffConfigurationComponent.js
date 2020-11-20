import React from "react";
import {Button, Card, CardBody, CardTitle, FormGroup, Label} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {Field} from "formik";

const TariffConfigurationComponent = ({index ,fromUnitFieldName, toUnitFieldName, chargeFieldName ,remove}) =>(
    <div key={index}>
        <Card>
            <CardBody>
                <CardTitle>{"Config"}
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
                        <IntlMessages id="provider.tariff-from-unit" />
                    </Label>
                    <Field className="form-control" name={fromUnitFieldName} />
                </FormGroup>
                <FormGroup >
                    <Label className="mt-1">
                        <IntlMessages id="provider.tariff-to-unit" />
                    </Label>
                    <Field className="form-control" name={toUnitFieldName} />
                </FormGroup>
                <FormGroup >
                    <Label className="mt-1">
                        <IntlMessages id="provider.tariff-charge" />
                    </Label>
                    <Field className="form-control" name={chargeFieldName} />
                </FormGroup>
            </CardBody>

        </Card>
    </div>
)

export default TariffConfigurationComponent