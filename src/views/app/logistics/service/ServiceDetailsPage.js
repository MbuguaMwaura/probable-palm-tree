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
import Breadcrumb from "../../../../containers/navs/Breadcrumb";
import {Colxx} from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";
import {injectIntl} from "react-intl";
import {dataDetailsRender, onFormSubmit, toggleCrudModal} from "../../../../helpers/DataManagement";
import ServiceDetails from "./ServiceDetails";
import {servicePath} from "../../../../constants/defaultValues";

const serviceUrl = servicePath + "logistic-service"

const  dropDownData = [
    { modalTitle: "pages.edit", modalValue: 'edit'},
    { modalTitle: "pages.update-status", modalValue: 'update-status'}
]
class ServiceDetailsPage extends Component {
    constructor(props) {
        super(props);
        const selectedServiceId = props.match.params.id ? props.match.params.id : ''
        const apiUrl = serviceUrl + `/details/${selectedServiceId}`

        this.dataDetailsRender = dataDetailsRender.bind(this)
        this.onFormSubmit = onFormSubmit.bind(this)
        this.toggleCrudModal = toggleCrudModal.bind(this)
        this.toggleTab = this.toggleTab.bind(this);

        this.state = {
            activeFirstTab: "1",
            isLoading: false,
            items: [],
            error: {status: true, message: ''},
            apiUrl: apiUrl,
            modalOpen: false,
            selectedServiceId
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

    render() {
        const {
            item
        } = this.state;
        const {
            viewType
        } = this.props
        return !this.state.isLoading ?
            <div className="loading"/>
            :(
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
                                <ServiceDetails item={item}/>
                            </TabPane>
                        </TabContent>
                    </Colxx>
                </Row>

            </Fragment>
        )
    }
}

export default injectIntl(ServiceDetailsPage);
