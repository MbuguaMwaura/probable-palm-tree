import {Colxx} from "../../../../components/common/CustomBootstrap";
import {Badge, Card, CardBody, Row} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import React from "react";
import CardTitle from "reactstrap/es/CardTitle";
import { Table } from "antd";
const columns = [
    {
        title: 'From',
        dataIndex: 'fromUnit',
        key: 'fromUnit'
    },
    {
        title: 'To',
        dataIndex: 'toUnit',
        key: 'toUnit'
    },
    {
        title: 'Charge',
        dataIndex: 'charge',
        key: 'charge',
        render: text => <b>{text}</b>
    }
];
const ServiceDetails = ({item}) => {
    const { tariff, addedCharges } = item
    const { tariffCharges } = tariff

    return(
        <Row>
            <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="provider.service-details"/>
                        </CardTitle>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="provider.service-name" />
                        </p>
                        <p className="mb-3">
                            {item.name}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.description" />
                        </p>
                        <p className="mb-3">
                            {item.description}
                        </p>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.origin" />
                        </p>
                        <p className="mb-3">
                            {item.locationFrom}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.destination" />
                        </p>
                        <p className="mb-3">
                            {item.locationTo}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="provider.name" />
                        </p>
                        <p className="mb-3">
                            {item.providerName}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.status" />
                        </p>
                        <p className="mb-3">
                            <Badge color={item.isActive ? "primary": "secondary"} pill>
                                {item.isActive ? <IntlMessages id="pages.active" /> : <IntlMessages id="pages.inactive" />}
                            </Badge>
                        </p>

                    </CardBody>
                </Card>
            </Colxx>

            <Colxx xxs="12" lg="8">
                <Card>
                    <CardBody>
                        <Row>
                            <Colxx>
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="pages.tariff" />
                                        </CardTitle>
                                        <p className="text-muted text-small mb-2">
                                            <IntlMessages id="pages.charging-mode" />
                                        </p>
                                        <p className="mb-3">
                                            {tariff.chargingMode}
                                        </p>

                                        <p className="text-muted text-small mb-2">
                                            <IntlMessages id="pages.currency" />
                                        </p>
                                        <p className="mb-3">
                                            {tariff.currency}
                                        </p>

                                        <p className="text-muted text-small mb-2">
                                            <IntlMessages id="menu.measurement-unit" />
                                        </p>
                                        <p className="mb-3">
                                            {tariff.measurementUnit}
                                        </p>

                                        <p className="text-muted text-small mb-2">
                                            <IntlMessages id="order.minimum-order" />
                                        </p>
                                        <p className="mb-3">
                                            {tariff.minimumOrder}
                                        </p>

                                        <p className="text-muted text-small mb-2">
                                            <IntlMessages id="order.maximum-order" />
                                        </p>
                                        <p className="mb-3">
                                            {tariff.maximumOrder}
                                        </p>
                                    </CardBody>
                                </Card>
                            </Colxx>
                            <Colxx xxs="12" lg="8">
                                <Card>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="provider.service-tariff-charges" />
                                        </CardTitle>
                                        <Table
                                            columns={columns}
                                            dataSource={tariffCharges}
                                            rowKey='id'
                                            pagination={false}
                                        />
                                    </CardBody>
                                </Card>
                            </Colxx>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="mt-4">
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="pages.added-charges" />
                        </CardTitle>
                        <Row>
                            {addedCharges.map((charge, index) =>{
                                return (
                                    <Colxx xxs="8" lg="4" key={index}>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>{(index+1) +". "+charge.serviceType}</CardTitle>
                                                    <p className="text-muted text-small mb-2">
                                                        <IntlMessages id="provider.service-type-label-text" />
                                                    </p>
                                                    <p> {charge.serviceType} </p>

                                                    <p className="text-muted text-small mb-2">
                                                        <IntlMessages id="pages.amount" />
                                                    </p>
                                                    <p> {charge.amount} </p>
                                                </CardBody>
                                            </Card>
                                        </Colxx>
                                )
                            })}

                        </Row>
                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="8">

            </Colxx>
        </Row>
    )
}

export default ServiceDetails