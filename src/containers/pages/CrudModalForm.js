import React, {Component } from 'react'
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormikFieldError from "../../components/FormikFieldError";
import {defaultColorValue} from "../../constants/defaultValues";
import Loader from "react-loader-spinner";

export default class CrudModalForm extends Component {

    render() {
        const {
            modalOpen,
            toggleCrudModal,
            modalTitle,
            validationSchema,
            onFormSubmit,
            formValues,
            modalState,
            apiUrl
        } = this.props
        let name = formValues ? formValues.name : ''
        let description = formValues ? formValues.description : ''
        let id = formValues ? formValues.id : ''
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
                        validationSchema={validationSchema}
                        onSubmit={(values, formikActions) => {
                            onFormSubmit(values, modalState, apiUrl, id, formikActions)
                        }}
                        initialValues={{
                            name,
                            description
                        }}>
                        {({
                              errors,
                              touched,
                              isValidating,
                              isSubmitting
                        }) => (
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
                                <div className="text-center">
                                    <Loader visible= {isSubmitting} type="ThreeDots" color={defaultColorValue} width={50} height={50} />
                                    <Button color="secondary" outline onClick={()=>toggleCrudModal(modalTitle, '', 0)}>
                                        <IntlMessages id="pages.cancel" />
                                    </Button> {" "}
                                    <Button color="primary"
                                            type="submit"
                                            disabled={isSubmitting}>
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
}