import React from "react";
import BaseOrderDetailsPage from "../../base/BaseOrderDetailsPage";
import {servicePath} from "../../../../../../constants/defaultValues";

const orderDetailsUrl = servicePath + "market-order-request"
const viewType = "order"
const dropDownData = [
    { modalTitle: "order.update-status", modalValue: 'update-status'},
    { modalTitle: "order.cancel", modalValue: 'cancel-order'}
]

const MarketOrderDetails = ({ match }) =>(
    <BaseOrderDetailsPage
        match={match}
        orderDetailsUrl={orderDetailsUrl}
        viewType={viewType}
        dropDownData={dropDownData}
    />
)

export default MarketOrderDetails