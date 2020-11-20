import React, {Component, Fragment} from "react";
import {
    Row,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane
} from "reactstrap";
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "../../../../../containers/navs/Breadcrumb";
import {Colxx} from "../../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../../helpers/IntlMessages";
import {injectIntl} from "react-intl";
import {dataDetailsRender, onFormSubmit, toggleCrudModal} from "../../../../../helpers/DataManagement";
import BaseOrderDetails from "./BaseOrderDetails";
import UpdateOrderPriceModal from "./UpdateOrderPriceModal";
import UpdateOrderQuantityModal from "./UpdateOrderQuantityModal";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";

const pageType = "details"

class BaseOrderDetailsPage extends Component {
    constructor(props) {
        super(props);
        const orderDetailsUrl = props.orderDetailsUrl
        const selectedOrderId = props.match.params.id ? props.match.params.id : ''
        const apiUrl = orderDetailsUrl + `/${selectedOrderId}`

        this.dataDetailsRender = dataDetailsRender.bind(this)
        this.onFormSubmit = onFormSubmit.bind(this)
        this.toggleCrudModal = toggleCrudModal.bind(this)
        this.toggleTab = this.toggleTab.bind(this);
        this.toggleModal = this.toggleModal.bind(this)

        this.state = {
            activeFirstTab: "1",
            isLoading: false,
            items: [],
            error: {status: true, message: ''},
            apiUrl: apiUrl,
            modalOpen: false,
            selectedOrderId
        };
    }

    componentDidMount() {
        this.dataDetailsRender()
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }

    toggleModal(modalTitle, modalState) {
        this.setState({
            modalOpen: !this.state.modalOpen,
            modalTitle: modalTitle,
            modalState: modalState
        })
    }

    render() {
        const {
            item,
            modalOpen,
            modalTitle,
            modalState,
            formErrorMessage,
            selectedOrderId,
        } = this.state;
        const {
            orderDetailsUrl,
            viewType,
            dropDownData
        } = this.props
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
                                    <IntlMessages id="pages.actions"/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>
                                        <IntlMessages id="pages.select-option"/>
                                    </DropdownItem>
                                    {dropDownData.map((data, index) => {
                                        return <DropdownItem
                                            key={index}
                                            onClick={() => this.toggleModal(data.modalTitle, data.modalValue)}>
                                            <IntlMessages id={data.modalTitle}/>
                                        </DropdownItem>
                                    })}

                                    {viewType === 'request' ?
                                        <DropdownItem
                                            onClick={() => console.log(">>>>>>>> Approve Order >>>>>>>>>")}>
                                            <IntlMessages id="pages.approve"/>
                                        </DropdownItem> : null
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>

                        <Breadcrumb match={this.props.match}/>

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
                                    <IntlMessages id="pages.details"/>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeFirstTab}>
                            <TabPane tabId="1">
                                <BaseOrderDetails item={item}/>
                            </TabPane>
                        </TabContent>
                    </Colxx>
                </Row>

                {this.state.modalState === 'edit-price' ?
                    <UpdateOrderPriceModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleModal}
                        modalTitle={modalTitle}
                        selectedItems={[selectedOrderId]}
                        items={this.state.items}
                        modalState={modalState}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={orderDetailsUrl}
                        errorMessage={formErrorMessage}
                        fetchedItem={item}
                        pageType={pageType}
                        dataDetailsRender={this.dataDetailsRender}
                    /> : null
                }

                {this.state.modalState === 'edit-quantity' ?
                    <UpdateOrderQuantityModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleModal}
                        modalTitle={modalTitle}
                        selectedItems={[selectedOrderId]}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={orderDetailsUrl}
                        errorMessage={formErrorMessage}
                        fetchedItem={item}
                        pageType={pageType}
                        dataDetailsRender={this.dataDetailsRender}
                    /> : null
                }

                {this.state.modalState === 'update-status' ?
                    <UpdateOrderStatusModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={[selectedOrderId]}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={orderDetailsUrl}
                        errorMessage={formErrorMessage}
                        fetchedItem={item}
                        path="status"
                        operation="update"
                    /> : null
                }

                {this.state.modalState === 'cancel-order' ?
                    <UpdateOrderStatusModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={[selectedOrderId]}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={orderDetailsUrl}
                        errorMessage={formErrorMessage}
                        fetchedItem={item}
                        path="status"
                        operation="cancel"
                    /> : null
                }

            </Fragment>
    }
}

export default injectIntl(BaseOrderDetailsPage);
