import React, { useState } from 'react';
import styled from 'styled-components';
import LogInput from "../ui/LogInput";

const PageWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  background-color: #666666;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인:', username, password);
  };

  return (
    <PageWrapper>
      <h2 align="center">로그인</h2>
      <LoginForm onSubmit={handleLogin}>
        <LogInput
          label="아이디"
          type="text"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={setUsername}
        />
        <LogInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={setPassword}
        />
        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
    </PageWrapper>
  );
};

export default LoginPage;