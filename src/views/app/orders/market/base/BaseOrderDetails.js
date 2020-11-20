import {Colxx} from "../../../../../components/common/CustomBootstrap";
import {Card, CardBody, Row} from "reactstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import React from "react";
import CardTitle from "reactstrap/es/CardTitle";
import OrderContactInformation from "./OrderContactInformation";

const BaseOrderDetails = ({item}) => {
    return(
        <Row>
            <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="orders.details"/>
                        </CardTitle>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="product.name" />
                        </p>
                        <p className="mb-3">
                            {item.product}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.description" />
                        </p>
                        <p className="mb-3">
                            {item.description}
                        </p>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.commodity" />
                        </p>
                        <p className="mb-3">
                            {item.commodity_name}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="menu.measurement-unit" />
                        </p>
                        <p className="mb-3">
                            {item.measurement_unit ? item.measurement_unit : "N/A"}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="product.unit-price" />
                        </p>
                        <p className="mb-3">
                            {"Tsh."+item.unit_price}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="order.quantity" />
                        </p>
                        <p className="mb-3">
                            {item.quantity_ordered}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="order.total-price" />
                        </p>
                        <p className="mb-3">
                            {"TSh." + item.total_price}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.date-requested" />
                        </p>
                        <p className="mb-3">
                            {item.date_requested}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="order.approval-status" />
                        </p>
                        <p className="mb-3">
                            {item.approval_status}
                        </p>

                    </CardBody>
                </Card>
            </Colxx>

            <Colxx xxs="12" lg="8">
                {/*<SmallLineCharts itemClass="dashboard-small-chart-analytics" />*/}
                <OrderContactInformation
                    comments={item.customer_comments}
                    email={item.requested_by_email}
                    name={item.requested_by_name}
                    phoneNumber={item.requested_by_phone}
                    titleId="order.buyer-information"
                    type="buyer"
                />
                <OrderContactInformation
                    email={item.sold_by_email}
                    name={item.sold_by_name}
                    phoneNumber={item.sold_by_phone}
                    titleId="order.seller-information"
                />
            </Colxx>
        </Row>
    )
}

export default BaseOrderDetails