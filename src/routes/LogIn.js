import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import React, { useState } from 'react';
import { FBauth } from '../fbase';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(FBauth, email, password);
        console.log(data);
      } else {
        data = await signInWithEmailAndPassword(FBauth, email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={newAccount ? '계정 만들기' : '로그인'} />
      </form>
      <button onClick={() => setNewAccount(!newAccount)}>
        {newAccount ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
      </button>
    </>
  );
};

export default LogIn;
