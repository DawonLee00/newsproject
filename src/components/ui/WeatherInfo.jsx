import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
 
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px; 
  border-bottom: 4px solid #F6F6F6;
`;

const ImageContainer = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  width: 20%;
  height: 100%;
  padding: 8px 16px;
  margin-top: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  width: 70%;
  height: 100%;
`;

const InfoContainer2 = styled.div`
  flex-direction: column;
  align-items: center;
  
`;

const NoteContainerWrapper = styled.div`
  align-items: flex-end;
  padding: 0px 8px;
  margin-left: auto;
  color: #000000;
  font-weight: 500;
  font-size: 20px;
`;
const BoldText = styled.span`
  margin-top: 4px;
  margin-left: auto;
  color: #000000;
  font-weight: 500;
  font-size: 80px;
  bottom: 4px;
  margin-left: 32px;
`;

const Text = styled.span`
  margin-top: 4px;
  margin-left: auto;
  color: #000000;
  font-weight: 500;
  font-size: 24px;
  bottom: 4px;
  margin-left: 32px;
`;

const NoteContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction:column;
  padding: 8px 8px;
  margin-left: auto;
  color: #000000;
  font-weight: 500;
  font-size: 20px;
  justify-content: flex-end;
`;

const NoteContainer2 = styled.div`
  display: flex;
`;

const SpaceContainer = styled.div`
    padding: 0px 4px;
`;

const SpaceContainer2 = styled.div`
    padding: 16px 0px;
`;

const UnderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const RoundedPurpleContainer = styled.div`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  border-radius: 10px;
  padding: 3px;
  border: 2px solid #6D23F9;
`;


const NoteImage = styled.img`
    padding: 0px 8px
`;

const PurpleText = styled.span`
  padding: 0px 8px;
  margin-right: auto;
  color: #7368F8;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  bottom: 2px;
`;


const GrayText = styled.span`
  padding: 0px 20px;
  margin-left: auto;
  color: #7A757F;
  font-weight: 500;
  font-size: 12px;
  position: relative;
  bottom: 5px;
  justify-content: center;
`;

const IconImage = styled.img`
  margin-left: auto;
  height: 7%;
`;

const WeatherInfoWrapper = styled.div`
  margin-top: 16px;
`;

const WeatherInfoItem = styled.div`
  margin-bottom: 8px;
