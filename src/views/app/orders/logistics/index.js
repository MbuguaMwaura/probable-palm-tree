import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const AdminLogisticsOrder = lazy(()=>
    import('./admin/order/LogisticsOrder.js')
)

const AdminLogisticsOrderDetail = lazy(()=>
    import('./admin/order/LogisticsOrderDetails')
)

/*const TraderLogisticsOrder = lazy(()=>
    import('./logistics/LogisticsOrder')
)*/

const AdminLogisticsOrderRequest = lazy(()=>
    import('./admin/request/LogisticsOrderRequest')
)

const AdminLogisticsOrderRequestDetail = lazy(()=>
    import('./admin/request/LogisticsOrderRequestDetails')
)

const Order = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/orders`} />
                <Route exact path={`${match.url}/orders`} render={props => <AdminLogisticsOrder {...props}/>} />
                <Route path={`${match.url}/orders/details/:id`} render={props => <AdminLogisticsOrderDetail {...props}/>} />
                <Route exact path={`${match.url}/requests`} render={props => <AdminLogisticsOrderRequest {...props}/>} />
                <Route path={`${match.url}/requests/details/:id`} render={props => <AdminLogisticsOrderRequestDetail {...props}/>} />
                {/*<Route path={`${match.url}/logistics/orders/trader`} render={props => <TraderLogisticsOrder {...props}/>} />*/}
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default Order