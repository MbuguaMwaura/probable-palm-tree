import React, { Component, Fragment } from "react"
import { Row } from "reactstrap"
import { servicePath} from "../../../../../constants/defaultValues"
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
import CategoryDataListView from "./CategoryDataListView"
import {CustomContainer, CustomEmpty} from "../../../../../components/CustomComponents";
import CategoryModal from "./CategoryModal";
import CategoryListPageHeading from "./CategoryListPageHeading";
import ThumbListView from "../../../../../containers/pages/ThumbListView";
import ImageListView from "../../../../../containers/pages/ImageListView";

const categoriesUrl = servicePath + "commodity-category"
const adminCategoriesUrl = categoriesUrl + "/admin"
const linkPath = "category"

export default class Category extends Component{
    constructor(props) {
        super(props)

        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-category-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-category-title", modalValue: 'edit'}
        ]

        let heading = "menu.category";


        let  dropDownData = [
            {dropDownText:"pages.activate", modalTitle: "market.link-subcategory-to-category", modalValue: 2},
            {dropDownText:"pages.deactivate", modalTitle: "market.link-subcategory-to-category", modalValue: 3},
            {dropDownText:"market.link-subcategory-to-category", modalTitle: "market.link-subcategory-to-category", modalValue: 'sub-category'}
        ]

        let formErrorMessage = {
            name: "Please enter category name",
            description: "Please enter a description"
        }

        initComponent.call(this,categoriesUrl,adminCategoriesUrl,heading,titleButtonsData,dropDownData, formErrorMessage);
    }

    componentDidMount() {
        this.dataListRender(adminCategoriesUrl);
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
        const { match } = this.props
        const startIndex = (currentPage - 1) * selectedPageSize
        const endIndex = currentPage * selectedPageSize
        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
            <Fragment>
                <div className="disable-text-selection">
                    <CategoryListPageHeading
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
                    />

                    <CategoryModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={selectedItems}
                        items={this.state.items}
                        modalState={modalState}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={categoriesUrl}
                        errorMessage={formErrorMessage}
                        adminApiUrl={adminCategoriesUrl}
                    />

                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No Categories Data'
                            />
                        </CustomContainer>: null
                    }

                    <Row>
                        {this.state.items.map(category => {
                            if (this.state.displayMode === "imagelist") {
                                return (
                                    <ImageListView
                                        key={category.id}
                                        data={category}
                                        isSelect={this.state.selectedItems.includes(category.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            } else if (this.state.displayMode === "thumblist") {
                                return (
                                    <ThumbListView
                                        key={category.id}
                                        data={category}
                                        isSelect={this.state.selectedItems.includes(category.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                        path={linkPath}
                                    />
                                );
                            } else {
                                return (
                                    <CategoryDataListView
                                        key={category.id}
                                        data={category}
                                        isSelect={this.state.selectedItems.includes(category.id)}
                                        onCheckUser={this.onCheckItem}
                                        collect={collect}
                                        path={linkPath}
                                    />
                                );
                            }
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