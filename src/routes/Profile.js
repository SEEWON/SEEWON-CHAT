import React from 'react';
import styled from 'styled-components';

const Profile = (props) => {
  return (
    <div>
      <UserProfile>
        <UserImg src={props.user.img}></UserImg>
        <UserName>{props.user.name}</UserName>
        <UserStatus>{props.user.status}</UserStatus>
      </UserProfile>
    </div>
  );
};

const UserProfile = styled.div`
  max-width: 200px;
  /* max-height: 50px; */
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const UserImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const UserName = styled.div``;
const UserStatus = styled.div``;

export default Profile;
