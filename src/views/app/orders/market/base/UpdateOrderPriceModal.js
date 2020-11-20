import React from "react"
import { setFormValues} from "../../../../../helpers/Utils";
import BaseOrderModal from "./BaseOrderModal";

const UpdateOrderPriceModal = ({ modalOpen, toggleCrudModal, onFormSubmit, modalTitle, selectedItems, items, modalState, apiUrl, fetchedItem, pageType, dataDetailsRender}) => {
    let formValues
    let product
    let id
    let commodity
    let clientName
    let clientPhoneNumber
    let requestedDate
    let currentPrice

    if(fetchedItem){
        formValues = fetchedItem
        commodity = formValues ? formValues.commodity_name : ''
        clientName = formValues ? formValues.requested_by_name : ''
        clientPhoneNumber = formValues ? formValues.requested_by_phone : ''
        requestedDate = formValues ? formValues.date_requested : ''
        currentPrice = formValues ? formValues.unit_price  : ''

    }else{
        formValues = setFormValues(selectedItems, items, modalState)
        commodity = formValues ? formValues.commodityName : ''
        clientName = formValues ? formValues.requestedByName : ''
        clientPhoneNumber = formValues ? formValues.requestedByPhone : ''
        requestedDate = formValues ? formValues.dateRequested : ''
        currentPrice = formValues ? formValues.unitPrice  : ''
    }
    product = formValues ? formValues.product : ''
    id = formValues ? formValues.id : ''


    const validate = values => {
        let errors = {};

        if (!values.price) {
            errors.price = 'Please enter a price';
        }
        return errors;
    }

    return (
        <BaseOrderModal
            modalOpen={modalOpen}
            toggleCrudModal={toggleCrudModal}
            modalTitle={modalTitle}
            modalState={modalState}
            onFormSubmit={onFormSubmit}
            apiUrl={apiUrl}
            id={id}
            product={product}
            commodity={commodity}
            validate={validate}
            clientName={clientName}
            clientPhoneNumber={clientPhoneNumber}
            requestedDate={requestedDate}
            currentPrice={currentPrice}
            path="price"
            pageType={pageType}
            dataDetailsRender={dataDetailsRender}
        />
    )
};

export default UpdateOrderPriceModal;