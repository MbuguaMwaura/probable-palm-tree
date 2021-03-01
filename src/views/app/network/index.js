import React, { Suspense ,lazy} from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// const Service = lazy(()=>
//     import('./service/Service')
// )
// const ServiceDetails = lazy(()=>
//     import('./service/ServiceDetailsPage')
// )

const Forum = lazy(()=>
    import('./forum/Forum')
)

const MarketAccessTwo = ({ match }) => (
    <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/network`} />
    
                <Route path={`${match.url}/forum` }  render={props => <Forum {...props}/>} />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    </div>
)

export default MarketAccessTwo