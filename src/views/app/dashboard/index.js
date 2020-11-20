import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Admin = lazy(()=>
    import('./admin')
)
/*const Logistics = lazy(() =>
    import('./logistics')
)
const MarketInformation = lazy(() =>
    import('./market-information')
)*/

const Dashboard = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
                <Route path={`${match.url}/admin`} render={props => <Admin {...props}/>} />
                {/*<Route path={`${match.url}/logistics`} render={props => <Logistics {...props} />} />
                <Route path={`${match.url}/market-information`} render={props => <MarketInformation {...props} />} />*/}
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default Dashboard