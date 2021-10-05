import React, { useState } from 'react';
import Router from './Router';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [friends, setFriends] = useState([
    { id: 1, name: '시원' },
    { id: 2, name: '지우' },
    { id: 3, name: '친구1' },
    { id: 4, name: '친구2' },
    { id: 5, name: '친구3' },
  ]);
  return <Router isLoggedIn={isLoggedIn} friends={friends} />;
};

export default App;
