import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const sendDataToServer = async () => {
    try {
      const data = { id: username, passwd: password };
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // HTTP 상태 코드가 200번대이면 성공으로 간주
        const responseData = await response.json();
        console.log('서버 응답:', responseData);
      } else {
        // 성공하지 않은 경우
        console.error('서버 응답 오류:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('데이터 전송 오류:', error);
    }

    navigate('/');
  };

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
        <SubmitButton onClick={sendDataToServer} type="submit">Login</SubmitButton>
      </LoginForm>
    </PageWrapper>
  );
};

export default LoginPage;