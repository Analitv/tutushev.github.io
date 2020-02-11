import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { KeepSpace } from './pages/KeepSpace'
import { MainLayout } from './components/layout'
import { rootPath, keepspacePath } from './paths'
import './App.css'

export const App = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path={rootPath()} exact render={() => <Redirect to={keepspacePath()}/>}/>
        <Route path={keepspacePath()} component={KeepSpace}/>
      </Switch>
    </MainLayout>
  )
}