`;

const WeatherPage = ({ weatherData }) => {
  const renderWeatherInfo = () => {
    if (!weatherData || !weatherData.response || !weatherData.response.body || !weatherData.response.body[0].items || !weatherData.response.body[0].items[0].item) {
      return null;
    }

    const weatherItems = weatherData.response.body[0].items[0].item;

    return (
      <WeatherInfoWrapper>
        <InfoContainer>
        <NoteContainer2>  
        <ImageContainer src={getWeatherImageSrc(weatherItems)} />
        
          <NoteContainerWrapper>
            <Text>2023년 12월 17일</Text> 
                  <NoteContainer>
                    
                    <BoldText>{getFormattedValue('TMP', weatherItems.find(item => item.category[0] === 'TMP').fcstValue[0])}°C</BoldText>
                  
                  </NoteContainer>
           </NoteContainerWrapper>
           </NoteContainer2>
        <UnderContainer>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          
          <RoundedPurpleContainer>
            <PurpleText>{getFormattedValue('SKY', weatherItems.find(item => item.category[0] === 'SKY').fcstValue[0])}</PurpleText>  
          </RoundedPurpleContainer>
          <SpaceContainer/>
          <RoundedPurpleContainer>
            <PurpleText>{getFormattedValue('PTY', weatherItems.find(item => item.category[0] === 'PTY').fcstValue[0])}</PurpleText>
          </RoundedPurpleContainer>
            <SpaceContainer/>
          <RoundedPurpleContainer>
            <PurpleText>풍속: {getFormattedValue('WSD', weatherItems.find(item => item.category[0] === 'WSD').fcstValue[0])}m/s</PurpleText>
          </RoundedPurpleContainer>
            <SpaceContainer/>
        </UnderContainer>

        <UnderContainer>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <RoundedPurpleContainer>
            <PurpleText>강수 확률: {getFormattedValue('POP', weatherItems.find(item => item.category[0] === 'POP').fcstValue[0])}%</PurpleText>
          </RoundedPurpleContainer>
          <SpaceContainer/>
          <RoundedPurpleContainer>
            <PurpleText>신적설: {getFormattedValue('SNO', weatherItems.find(item => item.category[0] === 'SNO').fcstValue[0])}</PurpleText>
          </RoundedPurpleContainer>
          <SpaceContainer/>
          <RoundedPurpleContainer>
            <PurpleText>풍향: {getFormattedValue('VEC', weatherItems.find(item => item.category[0] === 'VEC').fcstValue[0])} deg</PurpleText>
          </RoundedPurpleContainer>
          <SpaceContainer/>
        <RoundedPurpleContainer>
            <PurpleText>습도: {getFormattedValue('REH', weatherItems.find(item => item.category[0] === 'REH').fcstValue[0])}%</PurpleText>  
          </RoundedPurpleContainer>
            <SpaceContainer/>
            <SpaceContainer/>
        </UnderContainer>
        <UnderContainer>
          <NoteContainer/>
          
          <NoteContainer/>
       
        </UnderContainer>  

       
        </InfoContainer>

      </WeatherInfoWrapper>
    );
  };

  const getCategoryName = (categoryCode) => {
    
    const categoryMap = {
      TMP: '기온 (℃)',
      RN1: '1시간 강수량 (mm)',
      UUU: '동서바람성분 (m/s)',
      VVV: '남북바람성분 (m/s)',
      REH: '습도 (%)',
      PTY: '강수형태',
      VEC: '풍향 (deg)',
      WSD: '풍속 (m/s)',
      SKY: '하늘 상태',
      SNO: '1시간 신적설',
      POP: '강수 확률(%)',
      PCP: '1시간 강수량(mm)',
    };

    return categoryMap[categoryCode] || categoryCode;
  };

  const getWeatherImageSrc = (weatherItems) => {
    let ptyValue = parseInt(weatherItems.find(item => item.category[0] === 'PTY').fcstValue[0]);
    console.log(ptyValue)
    
    let imageSrc;
  
    switch (ptyValue) {
      case 0:
        let skyValue = parseInt(weatherItems.find(item => item.category[0] === 'SKY').fcstValue[0]);
        imageSrc = skyValue ="맑음" ? "/asset/sun.png" : "/asset/notsun.png";
        break;
      case 2:
        imageSrc = "/asset/rain.png";
        break;
      case 3:
        imageSrc = "/asset/snow.png";
        break;
  
      default:
        imageSrc = "/asset/sun.png";
    }
  
    return imageSrc;
  };

  const getFormattedValue = (categoryCode, value) => {
    if (categoryCode === 'PTY') {
      // (강수형태 코드값에 따라 다르게 처리)
      const ptyMap = {
        0: '없음',
        1: '비',
        2: '비/눈',
        3: '눈',
        4: '소나기',
        5: '빗방울',
        6: '빗방울/눈날림',
        7: '눈날림',
      };

      return ptyMap[value] || value;
    }
    
    if (categoryCode === 'SKY') {
        let weatherMessage;
        let skyValue = parseInt(value);
        if (skyValue >= 0 && skyValue <= 5) {
          weatherMessage = '맑음';
        } else if (skyValue >= 6 && skyValue <= 8) {
          weatherMessage = '구름많음';
        } else if (skyValue >= 9 && skyValue <= 10) {
          weatherMessage = '흐림';
        } else {
          weatherMessage = '알 수 없음';
        }
    
        return weatherMessage;
      }

    // Handle other cases
    return value >= 900 || value <= -900 ? '누락된 값' : value;
  };

  return renderWeatherInfo();
};

export default WeatherPage;