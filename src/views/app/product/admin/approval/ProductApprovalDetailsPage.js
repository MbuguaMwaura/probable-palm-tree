import React from "react"
import ProductDetailsPage from "../ProductDetailsPage";
import {servicePath} from "../../../../../constants/defaultValues";

const updateStatusUrl = servicePath + "product/update-status"

const ProductApprovalDetailsPage = ({ match }) =>(
    <ProductDetailsPage
        match={match}
        menuType="approval"
        updateStatusUrl={updateStatusUrl}
    />
)

export default ProductApprovalDetailsPage