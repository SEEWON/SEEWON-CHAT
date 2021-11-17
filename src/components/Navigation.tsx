import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiTwotoneHome, AiFillWechat, AiOutlineUser } from 'react-icons/ai';

const Navigation = () => (
  <NavContainer>
    <NavItem>
      <Link to={`/`}>
        <AiTwotoneHome size="30" color="#777777" />
      </Link>
    </NavItem>
    <NavItem>
      <Link to={`/chatlist`}>
        <AiFillWechat size="30" color="#777777" />
      </Link>
    </NavItem>
    <NavItem>
      <Link to={`/profile`}>
        <AiOutlineUser size="30" color="#777777" />
      </Link>
    </NavItem>
  </NavContainer>
);

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 20px 0px 20px;
  background-color: #ffffff;
`;
const NavItem = styled.div`
  list-style: none;
  margin-bottom: 20px;
`;

export default Navigation;
