import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './routes/Home';
import Chat from './routes/Chat';
import Profile from './routes/Profile';
import LogIn from './routes/LogIn';
import ChatList from './routes/ChatList';

const Router = ({ isLoggedIn, friends }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/chatlist">
              <ChatList />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <LogIn />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
