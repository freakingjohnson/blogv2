import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Blog from '../Components/Blog/Blog'
import Forum from '../Components/Forum/Forum'

export default (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Blog} path="/blog" />
    <Route component={Forum} path="/forum" />
  </Switch>
)