import React from "react";
import BaseOrder from "../../base/BaseOrder";
import {servicePath} from "../../../../../../constants/defaultValues";

const viewType = "request"
const orderUrl = servicePath + "market-order-request"
const adminOrderUrl = orderUrl + "/admin"
const detailsPath = "requests/details"
const  dropDownData = [
    { modalTitle: "orders.update-price", modalValue: 'edit-price'},
    { modalTitle: "orders.update-quantity", modalValue: 'edit-quantity'}
]
const MarketOrderRequest = ({ match }) =>(
    <BaseOrder
        match={match}
        heading="menu.order-requests"
        orderUrl={orderUrl}
        adminOrderUrl={adminOrderUrl}
        menuType="order"
        emptyDataDescription="No Market Order Request Data"
        detailsPath={detailsPath}
        dropDownData={dropDownData}
        viewType={viewType}
    />
)

export default MarketOrderRequest