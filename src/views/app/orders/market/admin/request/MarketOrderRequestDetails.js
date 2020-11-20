import React from "react";
import BaseOrderDetailsPage from "../../base/BaseOrderDetailsPage";
import {servicePath} from "../../../../../../constants/defaultValues";

const orderDetailsUrl = servicePath + "market-order-request"
const viewType = "request"
const  dropDownData = [
    { modalTitle: "orders.update-price", modalValue: 'edit-price'},
    { modalTitle: "orders.update-quantity", modalValue: 'edit-quantity'}
]

const MarketOrderRequestDetails = ({ match }) =>(
    <BaseOrderDetailsPage
        match={match}
        orderDetailsUrl={orderDetailsUrl}
        viewType={viewType}
        dropDownData={dropDownData}
    />
)

export default MarketOrderRequestDetails