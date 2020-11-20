import React, { Component, Fragment } from 'react'
import CustomListPageHeading from "../../../../../containers/pages/CustomListPageHeading";
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
import CrudModal from "../../../../../containers/pages/CrudModal";
import MeasurementMetricDataListView from "./MeasurementMetricDataListView";
import {CustomContainer, CustomEmpty} from "../../../../../components/CustomComponents";

const metricUrl = servicePath + "measurement-metric"
//const adminMetricUrl =metricUrl + "/admin"
const linkPath = "measurement-unit"

export default class MeasurementMetric extends Component{
    constructor(props){
        super(props)

        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-measurement-metric-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-measurement-metric-title", modalValue: 'edit'}
        ]

        let heading = "menu.measurement-metric";


        let  dropDownData = [
            {dropDownText:"pages.activate", modalTitle: "pages.activate", modalValue: 1},
            {dropDownText:"pages.deactivate", modalTitle: "pages.deactivate", modalValue: 2},
            {dropDownText:"market.link-metric-unit-to-measurement-metric", modalTitle: "market.link-metric-unit-to-measurement-metric", modalValue: 1}
        ]

        let formErrorMessage = { name: "Please enter metric name" }

        initComponent.call(this, metricUrl, metricUrl, heading, titleButtonsData, dropDownData, formErrorMessage);

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
                        apiUrl={metricUrl}
                        errorMessage={formErrorMessage}
                    />
                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No metric unit data'
                            />
                        </CustomContainer>: null
                    }
                    <Row>
                        {this.state.items.map(metric => {
                            return (
                                <MeasurementMetricDataListView
                                    key={metric.id}
                                    data={metric}
                                    isSelect={this.state.selectedItems.includes(metric.id)}
                                    onCheckUser={this.onCheckItem}
                                    collect={collect}
                                    path={linkPath}
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