import React from "react"
import { setFormValues } from "../../helpers/Utils"
import CrudModalForm from "./CrudModalForm"
import {nameDescriptionSchema} from "../../validation/common";


const CrudModal = ({ modalOpen, toggleCrudModal, modalTitle, selectedItems, items, modalState, dataListRender, createNotification, onFormSubmit, apiUrl, errorMessage}) => {
    let formValues = setFormValues(selectedItems, items, modalState)

    return (
        <CrudModalForm
            modalOpen={modalOpen}
            toggleCrudModal={toggleCrudModal}
            modalTitle={modalTitle}
            onFormSubmit={onFormSubmit}
            formValues={formValues}
            modalState={modalState}
            apiUrl={apiUrl}
            validationSchema={nameDescriptionSchema}
            createNotification={createNotification}
        />
    )
}

export default CrudModal
