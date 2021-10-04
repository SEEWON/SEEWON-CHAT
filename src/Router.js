import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './routes/Chat';
import Home from './routes/Home';
import Profile from './routes/Profile';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
