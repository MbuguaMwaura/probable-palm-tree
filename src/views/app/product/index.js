import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const AdminProductList = lazy(()=>
    import('./admin/list/ProductList')
)
const AdminProductApproval= lazy(()=>
    import('./admin/approval/ProductApproval')
)

const AdminProductListDetail = lazy(()=>
    import('./admin/list/ProductListDetailsPage')
)

const AdminProductApprovalDetail = lazy(()=>
    import('./admin/approval/ProductApprovalDetailsPage')
)

const TraderProduct = lazy(()=>
    import('./trader/TraderProduct')
)

const Product = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/admin/`} />
                <Route exact path={`${match.url}/admin/manage/list`} render={props => <AdminProductList {...props}/>} />
                <Route exact path={`${match.url}/admin/manage/approval`} render={props => <AdminProductApproval {...props}/>} />
                <Route path={`${match.url}/admin/manage/list/details/:id`} render={props => <AdminProductListDetail {...props}/>} />
                <Route path={`${match.url}/admin/manage/approval/details/:id`} render={props => <AdminProductApprovalDetail {...props}/>} />
                <Route path={`${match.url}/trader`} render={props => <TraderProduct {...props}/>} />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default Product