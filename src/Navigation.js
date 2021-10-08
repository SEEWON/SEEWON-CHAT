import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiTwotoneHome, AiFillWechat, AiOutlineUser } from 'react-icons/ai';

const Navigation = () => (
  <nav>
    <NavContainer>
      <NavItem>
        <Link to={`/`}>
          <AiTwotoneHome size="30" color="#1C0C5B" />
        </Link>
      </NavItem>
      <NavItem>
        <Link to={`/chatlist`}>
          <AiFillWechat size="30" color="#1C0C5B" />
        </Link>
      </NavItem>
      <NavItem>
        <Link to={`/profile`}>
          <AiOutlineUser size="30" color="#1C0C5B" />
        </Link>
      </NavItem>
    </NavContainer>
  </nav>
);

const NavContainer = styled.div`
  height: 97vh;
  display: flex;
  flex-direction: column;
  padding: 3vh 20px 0px 20px;
  background-color: #ffffff;
`;
const NavItem = styled.div`
  list-style: none;
  margin-bottom: 20px;
`;

export default Navigation;
