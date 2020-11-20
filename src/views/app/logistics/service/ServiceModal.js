import React, { useEffect, useState } from "react"
import {handleChange, setFormValues} from "../../../../helpers/Utils"
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {defaultColorValue, servicePath} from "../../../../constants/defaultValues";
import {loadFormSelectOptions} from "../../../../helpers/DataManagement";
import Loader from "react-loader-spinner";
import FormikFieldError from "../../../../components/FormikFieldError";
import FormikSelect from "../../../../containers/forms/FormikSelect";
import AddChargeComponent from "./AddChargeComponent";
import ServiceTariffComponent from "./ServiceTarrifComponent";

const locationUrl = servicePath + "location/"
const serviceTypesUrl = servicePath + "logistics-service-types/"
const measurementMetricUrl = servicePath + "measurement-metric/"
const currencyURl = servicePath + "currency/"
const chargeModeUrl = servicePath + "charging-mode/"

const SubCategoryModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl, errorMessage}) => {
    useEffect(()=>{
        getLocationOptions().then()
        getServiceTypeOptions()
        getChargeModeOptions()
        getCurrencyOptions()
        getMeasurementMetricOptions()
    }, [])

    const [locationOptions, setLocationOptions] = useState([])
    const [ serviceTypeOptions, setServiceTypesOptions] = useState([])
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [measurementMetricOptions, setMeasurementMetricOptions] = useState([])
    const [chargeModeOptions, setChargeModeOptions] = useState([])
    // eslint-disable-next-line
    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    const validate = values => {
        let errors = {}

        if (!values.serviceName) {
            errors.serviceName = errorMessage.serviceName
        }
        return errors;
    }

     const getLocationOptions = async () =>{
         loadFormSelectOptions(locationUrl, setLocationOptions).then()
    }

    const getServiceTypeOptions = ()=>{
        loadFormSelectOptions(serviceTypesUrl, setServiceTypesOptions).then()
    }

    const getChargeModeOptions = ()=>{
        loadFormSelectOptions(chargeModeUrl, setChargeModeOptions).then()
    }

    const getCurrencyOptions = ()=>{
        loadFormSelectOptions(currencyURl, setCurrencyOptions).then()
    }

    const getMeasurementMetricOptions = ()=>{
        loadFormSelectOptions(measurementMetricUrl, setMeasurementMetricOptions).then()
    }

    const initialValues = {
        serviceName: '',
        description: '',
        addedCharges: [{amount:'', serviceTypeId: ''}],
        serviceTariff:{serviceTariffCharges: []}
    }

    return (
        <Modal
            isOpen={modalOpen}
            toggle={toggleCrudModal}
            wrapClassName="modal-right"
            backdrop="static"
        >
            <ModalHeader toggle={() =>toggleCrudModal(modalTitle, '' , 0)}>
                <IntlMessages id={modalTitle} />
            </ModalHeader>
            <ModalBody>
                <Formik
                    validate={validate}
                    onSubmit={(values, formikActions) => {
                        console.log(values)
                        console.log(JSON.stringify(values))
                        onFormSubmit(values, modalState, apiUrl, id,formikActions)
                    }}
                    initialValues={initialValues}
                >
                    {({
                          errors,
                          touched,
                          isValidating,
                          isSubmitting,
                          field,
                          setFieldValue,
                          setFieldTouched,
                          onBlur,
                    }) => (
                        <Form>
                            <FormGroup>
                                <Label>
                                    <IntlMessages id="pages.name" />
                                </Label>
                                <Field className="form-control" name="serviceName"/>
                                <ErrorMessage name="serviceName" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.description" />
                                </Label>
                                <Field className="form-control" name="description"/>
                                <ErrorMessage name="description" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.origin" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="locationFromId"
                                    component={FormikSelect}
                                    options={locationOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="locationFromId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.destination" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="locationToId"
                                    component={FormikSelect}
                                    options={locationOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="locationToId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    <IntlMessages id="provider.service-tariff" />
                                </Label>
                                <ServiceTariffComponent
                                    chargeModeOptions={chargeModeOptions}
                                    currencyOptions={currencyOptions}
                                    measurementMetricOptions={measurementMetricOptions}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="provider.additional-charge" />
                                </Label>
                                <FieldArray name="addedCharges">
                                    {
                                        (fieldArrayProps) => {
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const { addedCharges } = values
                                            return (
                                                <div>
                                                    {addedCharges.map((charge, index) =>(
                                                        <div key={index}>
                                                            <AddChargeComponent
                                                                index={index}
                                                                options={serviceTypeOptions}
                                                                serviceTypeFieldName={`addedCharges[${index}].serviceTypeId`}
                                                                amountFieldName={`addedCharges[${index}].amount`}
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
                                                            <IntlMessages id="provider.add-service-charge" />
                                                        </Button>
                                                    </div>
                                                    <hr/>
                                                </div>
                                            )
                                        }
                                    }
                                </FieldArray>
                            </FormGroup>
                            <div className="text-center" >
                                <Loader visible= {isSubmitting} type="ThreeDots" color={defaultColorValue} width={50} height={50} />
                                <Button color="secondary" outline onClick={()=>toggleCrudModal(modalTitle, '', 0)} disabled={isSubmitting} >
                                    <IntlMessages id="pages.cancel" />
                                </Button> {" "}
                                <Button color="primary" type="submit" disabled={isSubmitting} >
                                    <IntlMessages id="pages.save" />
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalBody>
            <ModalFooter>
                {/*<Button color="secondary" outline onClick={()=>toggleModal('', '')}>*/}
                {/*  <IntlMessages id="pages.cancel" />*/}
                {/*</Button>*/}
                {/*<Button color="primary" onClick={()=>toggleModal('', '')}>*/}
                {/*  <IntlMessages id="pages.save" />*/}
                {/*</Button>{" "}*/}
            </ModalFooter>
        </Modal>
    )

    /*return (
        <CrudModalForm
            modalOpen={modalOpen}
            toggleCrudModal={toggleCrudModal}
            modalTitle={modalTitle}
            onFormSubmit={onFormSubmit}
            formValues={formValues}
            modalState={modalState}
            apiUrl={apiUrl}
            validate={validate}
        />
    )*/
}

export default SubCategoryModal
