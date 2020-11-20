import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Service = lazy(()=>
    import('./service/Service')
)
const ServiceDetails = lazy(()=>
    import('./service/ServiceDetailsPage')
)

const Vehicle = lazy(()=>
    import('./vehicle/Vehicle')
)

const MarketAccess = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/services`} />
                <Route exact path={`${match.url}/services`} render={props => <Service {...props}/>} />
                <Route path={`${match.url}/services/:id`} render={props => <ServiceDetails {...props}/>} />
                <Route path={`${match.url}/vehicles`} render={props => <Vehicle {...props}/>} />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default MarketAccess