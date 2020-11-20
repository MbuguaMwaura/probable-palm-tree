import React from "react"
import { getBase64, setFormValues } from "../../../../helpers/Utils"
import {
    Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {categorySchema} from "../../../../validation/category";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormikFieldError from "../../../../components/FormikFieldError";
import Loader from "react-loader-spinner";
import {defaultColorValue} from "../../../../constants/defaultValues";
import FormikImageDropzone from "../../../../containers/forms/FormikImageDropzone";


const ProductModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, onFormSubmit,
                           apiUrl, errorMessage }) => {
    let formValues = setFormValues(selectedItems, items, modalState)
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
                    validationSchema={categorySchema}
                    onSubmit={(values, formikActions) => {
                        getBase64(values.image, (result) => {
                            values.image = result
                            //console.log(values)
                            onFormSubmit(values, modalState, apiUrl, id,formikActions)
                        })
                    }}
                    initialValues={{
                        name,
                        description
                    }}>
                    {({
                          errors,
                          touched,
                          isValidating,
                          handleChange,
                          setFieldValue,
                          setFieldTouched,
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
                                <ErrorMessage name="description" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.image" />
                                </Label>
                                <Field name="image" component={FormikImageDropzone} />
                                <ErrorMessage name="image" component={FormikFieldError} />
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
}

export default ProductModal
