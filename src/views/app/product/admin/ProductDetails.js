import {Colxx} from "../../../../components/common/CustomBootstrap";
import {Button, Card, CardBody, Row, CardTitle} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import Rating from "../../../../components/common/Rating";
import WebsiteVisitsChartCard from "../../../../containers/dashboards/WebsiteVisitsChartCard";
import React from "react";
import ImageGallery from "./ImageGallery";

const ProductDetails = ({item}) => {
    return(
        <Row>
            <Colxx xxs="12" lg="4" className="mb-4">
                <Card className="mb-4">
                    <div className="position-absolute card-top-buttons">
                        <Button outline color={"white"} className="icon-button">
                            <i className="simple-icon-pencil" />
                        </Button>
                    </div>
                    <img
                        src={item.primaryImage}
                        alt="Detail"
                        className="card-img-top"
                    />

                    <CardBody>
                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.name" />
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
                            <IntlMessages id="pages.price" />
                        </p>
                        <p className="mb-3">
                            {"Tsh."+item.price}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.minimum-order-quantity" />
                        </p>
                        <p className="mb-3">
                            {item.minimumOrderQuantity}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.category" />
                        </p>
                        <p className="mb-3">
                            {item.categoryName}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.sub-category" />
                        </p>
                        <p className="mb-3">
                            {item.subCategoryName}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.commodity" />
                        </p>
                        <p className="mb-3">
                            {item.commodityName}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.in-stock" />
                        </p>
                        <p className="mb-3">
                            {item.isInStock  ?  <IntlMessages id="pages.yes" /> :   <IntlMessages id="pages.no" />}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.published" />
                        </p>
                        <p className="mb-3">
                            {item.isPublished  ?  <IntlMessages id="pages.yes" /> :   <IntlMessages id="pages.no" />}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.featured" />
                        </p>
                        <p className="mb-3">
                            {item.isFeatured  ?  <IntlMessages id="pages.yes" /> :   <IntlMessages id="pages.no" />}
                        </p>

                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.status" />
                        </p>
                        <p className="mb-3">
                            {item.isActive  ?  <IntlMessages id="pages.active" /> :   <IntlMessages id="pages.inactive" />}
                        </p>


                        <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.rating" />
                        </p>
                        <div className="mb-3">
                            <Rating total={5} rating={5} interactive={false} />
                        </div>

                    </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="12" lg="8">
                <Card>
                    <CardBody>
                        <CardTitle>
                            <IntlMessages id="pages.image-gallery"/>
                        </CardTitle>
                        <ImageGallery images={item.images}/>
                    </CardBody>
                </Card>
                <WebsiteVisitsChartCard className="mb-4 mt-4" controls={false} />
            </Colxx>

            <Colxx xxs="12" lg="8">
                {/*<SmallLineCharts itemClass="dashboard-small-chart-analytics" />*/}
            </Colxx>
        </Row>
    )
}

export default ProductDetails