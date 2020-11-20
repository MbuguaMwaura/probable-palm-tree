import React from "react"
import { Card, CustomInput, Badge } from "reactstrap"
import { NavLink } from "react-router-dom"
import classnames from "classnames"
import { ContextMenuTrigger } from "react-contextmenu"
import { Colxx } from "../../../../components/common/CustomBootstrap"
import IntlMessages from "../../../../helpers/IntlMessages"

const ProductDataListView = ({ data, isSelect, collect, onCheckUser, path}) => {
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
                            <NavLink to={{
                                pathname: `${path}/${data.id}`,
                                customProps: {name: `${data.name}`, id: `${data.id}`}
                            }}
                                     className="w-40 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.name}
                                </p>
                            </NavLink>
                            <div className="w-30 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.commodityName}
                                </p>
                            </div>
                            <div className="w-40 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.subCategoryName}
                                </p>
                            </div>
                            <div className="w-30 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.measurementUnit}
                                </p>
                            </div>
                            <div className="w-20 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.minimumOrderQuantity}
                                </p>
                            </div>
                            <div className="w-60 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {data.traderName}
                                </p>
                            </div>
                            <div className="w-25 w-sm-100">
                                <Badge color={data.isApproved ? "primary": "secondary"} pill>
                                    {data.isApproved? <IntlMessages id="pages.approved" /> : <IntlMessages id="pages.not-approved" />}
                                </Badge>
                            </div>
                            <div className="w-25 w-sm-100">
                                <Badge color={data.isPublished ? "primary": "secondary"} pill>
                                    {data.isPublished? <IntlMessages id="pages.published" /> : <IntlMessages id="pages.not-published" />}
                                </Badge>
                            </div>
                            <div className="w-25 w-sm-100">
                                <Badge color={data.isFeatured ? "primary": "secondary"} pill>
                                    {data.isFeatured? <IntlMessages id="pages.featured" /> : <IntlMessages id="pages.not-featured" />}
                                </Badge>
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
export default React.memo(ProductDataListView);