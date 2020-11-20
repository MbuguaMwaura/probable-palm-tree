import React from 'react'
import Product from "../Product";

const listViewPath = "list/details"

const ProductList = (props) =>(
    <Product match={props.match} menuType="list" listViewPath={listViewPath}/>
)

export default ProductList