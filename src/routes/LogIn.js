import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth';
import React, { useState } from 'react';
import { FBauth } from '../fbase';

const LogIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('01011112222'); //01011112222
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
        let code = window.prompt('코드를 입력하세요');
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
            console.log('로그인 완료');
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={onSignInSubmit}>
        <div id="recaptcha-container"></div>
        <input
          type="tel"
          placeholder="휴대폰 번호"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input type="submit" value="Go!" />
      </form>
    </>
  );
};

export default LogIn;
