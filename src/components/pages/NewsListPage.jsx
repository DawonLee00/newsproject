import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import NewsList from "../list/NewsList";
import NewsModal from "../ui/NewsModal";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 8px 8px;
`;

// 페이지 상단부 로고 + 버튼
const UpperContainer = styled.div`
  padding: 0px 16px;
  justify-content: space-between;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 3px solid #000000;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 64px; 

  justify-content: space-between;
  display: flex;
  border-bottom: 3px solid #000000;
`;

const Button = styled.img`
  width: 12%;
`;

const Text = styled.span`
  padding: 8px;
  margin-left: auto;
  color: #4D4D4D;
  font-weight: 600;
  font-size: 16px;
`;

const BoldText = styled.span`
  padding: 16px 8px;
  margin-left: auto;
  color: #000000;
  font-weight: 600;
  font-size: 20px;
  position: relative;
  bottom: 4px;
`;

const SmallText = styled.span`
  margin-left: auto;
  color: #000000;
  font-weight: 600;
  font-size: 14px;
`;

const LogoImage = styled.img`
  padding: 0px 8px;
  width: 100%;
  height: 100px; 
`;

const IconImage = styled.img`
  height: 15%;
`;

const CategoryContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 8px;
`;

const MiddleContainer = styled.div`
  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const PaginationContainer = styled.div`
  position: relative;
  bottom:16px;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 50%;
  margin-left: auto;
`;

const PaginationButton = styled.img`
  margin-right: auto;
  position: relative;
  top:16x;
  border-radius: 5px;
  cursor: pointer;
`;

const GrayText = styled.span`
  margin-right: auto;
  color: #4D4D4D;
  font-weight: 400;
  font-size: 16px;
  position: relative;
  bottom: 2px;
  letter-spacing: 1px; 
`;

const NewsListPage = () => {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const navigate = useNavigate();

  const apiGet = async (type, param) => {
    const apiUrl = 'https://openapi.naver.com/v1/search/' + type + '?query=' + param + '&display=100';
    try {
      const resp = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': 'BQTQ0yYk5ewq2TaTLVmD',
          'X-Naver-Client-Secret': 'gpIClzMNiQ'
        }
      });
      resp.json().then(data => {
        setArticles(data.items);
        console.log('Data received:', articles);
      });
    } catch (error) {
      console.error('실패실패 Error fetching data:', error);
      setError(error);
    }
  };

  useEffect(() => {
    apiGet('news','최재림');
}, []);

const openModal = (content) => {
  setIsModalOpen(true);
  setModalContent(content);
};

const closeModal = () => {
  setIsModalOpen(false);
  setModalContent(null);
};

  return (
    <Wrapper>
      
      <UpperContainer>
        <LogoContainer>
          <LogoImage src="asset/logo.svg" alt="Logo" />
        </LogoContainer>
        <ButtonContainer>
          <Button src="asset/newspaper.svg" alt="newspaper" />
          <Button src="asset/weather.svg" alt="weather" />
          <Button src="asset/shield.svg" alt="shield" />
          <Button src="asset/newspaper.svg" alt="newspaper" />
        </ButtonContainer>
      </UpperContainer>

      <MiddleContainer>
        <CategoryContainer>
          <Text>News</Text>
          <IconImage src="asset/arrow.svg" alt="arrow" />
          <Text>ALL</Text>
        </CategoryContainer>

        <CategoryContainer>
          <IconImage src="asset/tag_rect.svg" alt="arrow" />
          <BoldText>모든 기사</BoldText>
          <div/>
          <SmallText>회원님이 설정하신 키워드로 필터링된 최신 기사입니다.</SmallText>
          <div style={{ padding: '8px 0px' }}/>
          
        </CategoryContainer>

        {articles&& (
          <NewsList
            news={articles}
            onClickItem={(item) => openModal(<iframe src={item.link} title="Article" width="100%" height="100%" />)}
          />
        )}
           <NewsModal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
        <PaginationContainer>
        {/* 이전 페이지로 돌아가는 버튼 */}
        <PaginationButton src="asset/page_return_button.svg" alt="Previous Page"   />
         <GrayText>1 of 146</GrayText>
          {/* 다음 페이지로 넘어가는 버튼 */}
        <PaginationButton src="asset/page_next_button.svg" alt="Next Page"  />
        
        </PaginationContainer>
      </MiddleContainer>
    </Wrapper>
  );
}

export default NewsListPage;