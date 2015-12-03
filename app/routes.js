import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddPost from './components/AddPost';
import PostPage from './components/PostPage';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/add' component={AddPost} />
    <Route path='/posts/:id' component={PostPage} />
  </Route>
  );