import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Chat from '../routes/Chat';
import Profile from '../routes/Profile';
import LogIn from '../routes/LogIn';
import ChatList from '../routes/ChatList';
import styled from 'styled-components';

const Router = ({ refreshUser, isLoggedIn, userObj, user, friends }) => {
  return (
    <Appwrapper>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            userObj.displayName ? (
              // 처음 로그인하는 사람(displayName===null)은 <Profile />로 이동해 닉네임 설정
              <InteractingSpaceWrapper>
                <Route exact path={`/`}>
                  <Home userObj={userObj} />
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
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                </Route>
                <Redirect from={`*`} to={`/`} />
              </InteractingSpaceWrapper>
            ) : (
              <InteractingSpaceWrapper>
                <Profile refreshUser={refreshUser} userObj={userObj} />
              </InteractingSpaceWrapper>
            )
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
