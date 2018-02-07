import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Blog from '../Components/Blog/Blog'
import Discussion from '../Components/Discussion/Discussion'

export default (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Blog} path="/blog" />
    <Route component={Discussion} path="/Discussion" />
  </Switch>
)