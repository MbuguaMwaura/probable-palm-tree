import React from "react";
import BaseLogisticsOrder from "../../../logistics/base/BaseLogisticsOrder";
import {servicePath} from "../../../../../../constants/defaultValues";

const viewType = "order"
const orderUrl = servicePath + "logistics-service-order"
const adminOrderUrl = orderUrl + "/admin"
const detailsPath = "orders/details"
const  dropDownData = [
    { modalTitle: "order.cancel", modalValue: 'cancel-order'},
    { modalTitle: "order.update-price", modalValue: 'edit-price'}
]

const LogisticsOrder = ({match}) =>(
    <BaseLogisticsOrder
        match={match}
        heading="menu.orders"
        orderUrl={orderUrl}
        adminOrderUrl={adminOrderUrl}
        emptyDataDescription="No Logistics Order Data"
        detailsPath={detailsPath}
        dropDownData={dropDownData}
        viewType={viewType}
    />
)

export default LogisticsOrder