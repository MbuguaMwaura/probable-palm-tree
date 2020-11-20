import React, { useState, useEffect } from "react"
import { handleChange, setFormValues} from "../../../../../helpers/Utils";
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
const locationLevelUrl = servicePath + "location-level"
const locationUrl = servicePath + "location"

const MarketPriceModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl}) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [selectedSubCategory, setSelectedSubCategory] = useState(0)
    const [commodityOptions, setCommodityOptions] = useState([])
    const [locationLevelOptions, setLocationLevelOptions] = useState([])
    const [selectedLocationLevel, setSelectedLocationLevel] = useState(0)
    const [locationOptions, setLocationOptions] = useState([])

    useEffect(()=>{
        getSelectOptions()
    }, [])

    useEffect(()=>{
        let updatedSubCategoryUrl = selectedCategory ? subCategoryUrl +"?categoryId=" + selectedCategory : subCategoryUrl
        let updatedCommodityUrl = selectedSubCategory ? commodityUrl +"?subCategoryId=" + selectedSubCategory : commodityUrl
        let updatedLocationUrl = selectedLocationLevel ? locationUrl + "?levelId=" + selectedLocationLevel : locationUrl

        getSubCategories(updatedSubCategoryUrl)
        getCommodities(updatedCommodityUrl)
        getLocations(updatedLocationUrl)

    }, [selectedCategory, selectedSubCategory, selectedLocationLevel])

    let formValues = setFormValues(selectedItems, items, modalState)
    let id = formValues ? formValues.id : ''
    // let commodityCategoryId = formValues ? formValues.commodityCategoryId : -1
    // let commodityCategoryName = formValues ? formValues.commodityCategoryName : ''
    // let commoditySubCategoryId = formValues ? formValues.commodityCategoryId : -1
    // let commoditySubCategoryName = formValues ? formValues.commoditySubCategoryName : ''

    const validate = values => {
        let errors = {};

        if (!values.price) {
            errors.price = 'Please enter a price';
        }

        if (!values.date) {
            errors.date = 'Please enter a date';
        }
        return errors;
    }

    const getSelectOptions = () =>{
        loadFormSelectOptions(categoryUrl, setCategoryOptions).then()
        loadFormSelectOptions(locationLevelUrl, setLocationLevelOptions).then()
    }
    const getSubCategories = (subCategoryUrl) =>{
         loadFormSelectOptions(subCategoryUrl, setSubCategoryOptions).then()
    }

    const getCommodities = (commodityUrl) =>{
        loadFormSelectOptions(commodityUrl, setCommodityOptions).then()
    }

    const getLocations =  (locationUrl) =>{
        loadFormSelectOptions(locationUrl, setLocationOptions).then()
    }

    const onChangeCategory = (option) =>{
        setSelectedCategory(option.value)
    }
    const onChangeSubCategory = (option) =>{
        setSelectedSubCategory(option.value)
    }

    const onChangeLocationLevel = (option) =>{
        setSelectedLocationLevel(option.value)
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
                        onFormSubmit(values, modalState, apiUrl, id, formikActions)
                    }}
                >
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
                                <ErrorMessage name="commoditySubCategoryId" component={FormikFieldError} />
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
                                    name="commodity"
                                    component={FormikSelect}
                                    options={commodityOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="commodity" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.location-level" />
                                </Label>
                                <Field
                                    name="locationLevel"
                                    component={FormikSelect}
                                    options={locationLevelOptions}
                                    handleChange={onChangeLocationLevel}
                                />
                                <ErrorMessage name="locationLevel" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.location" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="location"
                                    component={FormikSelect}
                                    options={locationOptions}
                                    handleChange={handleChange}
                                />
                                <ErrorMessage name="location" component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.price" />
                                </Label>
                                <Field className="form-control" name="price"/>
                                <ErrorMessage name="price"  component={FormikFieldError} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="mt-4">
                                    <IntlMessages id="pages.date" />
                                </Label>
                                <Field className="form-control"  name="date"/>
                                <ErrorMessage name="date" component={FormikFieldError} />
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

export default MarketPriceModal;