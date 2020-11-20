import React, { useEffect, useState } from "react"
import {getBase64, handleChange, setFormValues} from "../../../../../helpers/Utils"
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {defaultColorValue, servicePath} from "../../../../../constants/defaultValues";
import {loadFormSelectOptions} from "../../../../../helpers/DataManagement";
import Loader from "react-loader-spinner";
import FormikFieldError from "../../../../../components/FormikFieldError";
import FormikImageDropzone from "../../../../../containers/forms/FormikImageDropzone";
import FormikSelect from "../../../../../containers/forms/FormikSelect";
import {subCategorySchema} from "../../../../../validation/sub-category";

const categoryUrl = servicePath + "commodity-category/";

const SubCategoryModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl, errorMessage}) => {
    useEffect(()=>{
        getCategoryOptions()
    }, [])
    const [options, setOptions] = useState([])
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState(-1)
    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    let name = formValues ? formValues.name : ''
    let description = formValues ? formValues.description : ''
    let commodityCategoryId = formValues ? formValues.commodityCategoryId : ''
    //let commodityCategoryName = formValues ? formValues.commodityCategoryName : null

     const getCategoryOptions = () =>{
        loadFormSelectOptions(categoryUrl,setOptions).then()
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
                    validationSchema={subCategorySchema}
                    onSubmit={(values, formikActions) => {
                        getBase64(values.image, (result) => {
                            values.image = result
                            console.log(values)
                            onFormSubmit(values, modalState, apiUrl, id,formikActions)
                        })
                    }}
                    initialValues={{
                        name,
                        description,
                        commodityCategoryId
                    }}>
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
                                    <IntlMessages id="pages.name" />
                                </Label>
                                <Field className="form-control" name="name"/>
                                <ErrorMessage name="name" component={FormikFieldError} />
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
                                    <IntlMessages id="pages.category" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="commodityCategoryId"
                                    component={FormikSelect}
                                    options={options}
                                    selectedOption={selectedOption}
                                    handleChange={handleChange}
                                />
                               {/* <Field
                                    className="form-control"
                                    name="commodityCategoryId"
                                    component={FormikPaginationSelect}
                                    options={options}
                                    selectedOption={selectedOption}
                                    handleChange={handleChange}
                                    value={{label: commodityCategoryName, value: commodityCategoryName}}
                                />*/}
                                <ErrorMessage name="commodityCategoryId" component={FormikFieldError} />
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
