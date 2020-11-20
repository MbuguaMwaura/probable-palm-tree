import React from "react"
import { setFormValues} from "../../../../../helpers/Utils";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultColorValue} from "../../../../../constants/defaultValues";
import FormikFieldError from "../../../../../components/FormikFieldError";
import Loader from "react-loader-spinner";

const answerPath = "/answer"

const PriceInquiryModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl}) => {

    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    let commodity = formValues ? formValues.commodity : ''
    let location = formValues ? formValues.location : ''
    let marketPriceDate = formValues ? formValues.marketPriceDate : ''
    let inquiredByName = formValues ? formValues.inquiredByName  : ''
    let inquiredByEmail = formValues ? formValues.inquiredByEmail : ''
    let inquiredByPhone = formValues ? formValues.inquiredByPhone : ''
    let dateInquired = formValues ? formValues.dateInquired : ''

    const validate = values => {
        let errors = {};

        if (!values.price) {
            errors.price = 'Please enter a price';
        }
        return errors;
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
                    validate={validate}
                    onSubmit={(values, formikActions ) => {
                        console.log(values)
                        console.log(apiUrl + answerPath)
                        onFormSubmit(values, '', apiUrl + answerPath, id, formikActions)
                    }}
                    initialValues={{
                        inquiry: id
                    }}>
                    {({isSubmitting}) => (
                        <Form>
                            <Label>
                                <IntlMessages id="pages.commodity" />
                            </Label>
                            <Input value={commodity} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.location" />
                            </Label>
                            <Input value={location} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.market-price-date" />
                            </Label>
                            <Input value={marketPriceDate} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.inquired-by" />
                            </Label>
                            <Input value={inquiredByName} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.email" />
                            </Label>
                            <Input value={inquiredByEmail} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.phone-number" />
                            </Label>
                            <Input value={inquiredByPhone} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.date-inquired" />
                            </Label>
                            <Input value={dateInquired} disabled/>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.price" />
                                </Label>
                                <Field className="form-control"  name="price" />
                                <ErrorMessage name="price" component={FormikFieldError} />
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
};

export default PriceInquiryModal;