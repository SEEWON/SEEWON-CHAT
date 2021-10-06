import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to={`/`}>Home</Link>
      </li>
      <li>
        <Link to={`/chatlist`}>ChatList</Link>
      </li>
      <li>
        <Link to="/chat/1">Chat with 1</Link>
      </li>
      <li>
        <Link to="/chat/2">Chat with 2</Link>
      </li>
      <li>
        <Link to="/chat/3">Chat with 3</Link>
      </li>
      <li>
        <Link to="/chat/4">Chat with 4</Link>
      </li>
      <li>
        <Link to="/chat/5">Chat with 5</Link>
      </li>
      <li>
        <Link to={`/profile`}>Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
