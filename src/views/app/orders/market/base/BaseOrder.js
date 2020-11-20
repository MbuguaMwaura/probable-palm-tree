import React, { Component, Fragment } from "react"
import { Row } from "reactstrap"
import Pagination from "../../../../../containers/pages/Pagination"
import ContextMenuContainer from "../../../../../containers/pages/ContextMenuContainer"
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
} from "../../../../../helpers/DataManagement.js"
import {CustomContainer, CustomEmpty} from "../../../../../components/CustomComponents";
import BaseOrderListPageHeading from "./BaseOrderListPageHeading";
import BaseOrderDataListView from "./BaseOrderDataListView";
import UpdateOrderPriceModal from "./UpdateOrderPriceModal";
import UpdateOrderQuantityModal from "./UpdateOrderQuantityModal";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";

export default class BaseOrder extends Component{
    constructor(props) {
        super(props)

        let heading = props.heading;
        let orderUrl = props.orderUrl
       //let adminOrderUrl = props.adminOrderUrl
        let dropDownData = props.dropDownData

        initComponent.call(this,orderUrl,orderUrl,heading,[],dropDownData, {});
    }

    componentDidMount() {
        this.dataListRender(this.props.adminOrderUrl);
        bindMouseTrapCommands.call(this);
    }

    componentWillUnmount() {
       unBindMouseTrapCommands.call(this);
    }

    render() {
        const {
            displayMode,
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
            titleButtonsData,
            modalTitle,
            modalState,
            formErrorMessage
        } = this.state
        const {
            match,
            orderUrl,
            emptyDataDescription,
            detailsPath,
            viewType
        } = this.props
        const startIndex = (currentPage - 1) * selectedPageSize
        const endIndex = currentPage * selectedPageSize
        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
            <Fragment>
                <div className="disable-text-selection">
                    <BaseOrderListPageHeading
                        heading={heading}
                        displayMode={displayMode}
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
                        dropDownData={dropDownData}
                        modalOpen={modalOpen}
                        titleButtonsData={titleButtonsData}
                        onUpdateCustomStatus={this.onUpdateCustomStatus}
                        apiUrl={orderUrl}
                        toggleCrudModal={this.toggleCrudModal}
                        menuType={viewType}
                    />

                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description={emptyDataDescription}
                            />
                        </CustomContainer>: null
                    }

                    {this.state.modalState === 'edit-price' ?
                        <UpdateOrderPriceModal
                            modalOpen={modalOpen}
                            toggleCrudModal={this.toggleCrudModal}
                            modalTitle={modalTitle}
                            selectedItems={selectedItems}
                            items={this.state.items}
                            modalState={modalState}
                            dataListRender={this.dataListRender}
                            createNotification={this.createNotification}
                            onFormSubmit={this.onFormSubmit}
                            apiUrl={orderUrl}
                            errorMessage={formErrorMessage}
                        /> : null
                    }

                    {this.state.modalState === 'edit-quantity' ?
                        <UpdateOrderQuantityModal
                            modalOpen={modalOpen}
                            toggleCrudModal={this.toggleCrudModal}
                            modalTitle={modalTitle}
                            selectedItems={selectedItems}
                            items={this.state.items}
                            modalState={modalState}
                            dataListRender={this.dataListRender}
                            createNotification={this.createNotification}
                            onFormSubmit={this.onFormSubmit}
                            apiUrl={orderUrl}
                            errorMessage={formErrorMessage}
                        /> : null
                    }

                    {this.state.modalState === 'update-status' ?
                        <UpdateOrderStatusModal
                            modalOpen={modalOpen}
                            toggleCrudModal={this.toggleCrudModal}
                            modalTitle={modalTitle}
                            selectedItems={selectedItems}
                            items={this.state.items}
                            modalState={modalState}
                            dataListRender={this.dataListRender}
                            createNotification={this.createNotification}
                            onFormSubmit={this.onFormSubmit}
                            apiUrl={orderUrl}
                            errorMessage={formErrorMessage}
                            path="status"
                            operation="update"
                        /> : null
                    }

                    {this.state.modalState === 'cancel-order' ?
                        <UpdateOrderStatusModal
                            modalOpen={modalOpen}
                            toggleCrudModal={this.toggleCrudModal}
                            modalTitle={modalTitle}
                            selectedItems={selectedItems}
                            items={this.state.items}
                            modalState={modalState}
                            dataListRender={this.dataListRender}
                            createNotification={this.createNotification}
                            onFormSubmit={this.onFormSubmit}
                            apiUrl={orderUrl}
                            errorMessage={formErrorMessage}
                            path="status"
                            operation="cancel"
                        /> : null
                    }

                    <Row>
                        {this.state.items.map(order => {
                            return (
                                <BaseOrderDataListView
                                    key={order.id}
                                    data={order}
                                    isSelect={this.state.selectedItems.includes(order.id)}
                                    onCheckUser={this.onCheckItem}
                                    collect={collect}
                                    path={detailsPath}
                                />
                            );
                        })}

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