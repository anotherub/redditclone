import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  const PathSwitcher = () => (
    <Switch>
      <PrivateRoute exact path='/'>
        <Home />
      </PrivateRoute>
      <Route exact path='/signup'>
        {Auth() ? <Redirect to='/' /> : <Signup />}
      </Route>
      <Route exact path='/signin'>
        {Auth() ? <Redirect to='/' /> : <Signin />}
      </Route>
      <Route path='*'>
        {/* <Home /> */}
        {Auth() ? <Redirect to='/' /> : <Signin />}
      </Route>
    </Switch>
  )

  const PrivateRoute = ({ children, ...rest }) => {
    console.log('inside privat e')
    return (
      <Route
        {...rest}
        render={({ location }) =>
          Auth() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }
  const Auth = () => {
    return localStorage.getItem('isLoggedIn') == 'true' ? true : false
  }
  return <PathSwitcher />
}

export default App
