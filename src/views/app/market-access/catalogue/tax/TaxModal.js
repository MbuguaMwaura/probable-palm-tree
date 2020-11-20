import React, { useEffect, useState }from "react"
import {handleChange, setFormValues} from "../../../../../helpers/Utils"
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import IntlMessages from "../../../../../helpers/IntlMessages"
import {ErrorMessage, Field, Form, Formik} from "formik"
import FormikFieldError from "../../../../../components/FormikFieldError";
import {defaultColorValue, servicePath} from "../../../../../constants/defaultValues";
import Loader from "react-loader-spinner";
import FormikSelect from "../../../../../containers/forms/FormikSelect";
import {loadFormSelectOptions} from "../../../../../helpers/DataManagement";
import {taxSchema} from "../../../../../validation/tax";

const chargeModeUrl = servicePath + "charging-mode/"

const SubCategoryModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl, errorMessage}) => {
    useEffect(()=>{
        getChargeModeOptions()
    }, [])
    const [options, setOptions] = useState([])
    let formValues = setFormValues(selectedItems, items, modalState)
    let name = formValues ? formValues.name : ''
    let value = formValues ? formValues.value : ''
    let chargeModeId = formValues ? formValues.chargeModeId : -1
    //let chargeModeName = formValues ? 'percentage' : null
    let id = formValues ? formValues.id : 0

    const getChargeModeOptions = () =>{
        loadFormSelectOptions(chargeModeUrl, setOptions).then()
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
                    validationSchema={taxSchema}
                    onSubmit={(values,formikActions) => {
                        onFormSubmit(values, modalState, apiUrl, id, formikActions)
                    }}
                    initialValues={{
                        name,
                        value,
                        chargeModeId,

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
                                    <IntlMessages id="pages.value" />
                                </Label>
                                <Field className="form-control" name="value"/>
                                <ErrorMessage name="description"  component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.charge-mode" />
                                </Label>
                                <Field
                                    name="chargeModeId"
                                    component={FormikSelect}
                                    options={options}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="chargeModeId"  component={FormikFieldError} />
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
}

export default SubCategoryModal
