import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router'

const MarketPrice = lazy(()=>
    import('./market-price/MarketPrice')
)

const PriceInquiry = lazy(()=>
    import('./price-inquiry/PriceInquiry')
)

const TradeVolumeStatistics = lazy(()=>
    import('./trade-volume-statistics/TradeVolumeStatistics')
)

const MarketInformation = ({ match }) => (
    <Suspense fallback={<div className="loading" />} >
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/market-prices`} />
            <Route
                path={`${match.url}/market-prices`}
                render={ props => <MarketPrice {...props}/>}
            />
            <Route
                path={`${match.url}/price-inquiries`}
                render={ props => <PriceInquiry {...props}/>}
            />
            <Route
                path={`${match.url}/trade-volumes`}
                render={ props => <TradeVolumeStatistics {...props}/>}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)

export default MarketInformation