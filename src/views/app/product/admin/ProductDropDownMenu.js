import React from "react"
import {DropdownItem, DropdownMenu} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";

const ProductDropDownMenu = (props) => {
    const {
        onUpdateProductStatus,
        itemStatus,
        isInStock,
        isFeatured,
        isPublished,
        isApproved,
        menuType
    } = props
    return (
        <div>
            { menuType ==='list' ?
                <DropdownMenu right>
                    <DropdownItem
                        onClick={() => onUpdateProductStatus("/active", !itemStatus)}>
                        <IntlMessages id={itemStatus ? "pages.deactivate" : "pages.activate"}/>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => onUpdateProductStatus("/published", !isPublished)}>
                        <IntlMessages
                            id={isPublished ? "products.unpublish" : "products.publish"}/>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => onUpdateProductStatus("/instock", !isInStock)}>
                        <IntlMessages
                            id={isInStock ? "products.out-of-stock" : "products.in-stock"}/>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => onUpdateProductStatus("/featured", !isFeatured)}>
                        <IntlMessages
                            id={isFeatured ? "products.remove-featured" : "products.featured"}/>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => onUpdateProductStatus("/featured", !isApproved)}>
                        <IntlMessages id={isApproved ? "pages.disapprove" : "pages.approve"}/>
                    </DropdownItem>
                </DropdownMenu> :
                <DropdownMenu right>
                    <DropdownItem
                        onClick={() => onUpdateProductStatus("/featured", !isApproved)}>
                        <IntlMessages id={isApproved ? "pages.disapprove" : "pages.approve"}/>
                    </DropdownItem>
                </DropdownMenu>
            }
        </div>
    )
}

export default ProductDropDownMenu