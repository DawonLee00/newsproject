// WineDetailPage 컴포넌트
import React, { useState, useEffect, } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import WineDetailModule from "../ui/WineDetailModule";
import PriceChartModule from "../ui/PriceChartModule";


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 8px 8px;
`;

const UpperContainer = styled.div`

  padding: 8px 0px;
  justify-content: space-between;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoImage = styled.img`
  padding: 0px 8px;
  height: 20px;
`;

const IconImage = styled.img`
  width: ${(props) => props.width}%;
  height:  ${(props) => props.height}%;
`;

const GrayText = styled.span`
  margin-right: auto;
  color: #49454E;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  bottom: 5px;
  justify-content: center;
  padding:0px 8px;
`;

const PurpleText = styled.span`
  
  margin-right: auto;
  color: #6D23F9;
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size}px;

`;

const WineDetailPage = (props) => {
  const { slug } = useParams();
  const [wineData, setWineData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.veenoverse.com/ssr/v2/wines/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Wine Detail API 응답:", data);
        setWineData(data);
        console.log(data.data.item.price_statistic.avg.value);
      } catch (error) {
        console.error("와인 상세 정보 가져오기 에러:", error);
      }
    };
  
    fetchData();
  }, [slug]);

  const handleGoBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <Wrapper>
      <UpperContainer>
        <LogoContainer/>
        <LogoContainer>
          <IconImage width={8} height={15} src="/asset/arrow_back.svg" alt="Back" onClick={handleGoBack} />
          <LogoImage src="/asset/veenoverse_logo.svg" alt="Logo" />
        </LogoContainer>
      </UpperContainer>
  
      {wineData && wineData.data && wineData.data.item && (
        <>
          <FlexContainer/>
          {/* 상세 정보*/}
          <WineDetailModule
            imageURL={wineData.data.item.image.thumb}
            wineDetail={wineData}
          />
          {/* 가격 통계 */}
          <PriceChartModule
            avg={wineData.data.item.price_statistic.avg.value}
            min={wineData.data.item.price_statistic.min.value}
            max={wineData.data.item.price_statistic.max.value}
            value={wineData.data.item.prices[0].value}
            wineData={wineData}
          />
          
          
        </>
      )}
     
    </Wrapper>
  );
  
};

export default WineDetailPage;
