import React from "react"
import ProductDetailsPage from "../ProductDetailsPage";
import {servicePath} from "../../../../../constants/defaultValues";

const updateStatusUrl = servicePath + "product/update-status"

const ProductListDetailsPage = ({ match }) =>(
    <ProductDetailsPage
        match={match}
        menuType="list"
        updateStatusUrl={updateStatusUrl}
    />
)

export default ProductListDetailsPage