import React, { Component, Fragment } from "react"
import { Row } from "reactstrap"
import { servicePath } from "../../../../../constants/defaultValues"
import Pagination from "../../../../../containers/pages/Pagination"
import ContextMenuContainer from "../../../../../containers/pages/ContextMenuContainer"
import CustomListPageHeading from "../../../../../containers/pages/CustomListPageHeading"
import {
    initComponent,
    /* eslint-disable */
    changePageSize,
    onChangePage,
    dataListRender,
    onSearchKey,
    onCheckItem,
    handleChangeSelectAll,
    toggleModal,
    onContextMenu,
    toggleCrudModal,
    createNotification,
    /* eslint-enable */
    bindMouseTrapCommands,
    unBindMouseTrapCommands,
    collect
} from "../../../../../helpers/DataManagement"
import CrudDataListView from "../../../../../containers/pages/CrudDataListView";
import CrudModal from "../../../../../containers/pages/CrudModal";
import {CustomContainer, CustomEmpty} from "../../../../../components/CustomComponents";

const paymentOptionUrl = servicePath + "payment-option"

export default class PaymentOption extends Component{
    constructor(props) {
        super(props)

        let heading = "menu.payment-option"

        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-payment-option-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-payment-option-title", modalValue: 'edit'}
        ]
        let dropDownData = [
            {dropDownText:"pages.activate", modalTitle: "pages.activate", modalValue: 2},
            {dropDownText:"pages.deactivate", modalTitle: "pages.deactivate", modalValue: 3}
        ]

        let formErrorMessage = {
            name: "Please enter payment name",
            description: "Please enter a description"
        }

        initComponent.call(this, paymentOptionUrl, paymentOptionUrl, heading, titleButtonsData, dropDownData, formErrorMessage)
    }

    componentDidMount() {
        this.dataListRender()
        this.setState({dataContainsIsActive: true})
        bindMouseTrapCommands.call(this)
    }

    componentWillUnmount() {
        unBindMouseTrapCommands.call(this)
    }

    render() {
        const {
            currentPage,
            items,
            selectedPageSize,
            totalItemCount,
            selectedOrderOption,
            selectedItems,
            orderOptions,
            pageSizes,
            modalOpen,
            heading,
            dropDownData,
            modalTitle,
            modalState,
            titleButtonsData,
            formErrorMessage,
            selectedItemStatus
        } = this.state
        const { match } = this.props
        const startIndex = (currentPage - 1) * selectedPageSize
        const endIndex = currentPage * selectedPageSize
        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
            <Fragment>
                <div className="disable-text-selection">
                    <CustomListPageHeading
                        heading={heading}
                        changeDisplayMode={this.changeDisplayMode}
                        handleChangeSelectAll={this.handleChangeSelectAll}
                        changeOrderBy={this.changeOrderBy}
                        changePageSize={this.changePageSize}
                        selectedPageSize={selectedPageSize}
                        totalItemCount={totalItemCount}
                        selectedOrderOption={selectedOrderOption}
                        match={match}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        selectedItemsLength={selectedItems ? selectedItems.length : 0}
                        itemsLength={items ? items.length : 0}
                        onSearchKey={this.onSearchKey}
                        orderOptions={orderOptions}
                        pageSizes={pageSizes}
                        toggleCrudModal={this.toggleCrudModal}
                        dropDownData={dropDownData}
                        modalOpen={modalOpen}
                        titleButtonsData={titleButtonsData}
                        onUpdateStatus={this.onUpdateStatus}
                        selectedItemStatus={selectedItemStatus}
                    />
                    <CrudModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={selectedItems}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={paymentOptionUrl}
                        errorMessage={formErrorMessage}
                    />
                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No payment option data'
                            />
                        </CustomContainer>: null
                    }
                    <Row>
                        {this.state.items.map(options => {
                            return (
                                <CrudDataListView
                                    key={options.id}
                                    data={options}
                                    isSelect={this.state.selectedItems.includes(options.id)}
                                    onCheckUser={this.onCheckItem}
                                    collect={collect}
                                />
                            );
                        })}{" "}
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.state.totalPage}
                            onChangePage={i => this.onChangePage(i)}
                        />
                        <ContextMenuContainer
                            onContextMenuClick={this.onContextMenuClick}
                            onContextMenu={this.onContextMenu}
                        />
                    </Row>
                </div>
            </Fragment>
        )
    }
}