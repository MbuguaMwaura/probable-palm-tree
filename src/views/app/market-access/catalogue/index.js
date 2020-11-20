import React, { Suspense, lazy } from "react"
import { Redirect, Route, Switch } from 'react-router-dom'

const Category = lazy(()=>
    import('./category/Category')
)

const SubCategory = lazy(()=>
    import('./sub-category/SubCategory')
)

const Commodity = lazy(()=>
    import('./commodity/Commodity')
)

const DeliveryOption = lazy(()=>
    import('./delivery-option/DeliveryOption')
)

const PaymentOption = lazy(()=>
    import('./payment-option/PaymentOption')
)

const Tax = lazy(()=>
    import('./tax/Tax')
)

const Catalogue = ({ match }) => (
<Suspense fallback={<div className="loading" />}>
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/category`} />
        <Route
            path={`${match.url}/category`}
            render={props => <Category {...props} />}
        />
        <Route
            path={`${match.url}/sub-category`}
            render={props => <SubCategory {...props} />}
        />

        <Route
            path={`${match.url}/commodity`}
            render={props => <Commodity {...props} />}
        />
        <Route
            path={`${match.url}/delivery-option`}
            render={props => <DeliveryOption {...props} />}
        />
        <Route
            path={`${match.url}/payment-option`}
            render={props => <PaymentOption {...props} />}
        />
        <Route
            path={`${match.url}/tax`}
            render={props => <Tax {...props} />}
        />
        <Redirect to="/error" />
    </Switch>
</Suspense>
)

export default Catalogue