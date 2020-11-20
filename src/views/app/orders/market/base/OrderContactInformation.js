import React from "react";
import {Card, CardBody} from "reactstrap";
import CardTitle from "reactstrap/es/CardTitle";
import IntlMessages from "../../../../../helpers/IntlMessages";

const OrderContactInformation = ({titleId, name, email, phoneNumber, comments, type}) =>(
    <Card className="mb-4">
        <CardBody>
            <CardTitle>
                <IntlMessages id={titleId} />
            </CardTitle>
            <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.name" />
            </p>
            <p className="mb-3">
                {name}
            </p>
            <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.email" />
            </p>
            <p className="mb-3">
                {email}
            </p>
            <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.phone-number" />
            </p>
            <p className="mb-3">
                {phoneNumber}
            </p>
            {type === "buyer" ?
                <div>
                    <p className="text-muted text-small mb-2">
                        <IntlMessages id="order.customer-comments" />
                    </p>
                    <p className="mb-3">
                        {comments}
                    </p>
                </div>
                : null
            }
        </CardBody>
    </Card>
)

export default OrderContactInformation