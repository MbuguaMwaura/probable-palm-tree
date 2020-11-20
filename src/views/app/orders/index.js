import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Logistics = lazy(()=>
    import('./logistics')
)

const Market = lazy(()=>
    import('./market')
)

const Order = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/logistics`} />
                <Route
                    path={`${match.url}/logistics`}
                    render={props => <Logistics {...props}/>}
                />
                <Route path={`${match.url}/market`} render={props => <Market {...props}/>} />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default Order