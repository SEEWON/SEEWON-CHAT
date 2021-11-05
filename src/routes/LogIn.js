import React, { useState } from 'react';
import { FBauth } from '../fbase';
import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth';
import styled from 'styled-components';

const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      FBauth
    );
  };

  const onSignInSubmit = (event) => {
    event.preventDefault();
    setUpRecaptcha();
    signInWithPhoneNumber(FBauth, '+82' + phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        let code = window.prompt('휴대폰 번호로 전송된 인증코드를 입력하세요');
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            console.log('로그인 성공');
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            setError(error.message);
          });
      })
      .catch((error) => {
        // Error; SMS not sent
        setError(error.message);
      });
  };

  return (
    <LogInWrapper>
      <ErrorMsg>
        {error}
        {error &&
          '에러가 발생했습니다. 페이지를 새로고침하고 다시 시도해 주세요.'}
      </ErrorMsg>
      <Form onSubmit={onSignInSubmit}>
        <div id="recaptcha-container"></div>
        <HPinput
          type="tel"
          placeholder="휴대폰 번호를 입력하세요."
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Submit type="submit" value="Go!" />
      </Form>
    </LogInWrapper>
  );
};

const LogInWrapper = styled.div`
  height: 100%;
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HPinput = styled.input`
  width: 260px;
  height: 30px;
  margin: 40px;
  border: none;
  box-shadow: 2px 2px 2px 2px gray;
  text-align: center;
`;
const Submit = styled.input`
  width: 260px;
  height: 30px;
  margin: 40px;
  border: none;
  box-shadow: 2px 2px 2px 2px gray;
  background-color: #f3f3df;
  :hover {
    cursor: pointer;
  }
`;
const ErrorMsg = styled.div`
  width: 260px;
  color: crimson;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 20%;
  left: 33%;
  font-family: 'GowunDodum-Regular';
`;
export default LogIn;
