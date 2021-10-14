import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Chat from '../routes/Chat';
import Profile from '../routes/Profile';
import LogIn from '../routes/LogIn';
import ChatList from '../routes/ChatList';
import styled from 'styled-components';

const Router = ({ isLoggedIn, user, friends }) => {
  return (
    <Appwrapper>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            <InteractingSpaceWrapper>
              <Route exact path={`/`}>
                <Home friends={friends} />
              </Route>
              <Route exact path={`/chatlist`}>
                <ChatList friends={friends} />
              </Route>
              {friends.map((friend) => (
                <Route exact path={`/chat/${friend.id}`}>
                  <Chat friend={friend} user={user} />
                </Route>
              ))}
              <Route exact path={`/profile`}>
                <Profile user={user} />
              </Route>
              <Redirect from={`*`} to={`/`} />
            </InteractingSpaceWrapper>
          ) : (
            <>
              <Route exact path={`/`}>
                <LogIn />
              </Route>
              <Redirect from={`*`} to={`/`} />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </Appwrapper>
  );
};

const Appwrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

const InteractingSpaceWrapper = styled.div`
  width: 95vw;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
`;

export default Router;
