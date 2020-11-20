import React, { Component, Fragment } from "react"
import { Row } from "reactstrap"
import { servicePath } from "../../../../../constants/defaultValues"

import Pagination from "../../../../../containers/pages/Pagination"
import ContextMenuContainer from "../../../../../containers/pages/ContextMenuContainer"
import CommodityModal from "./CommodityModal"
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
import CommodityListPageHeading from "./CommodityListPageHeading";
import CommodityDataListView from "./CommodityDataListView";
import CommodityThumbListView from "./CommodityThumbListView";
import CommodityImageListView from "./CommodityImageListView";

const commodityUrl = servicePath + "commodity"
const adminCommodityUrl = commodityUrl + "/admin"
const linkPath = "commodity"

export default class Commodity extends Component{
    constructor(props) {
        super(props)

        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-commodity-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-commodity-title", modalValue: 'edit'}
        ]

        let heading = "menu.commodity";


        let  dropDownData = [
            {dropDownText: "pages.activate", modalTitle: "pages.activate", modalValue: 2},
            {dropDownText: "pages.deactivate", modalTitle: "pages.deactivate", modalValue: 3}
        ]

        initComponent.call(this,commodityUrl, adminCommodityUrl, heading, titleButtonsData, dropDownData)
    }

    componentDidMount() {
        this.dataListRender();
        this.setState({dataContainsIsActive: true})
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
            modalTitle,
            modalState,
            titleButtonsData,
            selectedItemStatus
        } = this.state
        const { match, location } = this.props
        const headingPrefix = location.customProps ?  location.customProps.name : ''
        const startIndex = (currentPage - 1) * selectedPageSize
        const endIndex = currentPage * selectedPageSize
        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
            <Fragment>
                <div className="disable-text-selection">
                    <CommodityListPageHeading
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
                        toggleCrudModal={this.toggleCrudModal}
                        dropDownData={dropDownData}
                        modalOpen={modalOpen}
                        titleButtonsData={titleButtonsData}
                        onUpdateStatus={this.onUpdateStatus}
                        selectedItemStatus={selectedItemStatus}
                        headingPrefix={headingPrefix}
                    />
                    <CommodityModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={selectedItems}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={commodityUrl}
                    />
                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No Commodities Data'
                            />
                        </CustomContainer>: null
                    }
                    <Row>
                        {this.state.items.map(commodity => {
                            if (this.state.displayMode === "imagelist") {
                                return (
                                    <CommodityImageListView
                                        key={commodity.id}
                                        data={commodity}
                                        isSelect={this.state.selectedItems.includes(commodity.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            } else if (this.state.displayMode === "thumblist") {
                                return (
                                    <CommodityThumbListView
                                        key={commodity.id}
                                        data={commodity}
                                        isSelect={this.state.selectedItems.includes(commodity.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                        path={linkPath}
                                    />
                                );
                            } else {
                                return (
                                    <CommodityDataListView
                                        key={commodity.id}
                                        data={commodity}
                                        isSelect={this.state.selectedItems.includes(commodity.id)}
                                        onCheckUser={this.onCheckItem}
                                        collect={collect}
                                    />
                                );
                            }
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