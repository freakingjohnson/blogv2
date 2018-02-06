import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Blog from '../Components/Blog/Blog'

export default (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Blog} path="/blog" />
  </Switch>
)