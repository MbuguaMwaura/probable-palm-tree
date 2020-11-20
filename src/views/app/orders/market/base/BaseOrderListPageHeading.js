import React, {Component} from "react";
import {
    Row,
    Button,
    ButtonDropdown,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    CustomInput,
    Collapse
} from "reactstrap";
import {injectIntl} from "react-intl";

import {Colxx, Separator} from "../../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../../containers/navs/Breadcrumb";
import IntlMessages from "../../../../../helpers/IntlMessages";

const approveBody = {approval: "approved"}
const httpMethod = 'POST'

class BaseOrderListPageHeading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownSplitOpen: false,
            displayOptionsIsOpen: false
        };
    }

    onSelectItem = (itemValue) => {
        console.log(itemValue);
    }

    toggleDisplayOptions = () => {
        this.setState(prevState => ({
            displayOptionsIsOpen: !prevState.displayOptionsIsOpen
        }));
    };

    toggleSplit = () => {
        this.setState(prevState => ({
            dropdownSplitOpen: !prevState.dropdownSplitOpen
        }));
    }

    render() {
        const {messages} = this.props.intl;
        const {
            handleChangeSelectAll,
            changePageSize,
            selectedPageSize,
            totalItemCount,
            match,
            startIndex,
            endIndex,
            selectedItemsLength,
            itemsLength,
            onSearchKey,
            pageSizes,
            heading,
            onUpdateCustomStatus,
            // eslint-disable-next-line
            headingPrefix,
            apiUrl,
            toggleCrudModal,
            dropDownData,
            menuType
        } = this.props;

        const {displayOptionsIsOpen, dropdownSplitOpen} = this.state;
        return (
            <Row>
                <Colxx xxs="12">
                    <div className="mb-2">
                        <h1>
                            {headingPrefix ? headingPrefix + ': ' : ''}
                            <IntlMessages id={heading}/>
                        </h1>

                        <div className="float-sm-right">
                            <ButtonDropdown
                                isOpen={dropdownSplitOpen}
                                toggle={() => this.toggleSplit()}
                            >
                                <div className="btn btn-primary pl-4 pr-0 check-button check-all">
                                    <CustomInput
                                        className="custom-checkbox mb-0 d-inline-block"
                                        type="checkbox"
                                        id="checkAll"
                                        checked={selectedItemsLength >= itemsLength}
                                        onChange={() => handleChangeSelectAll(true)}
                                        label={
                                            <span
                                                className={`custom-control-label ${
                                                    selectedItemsLength > 0 &&
                                                    selectedItemsLength < itemsLength
                                                        ? "indeterminate"
                                                        : ""
                                                }`}
                                            />
                                        }
                                    />
                                </div>
                                <DropdownToggle
                                    caret
                                    color="primary"
                                    className="dropdown-toggle-split pl-2 pr-2"
                                />
                                <DropdownMenu right>
                                    {dropDownData.map((data, index) => {
                                        return <DropdownItem
                                                    key={index}
                                                    onClick={() => toggleCrudModal(data.modalTitle, data.modalValue, selectedItemsLength)}>
                                                <IntlMessages id={data.modalTitle}/>
                                            </DropdownItem>
                                    })}
                                    {menuType === 'request' ?
                                        <DropdownItem
                                            onClick={() => onUpdateCustomStatus(apiUrl + "/approve", true, approveBody, httpMethod)}>
                                            <IntlMessages id="pages.approve" />
                                        </DropdownItem> : null
                                    }

                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                        <Breadcrumb match={match}/>
                    </div>

                    <div className="mb-2">
                        <Button
                            color="empty"
                            className="pt-0 pl-0 d-inline-block d-md-none"
                            onClick={this.toggleDisplayOptions}
                        >
                            <IntlMessages id="pages.display-options"/>{" "}
                            <i className="simple-icon-arrow-down align-middle"/>
                        </Button>
                        <Collapse
                            isOpen={displayOptionsIsOpen}
                            className="d-md-block"
                            id="displayOptions"
                        >
                            <div className="d-block d-md-inline-block">
                                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                    <input
                                        type="text"
                                        name="keyword"
                                        id="search"
                                        placeholder={messages["menu.search"]}
                                        onKeyPress={e => onSearchKey(e)}
                                    />
                                </div>
                            </div>
                            <div className="float-md-right">
                                <span
                                    className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
                                <UncontrolledDropdown className="d-inline-block">
                                    <DropdownToggle caret color="outline-dark" size="xs">
                                        {selectedPageSize}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {pageSizes.map((size, index) => {
                                            return (
                                                <DropdownItem
                                                    key={index}
                                                    onClick={() => changePageSize(size)}
                                                >
                                                    {size}
                                                </DropdownItem>
                                            );
                                        })}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </Collapse>
                    </div>
                    <Separator className="mb-5"/>
                </Colxx>
            </Row>
        );
    }
}

export default injectIntl(BaseOrderListPageHeading);
