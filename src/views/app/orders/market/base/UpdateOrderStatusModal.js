import React from "react";
import { setFormValues} from "../../../../../helpers/Utils";
import BaseOrderModal from "./BaseOrderModal";

const UpdateOrderStatusModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, onFormSubmit, apiUrl, fetchedItem, pageType, dataDetailsRender, operation, path}) => {
    let formValues
    let product
    let id
    let commodity
    let clientName
    let clientPhoneNumber
    let requestedDate

    if(fetchedItem){
        formValues = fetchedItem
        commodity = formValues ? formValues.commodity_name : ''
        clientName = formValues ? formValues.requested_by_name : ''
        clientPhoneNumber = formValues ? formValues.requested_by_phone : ''
        requestedDate = formValues ? formValues.date_requested : ''
    }else{
        formValues = setFormValues(selectedItems, items, modalState)
        commodity = formValues ? formValues.commodityName : ''
        clientName = formValues ? formValues.requestedByName : ''
        clientPhoneNumber = formValues ? formValues.requestedByPhone : ''
        requestedDate = formValues ? formValues.dateRequested : ''
    }
    product = formValues ? formValues.product : ''
    id = formValues ? formValues.id : ''

    const validate = values => {
        let errors = {};

        if (!values.quantity) {
            errors.quantity = 'Please enter quantity';
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
            path={path}
            pageType={pageType}
            dataDetailsRender={dataDetailsRender}
            status={operation}
        />
    )
};

export default UpdateOrderStatusModal;