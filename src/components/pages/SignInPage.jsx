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

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_pw, setConfirm_pw] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인:', username, password);
  };

  const sendDataToServer = async () => {
    try {
      const data = { id: username, passwd: password, name:name, year: year};
      const response = await fetch('http://localhost:8080/users/new', {
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

  return (
    <PageWrapper>
      <h2 align="center">회원가입</h2>
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
        <LogInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={confirm_pw}
          onChange={setConfirm_pw}
        />
        <LogInput
          label="이름"
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={setName}
        />
        <LogInput
          label="출생연도"
          type="text"
          placeholder="출생연도를 입력해주세요(ex.2000,1994)"
          value={year}
          onChange={setYear}
        />
        <SubmitButton onClick={sendDataToServer} type="submit">Login</SubmitButton>
      </LoginForm>
    </PageWrapper>
  );
};

export default SignInPage;