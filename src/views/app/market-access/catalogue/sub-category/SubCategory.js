import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { servicePath } from "../../../../../constants/defaultValues";
import Pagination from "../../../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../../../containers/pages/ContextMenuContainer";
import CrudDataListView from "../../../../../containers/pages/CrudDataListView";
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
} from "../../../../../helpers/DataManagement";
import SubCategoryModal from "./SubCategoryModal";
import SubCategoryListPageHeading from "./SubCategoryListPageHeading";
import {CustomContainer, CustomEmpty} from "../../../../../components/CustomComponents";
import ImageListView from "../../../../../containers/pages/ImageListView";
import ThumbListView from "../../../../../containers/pages/ThumbListView";

const subCategoryUrl = servicePath + "commodity-sub-category"
const adminSubCategoryUrl = subCategoryUrl + "/admin"
const linkPath = "subcategory"

export default class SubCategory extends Component{
    constructor(props) {
        super(props)
        // console.log(props)
        // console.log(props.match.params.id)
        // console.log(props.location.customProps)

        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-subcategory-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-subcategory-title", modalValue: 'edit'}
        ]

        let heading = "menu.sub-category"

        let  dropDownData = [
            {dropDownText: "pages.activate", modalTitle: "pages.activate", modalValue: 2},
            {dropDownText: "pages.deactivate", modalTitle: "pages.deactivate", modalValue: 3}
        ]

        let formErrorMessage = {
            name: "Please enter sub-category name",
            description: "Please enter a description"
        }

        initComponent.call(this,subCategoryUrl,adminSubCategoryUrl,heading,titleButtonsData,dropDownData, formErrorMessage)
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
            formErrorMessage,
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
                    <SubCategoryListPageHeading
                        displayMode={displayMode}
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
                        headingPrefix={headingPrefix}
                    />
                    <SubCategoryModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={selectedItems}
                        items={this.state.items}
                        modalState={modalState}
                        dataListRender={this.dataListRender}
                        createNotification={this.createNotification}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={subCategoryUrl}
                        errorMessage={formErrorMessage}
                    />
                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No Sub Categories Data'
                            />
                        </CustomContainer>: null
                    }
                    <Row>
                        {this.state.items.map(subcategory => {
                            if (this.state.displayMode === "imagelist") {
                                return (
                                    <ImageListView
                                        key={subcategory.id}
                                        data={subcategory}
                                        isSelect={this.state.selectedItems.includes(subcategory.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            } else if (this.state.displayMode === "thumblist") {
                                return (
                                    <ThumbListView
                                        key={subcategory.id}
                                        data={subcategory}
                                        isSelect={this.state.selectedItems.includes(subcategory.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                        path={linkPath}
                                    />
                                );
                            } else {
                                return (
                                    <CrudDataListView
                                        key={subcategory.id}
                                        data={subcategory}
                                        isSelect={this.state.selectedItems.includes(subcategory.id)}
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