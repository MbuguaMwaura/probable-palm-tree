import React, { Component, Fragment } from 'react'
import {servicePath} from "../../../../../constants/defaultValues";
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
} from "../../../../../helpers/DataManagement.js";
import { Row } from "reactstrap";
import Pagination from "../../../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../../../containers/pages/ContextMenuContainer";
import {CustomContainer, CustomEmpty} from "../../../../../components/CustomComponents";
import TradeVolumeStatisticsModal from "./TradeVolumeStatisticsModal";
import TradeVolumeStatisticsListPageHeading from "./TradeVolumeStatisticsListPageHeading";
import TradeVolumeStatisticsDataListView from "./TradeVolumeStatisticsDataListView";

const tradeVolumeStatisticsUrl = servicePath + "trade-volume-statistic"

export default class MarketPrice extends Component{
    constructor(props){
        super(props)

        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-trade-volume-statistics-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-trade-volume-statistics-title", modalValue: 'edit'}
        ]

        let heading = "menu.trade-volume-statistics";


        let  dropDownData = [
            {dropDownText:"pages.activate", modalTitle: "", modalValue: 1},
            {dropDownText:"pages.deactivate", modalTitle: "", modalValue: 2}
        ]

        let formErrorMessage = {
            name: "Please enter name",
            description: "Please enter a description"
        }

        initComponent.call(this, tradeVolumeStatisticsUrl,tradeVolumeStatisticsUrl, heading, titleButtonsData, dropDownData, formErrorMessage);

    }

    componentDidMount() {
        this.dataListRender();
        bindMouseTrapCommands.call(this);

    }

    componentWillUnmount() {
        unBindMouseTrapCommands.call(this);
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
            formErrorMessage
        } = this.state
        const { match } = this.props
        const startIndex = (currentPage - 1) * selectedPageSize
        const endIndex = currentPage * selectedPageSize

        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
            <Fragment>
                <div className="disable-text-selection">
                    <TradeVolumeStatisticsListPageHeading
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
                    />
                    <TradeVolumeStatisticsModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={selectedItems}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={tradeVolumeStatisticsUrl}
                        errorMessage={formErrorMessage}
                    />
                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No trade volume statistics data'
                            />
                        </CustomContainer>: null
                    }
                    <Row>
                        {this.state.items.map((statistics, index) => {
                            return (
                                <TradeVolumeStatisticsDataListView
                                    key={index}
                                    data={statistics}
                                    isSelect={this.state.selectedItems.includes(statistics.id)}
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
        );
    }
}