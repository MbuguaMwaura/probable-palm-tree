import React from "react"
import {setFormValues} from "../../../../../helpers/Utils"
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import IntlMessages from "../../../../../helpers/IntlMessages"
import {ErrorMessage, Field, Form, Formik} from "formik"
import FormikFieldError from "../../../../../components/FormikFieldError";
import {defaultColorValue} from "../../../../../constants/defaultValues";
import Loader from "react-loader-spinner";
import {vehicleTypeSchema} from "../../../../../validation/vehicle";

const VehicleTypeModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, onFormSubmit, apiUrl, errorMessage}) => {

    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    let name = formValues ? formValues.name : ''

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
                    validationSchema={vehicleTypeSchema}
                    onSubmit={(values,formikActions) => {
                        onFormSubmit(values, modalState, apiUrl, id, formikActions)
                    }}
                    initialValues={{
                        name
                    }}>
                    {({errors, touched, isValidating, isSubmitting}) => (
                        <Form>
                            <FormGroup>
                                <Label>
                                    <IntlMessages id="pages.name" />
                                </Label>
                                <Field className="form-control" name="vehicleTypeName"/>
                                <ErrorMessage name="vehicleTypeName"  component={FormikFieldError} />
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

export default VehicleTypeModal
