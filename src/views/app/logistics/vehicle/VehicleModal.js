import React, { useEffect, useState } from "react"
import {handleChange, setFormValues} from "../../../../helpers/Utils"
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from 'axios';
import {defaultColorValue, servicePath} from "../../../../constants/defaultValues";
import {getRequestOptions} from "../../../../helpers/DataManagement";
import Loader from "react-loader-spinner";
import FormikFieldError from "../../../../components/FormikFieldError";
import FormikSelect from "../../../../containers/forms/FormikSelect";

const vehicleTypeUrl = servicePath + "logistics-vehicle-type/";

const SubCategoryModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl, errorMessage}) => {
    useEffect(()=>{
        getVehicleTypeOptions().then()
    }, [])
    const [options, setOptions] = useState([])
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState(-1)
    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    const validate = values => {
        let errors = {}

        if (!values.plateNumber) {
            errors.plateNumber = errorMessage.plateNumber
        }

        return errors;
    }

     const getVehicleTypeOptions = async () =>{
         const requestOptions = getRequestOptions('get', vehicleTypeUrl)
         const optionsResponse = await axios(requestOptions)

         const optionsData = optionsResponse.data.data
         const options = optionsData.map(option => ({
             "value": option.id,
             "label": option.name
         }))
         setOptions(options)
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
                        onFormSubmit(values, modalState, apiUrl, id,formikActions)
                    }}
                >
                    {({
                          errors,
                          touched,
                          isValidating,
                          isSubmitting,
                          field,
                          setFieldValue,
                          setFieldTouched,
                          onBlur
                    }) => (
                        <Form>
                            <FormGroup>
                                <Label>
                                    <IntlMessages id="pages.plate-number" />
                                </Label>
                                <Field className="form-control" name="plateNumber"/>
                                <ErrorMessage name="plateNumber" component={FormikFieldError} />
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
                                    <IntlMessages id="pages.vehicle-type" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="logisticsVehicleType"
                                    component={FormikSelect}
                                    options={options}
                                    selectedOption={selectedOption}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="logisticsVehicleType" component={FormikFieldError} />
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
