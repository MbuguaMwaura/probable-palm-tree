import React, { useState, useEffect } from "react"
import {getBase64, handleChange, setFormValues} from "../../../../../helpers/Utils";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {loadFormSelectOptions} from "../../../../../helpers/DataManagement";
import {defaultColorValue, servicePath} from "../../../../../constants/defaultValues";
import FormikFieldError from "../../../../../components/FormikFieldError";
import Loader from "react-loader-spinner";
import FormikImageDropzone from "../../../../../containers/forms/FormikImageDropzone";
import FormikSelect from "../../../../../containers/forms/FormikSelect";
import {commoditySchema} from "../../../../../validation/commodity";

const categoryUrl = servicePath + "commodity-category"
const subCategoryUrl = servicePath + "commodity-sub-category"
const metricUrl = servicePath + "measurement-metric"
const unitUrl = servicePath + "measurement-unit"

const CommodityModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl}) => {
  const [subCategoryOptions, setSubCategoryOptions] = useState([])
  const [metricOptions, setMetricOptions] = useState([])
  const [marketPriceUnitOptions, setMarketPriceUnitOptions] = useState([])
  const [tradeStatisticsOptions, setTradeStatisticsOptions] = useState([])
  const [selectedMarketPriceMetric, setSelectedMarketPriceMetric] = useState(0)
  const [selectedTradeStatisticMetric, setSelectedTradeStatisticMetric] = useState(0)
  const [categoryOptions, setCategoryOptions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0)

  useEffect(()=>{
    getSelectOptions()
  }, [])

  useEffect(()=>{
    let updatedSubCategoryUrl = selectedCategory ? subCategoryUrl +"?categoryId=" + selectedCategory : subCategoryUrl
    let updatedMarketPriceUnitUrl = selectedMarketPriceMetric ? unitUrl + "?metricId=" + selectedMarketPriceMetric : unitUrl
    let updatedTradeStatisticsUnitUrl = selectedTradeStatisticMetric ? unitUrl + "?metricId=" + selectedTradeStatisticMetric : unitUrl
    getSubCategories(updatedSubCategoryUrl)
    getMarketPriceUnits(updatedMarketPriceUnitUrl)
    getTradeStatisticsUnits(updatedTradeStatisticsUnitUrl)
  }, [selectedMarketPriceMetric, selectedTradeStatisticMetric, selectedCategory])


  let formValues = setFormValues(selectedItems, items, modalState)
  let name = formValues ? formValues.name : ''
  let description = formValues ? formValues.description : ''
  let id = formValues ? formValues.id : ''
  let commoditySubCategoryId = formValues ? formValues.commodityCategoryId : -1
  // let commodityCategoryId = formValues ? formValues.commodityCategoryId : -1
  // let commodityCategoryName = formValues ? formValues.commodityCategoryName : ''
  // let commoditySubCategoryName = formValues ? formValues.commoditySubCategoryName : ''

  const getSelectOptions = () =>{
    loadFormSelectOptions(categoryUrl, setCategoryOptions).then()
    loadFormSelectOptions(metricUrl, setMetricOptions).then()
  }
  const getSubCategories = (subCategoryUrl) =>{
    loadFormSelectOptions(subCategoryUrl, setSubCategoryOptions).then()
  }

  const getMarketPriceUnits = (unitUrl) =>{
    loadFormSelectOptions(unitUrl, setMarketPriceUnitOptions).then()
  }

  const getTradeStatisticsUnits = (unitUrl) =>{
    loadFormSelectOptions(unitUrl, setTradeStatisticsOptions).then()
  }

  const onChangeCategory = (option) =>{
    setSelectedCategory(option.value)
    //getSubCategories(subCategoryUrl +"?categoryId=" + selectedCategory).then()
  }

  const onChangeMarketPriceMetric = (option) =>{
    setMarketPriceUnitOptions([])
    setSelectedMarketPriceMetric(option.value)
    //getMarketPriceUnits(unitUrl + "?metricId=" + selectedMarketPriceMetric).then()
  }

  const onChangeTradeStatisticsMetric = (option) =>{
    setTradeStatisticsOptions([])
    setSelectedTradeStatisticMetric(option.value)
    //getTradeStatisticsUnits(unitUrl + "?metricId=" + selectedTradeStatisticMetric).then()
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
              validationSchema={commoditySchema}
              onSubmit={(values, formikActions ) => {
                getBase64(values.image, (result)=>{
                  values.image = result
                  console.log(values)
                  onFormSubmit(values, modalState, apiUrl, id, formikActions)
                })
              }}
              initialValues={{
                name,
                description,
                commoditySubCategoryId
              }}>
            {({isSubmitting}) => (
                <Form>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="pages.name" />
                    </Label>
                    <Field className="form-control"  name="name"/>
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
                        name="commoditySubCategoryId"
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
                        handleChange={handleChange}
                    />
                    <ErrorMessage name="commoditySubCategoryId" component={FormikFieldError} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="pages.market-price-measurement-metric" />
                    </Label>
                    <Field
                        name="marketPriceMeasurementMetricId"
                        component={FormikSelect}
                        options={metricOptions}
                        handleChange={onChangeMarketPriceMetric}
                    />
                    <ErrorMessage name="description" component={FormikFieldError} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="pages.market-price-measurement-unit" />
                    </Label>
                    <Field
                        className="form-control"
                        name="marketPriceMeasurementUnitId"
                        component={FormikSelect}
                        options={marketPriceUnitOptions}
                        handleChange={handleChange}
                    />
                    <ErrorMessage name="description" component={FormikFieldError} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="pages.trade-statistics-measurement-metric" />
                    </Label>
                    <Field
                        className="form-control"
                        name="tradeStatisticsMeasurementMetricId"
                        component={FormikSelect}
                        options={metricOptions}
                        handleChange={onChangeTradeStatisticsMetric}
                    />
                    <ErrorMessage name="tradeStatisticsMeasurementMetricId" component={FormikFieldError} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="pages.trade-statistics-measurement-unit" />
                    </Label>
                    <Field
                        className="form-control"
                        name="tradeStatisticsMeasurementUnitId"
                        component={FormikSelect}
                        options={tradeStatisticsOptions}
                        handleChange={handleChange}
                    />
                    <ErrorMessage name="tradeStatisticsMeasurementUnitId" component={FormikFieldError} />
                  </FormGroup>
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="pages.image" />
                    </Label>
                    <Field name="image" component={FormikImageDropzone} />
                    <ErrorMessage name="image" component={FormikFieldError} />
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

export default CommodityModal;