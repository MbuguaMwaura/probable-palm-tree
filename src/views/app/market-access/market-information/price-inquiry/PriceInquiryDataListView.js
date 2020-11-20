import React from "react"
import {Badge, Card, CustomInput} from "reactstrap"
import classnames from "classnames"
import { ContextMenuTrigger } from "react-contextmenu"
import { Colxx } from "../../../../../components/common/CustomBootstrap"
import IntlMessages from "../../../../../helpers/IntlMessages";

const PriceInquiryDataListView = ({ data, isSelect, collect, onCheckUser, path}) => {
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
                                <p className="list-item-heading mb-1 truncate">
                                    {data.commodity}
                                </p>
                            </div>
                            <div className="w-50 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.location}
                                </p>
                            </div>
                            <div className="w-50 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.marketPriceDate}
                                </p>
                            </div>
                            <div className="w-70 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.inquiredByEmail}
                                </p>
                            </div>
                            <div className="w-50 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.dateInquired}
                                </p>
                            </div>
                            <div className="w-15 w-sm-100">
                                <Badge color={data.isAnswered ? "primary": "secondary"} pill>
                                    {data.isAnswered ? <IntlMessages id="pages.answered" /> : <IntlMessages id="pages.not-answered" />}
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
export default React.memo(PriceInquiryDataListView);
