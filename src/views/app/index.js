import React, { Component, Suspense, lazy } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AppLayout from '../../layout/AppLayout'

const Dashboard = lazy(() =>
    import('./dashboard')
)
const MarketAccess = lazy(() =>
    import('./market-access')
)
const Product = lazy( () =>
    import('./product')
)
const Logistics = lazy( () =>
    import('./logistics')
)
const Orders = lazy( () =>
    import('./orders')
)

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
              <Route
                  path={`${match.url}/dashboard`}
                  render={props => <Dashboard {...props} />}
              />
              <Route
                  path={`${match.url}/market-access`}
                  render={props => <MarketAccess {...props} />}
              />
              <Route
                  path={`${match.url}/products`}
                  render={props => <Product {...props} />}
              />
              <Route
                  path={`${match.url}/logistics`}
                  render={props => <Logistics {...props} />}
              />
              <Route
                  path={`${match.url}/orders`}
                  render={props => <Orders {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
)
