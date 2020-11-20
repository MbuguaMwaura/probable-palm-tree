import React, {useState} from "react";
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormikFieldError from "../../../../../components/FormikFieldError";
import Loader from "react-loader-spinner";
import {defaultColorValue} from "../../../../../constants/defaultValues";
import FormikSelect from "../../../../../containers/forms/FormikSelect";

const options = [
    {value: "approve", label: "approve"},
    {value: "dispatched", label: "dispatched"}
]

const BaseOrderModal = (props) =>{
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState(-1)
    const {
        modalOpen,
        toggleCrudModal,
        onFormSubmit,
        modalTitle,
        validate,
        apiUrl,
        modalState,
        id,
        product,
        commodity,
        clientName,
        clientPhoneNumber,
        requestedDate,
        currentPrice,
        currentQuantity,
        path,
        pageType,
        dataDetailsRender,
        status
    } = props
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
                        onFormSubmit(values, modalState, apiUrl + "/" + path, id, formikActions, pageType, dataDetailsRender)
                    }}
                    initialValues={ { price: ''} }
                >
                    {({isSubmitting, handleChange}) => (
                        <Form>
                            <Label>
                                <IntlMessages id="pages.product" />
                            </Label>
                            <Input value={product} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.commodity" />
                            </Label>
                            <Input value={commodity} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.client-name" />
                            </Label>
                            <Input value={clientName} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.client-phone-number" />
                            </Label>
                            <Input value={clientPhoneNumber} disabled/>

                            <Label className="mt-4">
                                <IntlMessages id="pages.date-requested" />
                            </Label>
                            <Input value={requestedDate} disabled/>

                            {currentPrice ?
                                <div>
                                    <Label className="mt-4">
                                        <IntlMessages id="pages.current-price"/>
                                    </Label>
                                    <Input value={currentPrice} disabled/>

                                    <FormGroup>
                                        <Label className="mt-4">
                                            <IntlMessages id="pages.new-price"/>
                                        </Label>
                                        <Field className="form-control" name="price" />
                                        <ErrorMessage name="price" component={FormikFieldError}/>
                                    </FormGroup>
                                </div> : null
                            }
                            { currentQuantity ?
                                <div>
                                    <Label className="mt-4">
                                        <IntlMessages id="pages.current-quantity" />
                                    </Label>
                                    <Input value={currentQuantity} disabled/>

                                    <FormGroup>
                                        <Label className="mt-4">
                                            <IntlMessages id="pages.new-quantity" />
                                        </Label>
                                        <Field className="form-control" name="quantity" component="input" />
                                        <ErrorMessage name="quantity" component={FormikFieldError} />
                                    </FormGroup>
                                </div> : null
                            }

                            { status === 'update' ?
                                <FormGroup>
                                    <Label className="mt-4">
                                        <IntlMessages id="pages.status" />
                                    </Label>
                                    <Field
                                        className="form-control"
                                        name="status"
                                        component={FormikSelect}
                                        options={options}
                                        selectedOption={selectedOption}
                                        handleChange={handleChange}
                                    />
                                    <ErrorMessage name="status" component={FormikFieldError} />
                                </FormGroup> : null

                            }

                            { status === 'update' || status === 'cancel' ?
                                <FormGroup>
                                    <Label className="mt-4">
                                        <IntlMessages id="pages.comments" />
                                    </Label>
                                    <Field className="form-control" name="comment" component="textarea"/>
                                    <ErrorMessage name="comment" component={FormikFieldError} />
                                </FormGroup> : null
                            }

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

export default BaseOrderModal