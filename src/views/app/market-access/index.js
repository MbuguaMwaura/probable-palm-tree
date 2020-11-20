import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Catalogue = lazy(()=>
    import('./catalogue')
)

const Config = lazy(()=>
    import('./config')
)

const Logistics = lazy(() =>
    import('./logistics')
)

const MarketInformation = lazy(() =>
    import('./market-information')
)

const MarketAccess = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/catalogue`} />
                <Route path={`${match.url}/catalogue`} render={props => <Catalogue {...props}/>} />
                <Route path={`${match.url}/config`} render={props => <Config {...props}/>} />
                <Route path={`${match.url}/logistics`} render={props => <Logistics {...props} />} />
                <Route path={`${match.url}/market-information`} render={props => <MarketInformation {...props} />} />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default MarketAccess