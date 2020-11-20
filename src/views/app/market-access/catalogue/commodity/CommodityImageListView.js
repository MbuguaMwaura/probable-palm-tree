import React from "react";
import {
    Row,
    Card,
    CardBody,
    CardSubtitle,
    CardImg,
    CardText,
    CustomInput,
    Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";

const CommodityImageListView = ({ data, isSelect, collect, onCheckItem }) => {
    return (
        <Colxx sm="6" lg="4" xl="3" className="mb-3" key={data.id}>
            <ContextMenuTrigger id="menu_id" data={data.id} collect={collect}>
                <Card
                    onClick={event => onCheckItem(event, data.id)}
                    className={classnames({
                        active: isSelect
                    })}
                >
                    <div className="position-relative">
                        <NavLink to={`?p=${data.id}`} className="w-40 w-sm-100">
                            <CardImg top alt={data.name} src={data.imageUrl} />
                        </NavLink>
                        <Badge
                            color={data.isActive ? "primary": "secondary"}
                            pill
                            className="position-absolute badge-top-left"
                        >
                            {data.isActive ? <IntlMessages id="pages.active" /> : <IntlMessages id="pages.inactive" />}
                        </Badge>
                    </div>
                    <CardBody>
                        <Row>
                            <Colxx xxs="2">
                                <CustomInput
                                    className="item-check mb-0"
                                    type="checkbox"
                                    id={`check_${data.id}`}
                                    checked={isSelect}
                                    onChange={() => {}}
                                    label=""/>
                            </Colxx>
                            <Colxx xxs="10" className="mb-3">
                                <CardSubtitle>{data.name}</CardSubtitle>
                                <CardText className="text-muted text-small mb-2 font-weight-light">
                                    {data.commoditySubCategoryName}
                                </CardText>
                                <CardText className="text-muted text-small mb-2 font-weight-light">
                                    {data.marketPriceMeasurementUnit}
                                </CardText>
                                <CardText className="text-muted text-small mb-2 font-weight-light">
                                    {data.dateAdded}
                                </CardText>
                            </Colxx>
                        </Row>
                    </CardBody>
                </Card>
            </ContextMenuTrigger>
        </Colxx>
    );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CommodityImageListView);
