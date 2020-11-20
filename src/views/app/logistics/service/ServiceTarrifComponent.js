import React, {useEffect, useState} from "react"
import {FormGroup, Label, Card, CardBody, Button} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import FormikSelect from "../../../../containers/forms/FormikSelect";
import {handleChange} from "../../../../helpers/Utils";
import {Field, FieldArray} from "formik";
import TariffConfigurationComponent from "./TariffConfigurationComponent";
import {servicePath} from "../../../../constants/defaultValues";
import {loadFormSelectOptions} from "../../../../helpers/DataManagement";

const measurementUnitUrl = servicePath + "measurement-unit"

const ServiceTariffComponent = ({chargeModeOptions, currencyOptions, measurementMetricOptions}) => {
    const [measurementUnitOptions, setMeasurementUnitOptions] = useState([])
    const [selectedMeasurementMetric, setSelectedMeasurementMetric] = useState(0)

    useEffect(()=>{
        let updatedUnitUrl = selectedMeasurementMetric ? measurementUnitUrl + "?metricId=" + selectedMeasurementMetric : measurementUnitUrl
        getChargeMeasurementUnitOptions(updatedUnitUrl)
    }, [selectedMeasurementMetric])


    const getChargeMeasurementUnitOptions = (unitUrl)=>{
        loadFormSelectOptions(unitUrl, setMeasurementUnitOptions).then()
    }

    const onChangeMetric = (option) =>{
        setSelectedMeasurementMetric(option.value)
        console.log(selectedMeasurementMetric)
        //getMarketPriceUnits(unitUrl + "?metricId=" + selectedMarketPriceMetric).then()
    }

    return (
        <Card>
            <CardBody>
                <FormGroup>
                    <Label>
                        <IntlMessages id="pages.charge-mode"/>
                    </Label>
                    <Field
                        className="form-control"
                        name="serviceTariff.chargingModeId"
                        component={FormikSelect}
                        options={chargeModeOptions}
                        handleChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        <IntlMessages id="pages.currency"/>
                    </Label>
                    <Field
                        className="form-control"
                        name="serviceTariff.currencyId"
                        component={FormikSelect}
                        options={currencyOptions}
                        handleChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        <IntlMessages id="menu.measurement-metric"/>
                    </Label>
                    <Field
                        className="form-control"
                        component={FormikSelect}
                        options={measurementMetricOptions}
                        handleChange={onChangeMetric}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        <IntlMessages id="menu.measurement-unit"/>
                    </Label>
                    <Field
                        className="form-control"
                        name="serviceTariff.measurementUnitId"
                        component={FormikSelect}
                        options={measurementUnitOptions}
                        handleChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        <IntlMessages id="order.minimum-order"/>
                    </Label>
                    <Field
                        className="form-control"
                        name="serviceTariff.minimumOrder"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        <IntlMessages id="order.maximum-order"/>
                    </Label>
                    <Field
                        className="form-control"
                        name="serviceTariff.maximumOrder"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>
                        <IntlMessages id="provider.service-tariff-charges"/>
                    </Label>
                    <FieldArray name="serviceTariff.serviceTariffCharges">
                        {
                            (fieldArrayProps) => {
                                const { push, remove, form } = fieldArrayProps
                                const { values } = form
                                const { serviceTariff } = values
                                const { serviceTariffCharges } = serviceTariff
                                console.log("Service Tariff", serviceTariff)
                                console.log("Service Tariff Charges", serviceTariffCharges)
                                return (
                                    <div>
                                        {serviceTariffCharges.map((charge, index) =>(
                                            <div key={index}>
                                                <TariffConfigurationComponent
                                                    index={index}
                                                    fromUnitFieldName={`serviceTariff.serviceTariffCharges[${index}].fromUnit`}
                                                    toUnitFieldName={`serviceTariff.serviceTariffCharges[${index}].toUnit`}
                                                    chargeFieldName={`serviceTariff.serviceTariffCharges[${index}].charge`}
                                                    remove={remove}
                                                />
                                            </div>
                                        ))}
                                        <div className="text-center">
                                            <Button
                                                outline
                                                color="primary"
                                                className="mt-3 mb-3"
                                                onClick={() => push({})}
                                            >
                                                <i className="simple-icon-plus btn-group-icon" />{" "}
                                                <IntlMessages id="provider.add-limit" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    </FieldArray>
                </FormGroup>
            </CardBody>
        </Card>
    )
}

export default ServiceTariffComponent