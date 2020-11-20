import React from "react"
import BaseOrder from "../../base/BaseOrder";
import {servicePath} from "../../../../../../constants/defaultValues";

const viewType = "order"
const orderUrl = servicePath + "market-order-request"
const adminOrderUrl = orderUrl + "/admin"
const detailsPath = "orders/details"
const  dropDownData = [
    { modalTitle: "order.update-status", modalValue: 'update-status'},
    { modalTitle: "order.cancel", modalValue: 'cancel-order'}
]


const MarketOrder = ({match}) =>(
    <BaseOrder
        match={match}
        heading="menu.orders"
        orderUrl={orderUrl}
        adminOrderUrl={adminOrderUrl}
        menuType="order"
        emptyDataDescription="No Market Order Data"
        detailsPath={detailsPath}
        dropDownData={dropDownData}
        viewType={viewType}
    />
)

export default MarketOrder