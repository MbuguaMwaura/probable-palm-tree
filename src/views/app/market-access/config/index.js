import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'

const MeasurementMetric = lazy(()=>
    import('./metric/MeasurementMetric')
)

const MeasurementUnit = lazy(()=>
    import('./unit/MeasurementUnit')
)

const Config = ({ match }) => (
    <Suspense fallback={<div className="loading" />} >
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/measurement-metric`} />
            <Route
                path={`${match.url}/measurement-metric`}
                render={ props => <MeasurementMetric {...props}/>}
            />
            <Route
                path={`${match.url}/measurement-unit/:id`}
                render={props => <MeasurementUnit {...props} />}
            />
            <Route
                path={`${match.url}/measurement-unit`}
                render={ props => <MeasurementUnit {...props}/>}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)

export default Config