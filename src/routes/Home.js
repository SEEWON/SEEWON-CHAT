import React from 'react';
import styled from 'styled-components';

const Home = ({ friends }) => {
  return (
    <div className="friendsList">
      {friends &&
        friends.map((friend) => {
          const { id, name, img, status } = friend;
          return (
            <FriendProfile>
              <FriendImg src={img}></FriendImg>
              <FriendName>{name}</FriendName>
              <FriendStatus>{status}</FriendStatus>
            </FriendProfile>
          );
        })}
      ;
    </div>
  );
};

const FriendProfile = styled.div`
  max-width: 200px;
  /* max-height: 50px; */
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const FriendImg = styled.img`
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
`;
const FriendName = styled.div``;
const FriendStatus = styled.div``;

export default Home;
