import React, { Component, Fragment } from "react"
import { Row } from "reactstrap"
import { servicePath} from "../../../../constants/defaultValues"
import Pagination from "../../../../containers/pages/Pagination"
import ContextMenuContainer from "../../../../containers/pages/ContextMenuContainer"
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
} from "../../../../helpers/DataManagement.js"
import ProductModal from "./ProductModal";
import ProductDataListView from "./ProductDataListView";
import ProductListPageHeading from "./ProductListPageHeading";
import {CustomContainer, CustomEmpty} from "../../../../components/CustomComponents";
import ProductThumbListView from "./ProductThumbListView";
import ProductImageListView from "./ProductImageListView";

const productsUrl = servicePath + "product"
const adminProductsUrl = productsUrl + "/admin"
const updateProductStatusUrl = productsUrl + "/update-status"

export default class Product extends Component{
    constructor(props) {
        super(props)
        let titleButtonsData = [
            {buttonText:"pages.add-new", color: "primary", modalTitle: "market.add-category-title", modalValue: 'add'},
            {buttonText:"pages.edit", color: "warning", modalTitle: "market.edit-category-title", modalValue: 'edit'}
        ]

        let heading = "menu.products";


        let  dropDownData = [
            {dropDownText:"pages.activate", modalTitle: "market.link-subcategory-to-category", modalValue: 2},
            {dropDownText:"pages.deactivate", modalTitle: "market.link-subcategory-to-category", modalValue: 3},
            {dropDownText:"market.link-subcategory-to-category", modalTitle: "market.link-subcategory-to-category", modalValue: 'sub-category'}
        ]

        let formErrorMessage = {
            name: "Please enter category name",
            description: "Please enter a description"
        }

        initComponent.call(this,productsUrl,adminProductsUrl,heading,titleButtonsData,dropDownData, formErrorMessage);
    }

    componentDidMount() {
        this.dataListRender(adminProductsUrl);
        this.setState({
            dataContainsIsActive: true,
            dataContainsIsInStock : true,
            dataContainsIsPublished: true,
            dataContainsIsFeatured: true,
        })
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
            selectedItemStatus,
            selectedItemIsInStock,
            selectedItemIsPublished,
            selectedItemIsFeatured
        } = this.state
        const { match, menuType, listViewPath } = this.props
        const startIndex = (currentPage - 1) * selectedPageSize
        const endIndex = currentPage * selectedPageSize
        return !this.state.isLoading ? (
            <div className="loading" />
        ) : (
            <Fragment>
                <div className="disable-text-selection">
                    <ProductListPageHeading
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
                        onUpdateCustomStatus={this.onUpdateCustomStatus}
                        selectedItemStatus={selectedItemStatus}
                        selectedItemIsInStock={selectedItemIsInStock}
                        selectedItemIsPublished={selectedItemIsPublished}
                        selectedItemIsFeatured={selectedItemIsFeatured}
                        apiUrl={updateProductStatusUrl}
                        menuType={menuType}
                    />

                    <ProductModal
                        modalOpen={modalOpen}
                        toggleCrudModal={this.toggleCrudModal}
                        modalTitle={modalTitle}
                        selectedItems={selectedItems}
                        items={this.state.items}
                        modalState={modalState}
                        onFormSubmit={this.onFormSubmit}
                        apiUrl={pageSizes}
                        errorMessage={formErrorMessage}
                        adminApiUrl={adminProductsUrl}
                    />

                    {this.state.error.status ?
                        <CustomContainer>
                            <CustomEmpty
                                description='No Products Data'
                            />
                        </CustomContainer>: null
                    }

                    <Row>
                        {this.state.items.map(product => {
                            if (this.state.displayMode === "imagelist") {
                                return (
                                    <ProductImageListView
                                        key={product.id}
                                        data={product}
                                        isSelect={this.state.selectedItems.includes(product.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                    />
                                );
                            } else if (this.state.displayMode === "thumblist") {
                                return (
                                    <ProductThumbListView
                                        key={product.id}
                                        data={product}
                                        isSelect={this.state.selectedItems.includes(product.id)}
                                        collect={collect}
                                        onCheckItem={this.onCheckItem}
                                        path={listViewPath}
                                    />
                                );
                            } else {
                                return (
                                    <ProductDataListView
                                        key={product.id}
                                        data={product}
                                        isSelect={this.state.selectedItems.includes(product.id)}
                                        onCheckUser={this.onCheckItem}
                                        collect={collect}
                                        path={listViewPath}
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