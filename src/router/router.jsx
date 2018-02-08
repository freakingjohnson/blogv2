import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Components/Home/Home'
import Blog from '../Components/Blog/Blog'
import Discussion from '../Components/Discussion/Discussion'
import Gallery from '../Components/Gallery/Gallery'
import Admin from '../Components/Admin/Admin'

export default (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Blog} path="/blog" />
    <Route component={Discussion} path="/discussion" />
    <Route component={Gallery} path="/gallery" />
    <Route component={Admin} path="/admin" />
  </Switch>
)