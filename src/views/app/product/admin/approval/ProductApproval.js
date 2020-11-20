import React from 'react'
import Product from "../Product";

const listViewPath = "approval/details"

const ProductApprovalList = (props) =>(
    <Product match={props.match} menuType="approval" listViewPath={listViewPath}/>
)

export default ProductApprovalList