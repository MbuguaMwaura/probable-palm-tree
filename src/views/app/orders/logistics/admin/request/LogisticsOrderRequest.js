import React from "react";
import {servicePath} from "../../../../../../constants/defaultValues";
import BaseLogisticsOrder from "../../base/BaseLogisticsOrder";

const viewType = "request"
const requestUrl = servicePath + "logistics-service-order-request"
const adminRequestUrl = requestUrl + "/admin"
const detailsPath = "orders/details"
const  dropDownData = [
    { modalTitle: "order.cancel", modalValue: 'cancel-order'},
    { modalTitle: "order.update-price", modalValue: 'edit-price'}
]

const LogisticsOrderRequest = ({ match }) =>(
    <BaseLogisticsOrder
        match={match}
        heading="menu.order-requests"
        orderUrl={requestUrl}
        adminOrderUrl={adminRequestUrl}
        emptyDataDescription="No Logistics Order Request Data"
        detailsPath={detailsPath}
        dropDownData={dropDownData}
        viewType={viewType}
    />
)

export default LogisticsOrderRequest