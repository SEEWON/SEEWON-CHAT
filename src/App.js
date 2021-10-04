import React, { useState } from 'react';
import Router from './Router';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <Router isLoggedIn={isLoggedIn} />;
};

export default App;
