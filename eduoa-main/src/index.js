import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Routes from './routes'
import 'antd/dist/antd.css'

import { StoreProvider } from './store'

const Main = () => {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          {Routes.map(({ path, component, ...routes }) => (
            <Route key={path} path={path} component={component} {...routes} />
          ))}
        </Switch>
      </Router>
    </StoreProvider>
  )
}

ReactDOM.render(<Main />, document.querySelector('#root'))
