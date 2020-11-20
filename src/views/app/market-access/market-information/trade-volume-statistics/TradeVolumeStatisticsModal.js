import React, { useState, useEffect } from "react"
import {handleChange, setFormValues} from "../../../../../helpers/Utils";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    loadFormSelectOptions
} from "../../../../../helpers/DataManagement";
import {defaultColorValue, servicePath} from "../../../../../constants/defaultValues";
import FormikFieldError from "../../../../../components/FormikFieldError";
import Loader from "react-loader-spinner";
import FormikSelect from "../../../../../containers/forms/FormikSelect";

const categoryUrl = servicePath + "commodity-category"
const subCategoryUrl = servicePath + "commodity-sub-category"
const commodityUrl = servicePath + "commodity"
const tradeOperationUrl = servicePath + "trade-operation"
const countryUrl = servicePath + "country"

const TradeVolumeStatisticsModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl}) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [selectedSubCategory, setSelectedSubCategory] = useState(0)
    const [commodityOptions, setCommodityOptions] = useState([])
    const [tradeOperationOptions, setTradeOperationOptions] = useState([])
    const [countryOptions, setCountryOptions] = useState([])

    useEffect(()=>{
        getSelectOptions()
    }, [])

    useEffect(()=>{
        let updatedSubCategoryUrl = selectedCategory ? subCategoryUrl +"?categoryId=" + selectedCategory : subCategoryUrl
        let updatedCommodityUrl = selectedSubCategory ? commodityUrl +"?subCategoryId=" + selectedSubCategory : commodityUrl

        getSubCategories(updatedSubCategoryUrl)
        getCommodities(updatedCommodityUrl)

    }, [ selectedCategory, selectedSubCategory ])

    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    // let commodityCategoryId = formValues ? formValues.commodityCategoryId : -1
    // let commodityCategoryName = formValues ? formValues.commodityCategoryName : ''
    // let commoditySubCategoryId = formValues ? formValues.commodityCategoryId : -1
    // let commoditySubCategoryName = formValues ? formValues.commoditySubCategoryName : ''

    const validate = values => {
        let errors = {};

        if (!values.quantity) {
            errors.price = 'Please enter a quantity';
        }
        return errors;
    }

    const getSelectOptions = () =>{
        loadFormSelectOptions(categoryUrl, setCategoryOptions).then()
        loadFormSelectOptions(tradeOperationUrl, setTradeOperationOptions).then()
        loadFormSelectOptions(countryUrl, setCountryOptions).then()
    }
    const getSubCategories = (subCategoryUrl) =>{
        loadFormSelectOptions(subCategoryUrl, setSubCategoryOptions).then()
    }

    const getCommodities = (commodityUrl) =>{
        loadFormSelectOptions(commodityUrl, setCommodityOptions).then()
    }

    const onChangeCategory = (option) =>{
        setSelectedCategory(option.value)
    }
    const onChangeSubCategory = (option) =>{
        setSelectedSubCategory(option.value)
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
                        onFormSubmit(values, modalState, apiUrl, id, formikActions)
                    }}>
                    {({isSubmitting}) => (
                        <Form>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.category" />
                                </Label>
                                <Field
                                    name="commodityCategoryId"
                                    component={FormikSelect}
                                    options={categoryOptions}
                                    handleChange={onChangeCategory}
                                />
                                <ErrorMessage name="commodityCategoryId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.sub-category" />
                                </Label>
                                <Field
                                    name="commoditySubCategoryId"
                                    component={FormikSelect}
                                    options={subCategoryOptions}
                                    handleChange={onChangeSubCategory}
                                />
                                <ErrorMessage name="commoditySubCategoryId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.commodity" />
                                </Label>
                                <Field
                                    name="commodityId"
                                    component={FormikSelect}
                                    options={commodityOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="commodityId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.trade-operation" />
                                </Label>
                                <Field
                                    name="tradeOperationTypeId"
                                    component={FormikSelect}
                                    options={tradeOperationOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="tradeOperationTypeId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.origin" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="originCountryId"
                                    component={FormikSelect}
                                    options={countryOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="originCountryId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.destination" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="destinationCountryId"
                                    component={FormikSelect}
                                    options={countryOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="destinationCountryId" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.month" />
                                </Label>
                                <Field className="form-control" name="month"/>
                                <ErrorMessage name="month"  component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.year" />
                                </Label>
                                <Field className="form-control"  name="year"/>
                                <ErrorMessage name="year" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.quantity" />
                                </Label>
                                <Field className="form-control"  name="quantity"/>
                                <ErrorMessage name="quantity" component={FormikFieldError} />
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

export default TradeVolumeStatisticsModal;