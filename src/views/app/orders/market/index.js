import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const AdminMarketOrder = lazy(()=>
    import('./admin/orders/MarketOrder')
)

const AdminMarketOrderDetail = lazy(()=>
    import('./admin/orders/MarketOrderDetails')
)

/*const TraderMarketOrder = lazy(()=>
    import('./market/MarketOrder')
)*/

const AdminMarketOrderRequest = lazy(()=>
    import('./admin/request/MarketOrderRequest')
)

const AdminMarketOrderRequestDetail = lazy(()=>
    import('./admin/request/MarketOrderRequestDetails')
)

const Order = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/orders`} />
                <Route exact path={`${match.url}/orders`} render={props => <AdminMarketOrder {...props}/>} />
                <Route path={`${match.url}/orders/details/:id`} render={props => <AdminMarketOrderDetail {...props}/>} />
                <Route exact path={`${match.url}/requests`} render={props => <AdminMarketOrderRequest {...props}/>} />
                <Route path={`${match.url}/requests/details/:id`} render={props => <AdminMarketOrderRequestDetail {...props}/>} />
                {/*<Route path={`${match.url}/market/orders/trader`} render={props => <TraderMarketOrder {...props}/>} />*/}
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default Order