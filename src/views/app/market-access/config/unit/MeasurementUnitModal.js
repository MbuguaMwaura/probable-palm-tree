import React, { useEffect, useState } from "react"
import {handleChange, setFormValues} from "../../../../../helpers/Utils"
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultColorValue, servicePath} from "../../../../../constants/defaultValues";
import {loadFormSelectOptions} from "../../../../../helpers/DataManagement";
import FormikFieldError from "../../../../../components/FormikFieldError";
import Loader from "react-loader-spinner";
import FormikSelect from "../../../../../containers/forms/FormikSelect";
import {measurementUnitSchema} from "../../../../../validation/measurement-unit";

const metricUrl = servicePath + "measurement-metric/"

const MeasurementUnitModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl, errorMessage}) => {
    useEffect(()=>{
        getMetricOptions().then()
    }, [])
    const [metricOptions, setMetricOptions] = useState([])
    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    let name = formValues ? formValues.name : ''
    let description = formValues ? formValues.description : ''
   // let measurementMetricName = formValues ? 'Weight'  : null
    let measurementMetricId = formValues ? formValues.measurementMetricId : -1

    const getMetricOptions = async () =>{
        loadFormSelectOptions(metricUrl, setMetricOptions).then()
    }

    return (
        <Modal
            isOpen={modalOpen}
            toggle={toggleCrudModal}
            wrapClassName="modal-right"
            backdrop="static"
        >
            <ModalHeader toggle={()=>toggleCrudModal(modalTitle, '' , 0)}>
                <IntlMessages id={modalTitle} />
            </ModalHeader>
            <ModalBody>
                <Formik
                    validationSchema={measurementUnitSchema}
                    onSubmit={ (values, formikActions) => {
                        onFormSubmit(values, modalState, apiUrl, id, formikActions)
                    }}
                    initialValues={{
                        name,
                        description,
                        measurementMetricId
                    }}>
                    {({errors, touched, isValidating, isSubmitting}) => (
                        <Form>
                            <FormGroup>
                                <Label>
                                    <IntlMessages id="pages.name" />
                                </Label>
                                <Field className="form-control" name="name"/>
                                <ErrorMessage name="name"  component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.description" />
                                </Label>
                                <Field className="form-control" name="description"/>
                                <ErrorMessage name="description"  component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="menu.measurement-metric" />
                                </Label>
                                <Field
                                    name="measurementMetricId"
                                    component={FormikSelect}
                                    options={metricOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="measurementMetricId"  component={FormikFieldError} />
                            </FormGroup>
                            <div className="text-center">
                                <Loader visible= {isSubmitting} type="ThreeDots" color={defaultColorValue} width={50} height={50} />
                                <Button color="secondary" outline onClick={()=>toggleCrudModal(modalTitle, '', 0)}>
                                    <IntlMessages id="pages.cancel" />
                                </Button> {" "}
                                <Button color="primary" type="submit" >
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

export default MeasurementUnitModal
