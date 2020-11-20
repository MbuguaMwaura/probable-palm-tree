import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'

const ServiceType = lazy(()=>
    import('./service/ServiceType')
)

const VehicleType = lazy(()=>
    import('./vehicle/VehicleType')
)

const Logistics = ({ match }) => (
    <Suspense fallback={<div className="loading" />} >
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/service-type`} />
            <Route
                path={`${match.url}/service-types`}
                render={ props => <ServiceType {...props}/>}
            />
            <Route
                path={`${match.url}/vehicle-types`}
                render={ props => <VehicleType {...props}/>}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)

export default Logistics