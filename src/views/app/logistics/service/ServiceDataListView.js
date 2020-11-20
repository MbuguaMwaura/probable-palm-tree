import React from "react"
import { Card, CustomInput, Badge } from "reactstrap"
import classnames from "classnames"
import { ContextMenuTrigger } from "react-contextmenu"
import { Colxx } from "../../../../components/common/CustomBootstrap"
import IntlMessages from "../../../../helpers/IntlMessages"
import {NavLink} from "react-router-dom";

const ServiceDataListView = ({ data, isSelect, collect, onCheckUser, path, item}) => {
    return (
        <Colxx xxs="12" className="mb-3">
            <ContextMenuTrigger id="menu_id" data={data.id} collect={collect}>
                <Card
                    onClick={event => onCheckUser(event, data.id)}
                    className={classnames("d-flex flex-row", {
                        active: isSelect
                    })}
                >
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <div className="w-50 w-sm-100">
                                <NavLink to={{pathname: `services/${data.id}`}}>
                                    <p className="list-item-heading mb-1 truncate">
                                        {data.name}
                                    </p>
                                </NavLink>
                            </div>
                            <div className="w-60 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.description}
                                </p>
                            </div>
                            <div className="w-60 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.providerName}
                                </p>
                            </div>
                            <div className="w-30 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.tariff.measurementUnit}
                                </p>
                            </div>
                            <div className="w-30 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.tariff.minimumOrder}
                                </p>
                            </div>
                            <div className="w-30 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.tariff.maximumOrder}
                                </p>
                            </div>
                            <div className="w-20 w-sm-100">
                                <Badge color={data.isActive ? "primary": "secondary"} pill>
                                    {data.isActive ? <IntlMessages id="pages.active" /> : <IntlMessages id="pages.inactive" />}
                                </Badge>
                            </div>
                        </div>
                        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <CustomInput
                                className="item-check mb-0"
                                type="checkbox"
                                id={`check_${data.id}`}
                                checked={isSelect}
                                onChange={() => {}}
                                label=""
                            />
                        </div>
                    </div>
                </Card>
            </ContextMenuTrigger>
        </Colxx>
    )
}

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ServiceDataListView);
