import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './Keyword.css';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 8px;
  
`;

const UpperContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const IconImage = styled.img`
  padding: 8px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100px;
  margin-right: 22px;
`;

const MiddleContainer = styled.div`
  padding: 8px 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnderContainer = styled.div`
    padding: 8px 100px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    justify-content: center;    
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  margin-top: 16px;
`;

const StyledInput = styled.input`
  margin-bottom: 8px;
  height: 32px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 8px;
  cursor: pointer;
`;

const StyledButton1 = styled.button`
  padding: 8px 32px;
  margin: 32px;
  border: none;
  color: #ffffff;
  background: ${(props) => props.background};
`;

const KeywordList = styled.ul`
  margin-top: 16px;
  padding: 0;
  list-style: none;
`;

const KeywordItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  margin-left: 8px;
  padding: 4px;
  cursor: pointer;
  border: none;
`;

const KeywordPage = () => {
  const [isFilteringModalOpen, setFilteringModalOpen] = useState(false);
  const [isInterestModalOpen, setInterestModalOpen] = useState(false);
  const [filteringKeyword, setFilteringKeyword] = useState('');
  const [interestKeyword, setInterestKeyword] = useState('');
  const [filteringKeywords, setFilteringKeywords] = useState([]);
  const [interestKeywords, setInterestKeywords] = useState([]);

  const navigate = useNavigate();

  const openFilteringModal = () => setFilteringModalOpen(true);
  const closeFilteringModal = () => setFilteringModalOpen(false);

  const openInterestModal = () => setInterestModalOpen(true);
  const closeInterestModal = () => setInterestModalOpen(false);

  const addFilteringKeyword = () => {
    if (filteringKeyword.trim() !== '') {
      setFilteringKeywords((prevKeywords) => [...prevKeywords, filteringKeyword]);
      setFilteringKeyword('');
      closeFilteringModal();
    }
  };

  const addInterestKeyword = () => {
    if (interestKeyword.trim() !== '') {
      setInterestKeywords((prevKeywords) => [...prevKeywords, interestKeyword]);
      setInterestKeyword('');
      closeInterestModal();
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteFilteringKeyword = (index) => {
    setFilteringKeywords((prevKeywords) => {
      const newKeywords = [...prevKeywords];
      newKeywords.splice(index, 1);
      return newKeywords;
    });
  };

  const handleDeleteInterestKeyword = (index) => {
    setInterestKeywords((prevKeywords) => {
      const newKeywords = [...prevKeywords];
      newKeywords.splice(index, 1);
      return newKeywords;
    });
  };

  const sendKeywordsToAPI = async () => {
    try {
      const data = {      
        filteringKeywords,
        interestKeywords,
      };

      const response = await fetch('http://localhost:8080/keyword/new', {
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
  };

  return (
    <Wrapper>
      <UpperContainer>
        <IconImage
          width={4}
          height={4}
          src="/asset/arrow_back.svg"
          alt="Back"
          onClick={handleGoBack}
        />
        <LogoContainer>
          <LogoImage 
            width={4}
            height={4}
            src="/asset/logo.svg" 
            alt="Logo" 
          />
        </LogoContainer>
      </UpperContainer>
      <MiddleContainer>
     
          <StyledButton1 className="button" background="#6D23F9" onClick={openFilteringModal}>
            필터링 키워드 설정
          </StyledButton1>
          {isFilteringModalOpen && (
            <ModalWrapper>
              <div>필터링 키워드 입력</div>
              <StyledInput
                type="text"
                value={filteringKeyword}
                onChange={(e) => setFilteringKeyword(e.target.value)}
              />
              <StyledButton onClick={addFilteringKeyword}>저장</StyledButton>
              <StyledButton onClick={closeFilteringModal}>닫기</StyledButton>
            </ModalWrapper>
          )}
   
          <StyledButton1 className="button" background="#933239" onClick={openInterestModal}>
            관심 키워드 설정
          </StyledButton1>
          {isInterestModalOpen && (
            <ModalWrapper>
              <div>관심 키워드 입력</div>
              <StyledInput
                type="text"
                value={interestKeyword}
                onChange={(e) => setInterestKeyword(e.target.value)}
              />
              <StyledButton onClick={addInterestKeyword}>저장</StyledButton>
              <StyledButton onClick={closeInterestModal}>닫기</StyledButton>
            </ModalWrapper>
          )}
       
      </MiddleContainer>

      <KeywordList className="keyword-list-title1">
        <h2>필터링 키워드 리스트<br></br></h2>
      </KeywordList>
      {filteringKeywords.map((keyword, index) => (
          <KeywordItem className="keyword-list" key={index}>
            {keyword}
            <DeleteButton onClick={() => handleDeleteFilteringKeyword(index)}>
              X
            </DeleteButton>
          </KeywordItem>
        ))}
      <KeywordList className="keyword-list-title2">
        <h2>관심 키워드 리스트</h2>
      </KeywordList>
      {interestKeywords.map((keyword, index) => (
          <KeywordItem className="keyword-list" key={index}>
            {keyword}
            <DeleteButton onClick={() => handleDeleteInterestKeyword(index)}>
              X
            </DeleteButton>
          </KeywordItem>
        ))}
      <UnderContainer>
        <StyledButton1 className="button" onClick={sendKeywordsToAPI} background="#666666">저장하기</StyledButton1>
      </UnderContainer>
    </Wrapper>
  );
};

export default KeywordPage;