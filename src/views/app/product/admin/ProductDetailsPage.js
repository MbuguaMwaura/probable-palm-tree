import React, { Component, Fragment } from "react";
import {
  Row,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  TabContent,
  TabPane,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import Orders from "./Orders";
import {createNotification, dataDetailsRender, getPostAndPutRequestOptions} from "../../../../helpers/DataManagement";
import {servicePath} from "../../../../constants/defaultValues";
import ProductDetails from "./ProductDetails";
import ProductDropDownMenu from "./ProductDropDownMenu";
import {message} from "antd";
import axios from "axios";

const productDetailsUrl = servicePath + "product/product-details"

class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    const selectedProductId = props.match.params.id ?  props.match.params.id : ''
    const apiUrl =productDetailsUrl + `/${selectedProductId}`

    this.dataDetailsRender = dataDetailsRender.bind(this)
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      isLoading: false,
      error: {status: true, message: ''},
      apiUrl: apiUrl,
      selectedProductId: selectedProductId,
    };

    this.onUpdateProductStatus = this.onUpdateProductStatus.bind(this)
  }

  componentDidMount() {
    this.dataDetailsRender()
  }

  onUpdateProductStatus (statusPath, status) {
    const id = this.state.selectedProductId
    if(!id){
      createNotification('error', "filled","Failed to find record to update", "Update Error")
      return
    }
    const body = {status: status }
    const requestUrl = this.props.updateStatusUrl + statusPath + "/" +  this.state.selectedProductId
    const options = getPostAndPutRequestOptions('PUT',requestUrl, body)

    const hideLoader = message.loading('Updating status..', 120);
    axios(options)
        .then(res => {
          let responseData = res.data
          this.dataDetailsRender()
          hideLoader();
          createNotification('success', 'filled', responseData.message, 'Success');
          return res.data
        }, error => {
          console.log(error)
          hideLoader();
          createNotification('error', 'filled', 'failed to update', 'Error');
        })
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  render() {
    const { item } = this.state;
    const {
      apiUrl,
      menuType
    } = this.props;
    return !this.state.isLoading ?
       <div className="loading"></div> :
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <h1>{item.name}</h1>
              <div className="float-sm-right mb-2">
                <UncontrolledDropdown>
                  <DropdownToggle
                      caret
                      color="primary"
                      size="lg"
                      outline
                      className="top-right-button top-right-button-single"
                  >
                    <IntlMessages id="pages.actions" />
                  </DropdownToggle>
                  <ProductDropDownMenu
                      onUpdateProductStatus={this.onUpdateProductStatus}
                      itemStatus={item.isActive}
                      isInStock={item.isInStock}
                      isPublished={item.isPublished}
                      isFeatured={item.isFeatured}
                      isApproved={item.isApproved}
                      apiUrl={apiUrl}
                      menuType={menuType}/>
                </UncontrolledDropdown>
              </div>

              <Breadcrumb match={this.props.match} />

              <Nav tabs className="separator-tabs ml-0 mb-5">
                <NavItem>
                  <NavLink
                      activeClassName="inactive"
                      className={classnames({
                        active: this.state.activeFirstTab === "1",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                      to="#"
                  >
                    <IntlMessages id="pages.details" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      activeClassName=""
                      className={classnames({
                        active: this.state.activeFirstTab === "2",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("2");
                      }}
                      to="#"
                  >
                    <IntlMessages id="pages.orders" />
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeFirstTab}>
                <TabPane tabId="1">
                  <ProductDetails item={item}/>
                </TabPane>
                <TabPane tabId="2">
                  <Orders />
                </TabPane>
              </TabContent>
            </Colxx>
          </Row>
        </Fragment>
  }
}
export default injectIntl(ProductDetailsPage);
