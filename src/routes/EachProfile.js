import React from 'react';
import styled from 'styled-components';

const EachProfile = ({ profileURL, profileName }) => {
  return (
    <div>
      <FriendImg src={profileURL} />
      <div>{profileName}</div>
    </div>
  );
};

const FriendImg = styled.img`
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
`;

export default EachProfile;
