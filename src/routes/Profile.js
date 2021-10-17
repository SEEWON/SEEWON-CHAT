import { updateProfile } from '@firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';

const Profile = ({ userObj }) => {
  const [userName, setUserName] = useState(userObj.displayName);

  const handleSubmitName = async (event) => {
    event.preventDefault();
    await updateProfile(userObj, { displayName: userName });
  };
  return (
    <div>
      <UserProfile>
        <UserImg src={userObj.photoURL}></UserImg>
        <form onSubmit={handleSubmitName}>
          <input
            type="text"
            value={userObj.displayName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input type="submit" value="이름 수정하기" />
        </form>
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

export default Profile;
