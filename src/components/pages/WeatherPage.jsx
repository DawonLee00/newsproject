import React, { useState, useEffect } from 'react';
import { parseString } from 'xml2js';
import styled from 'styled-components';
import WeatherInfo from '../ui/WeatherInfo';
import ChartView from '../ui/ChartView';
import PriceChartModule from '../ui/PriceChartModule';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 8px;
`;

const Wrapper2 = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px; 
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
  margin-right: 100px;
`;

const WeahterPage = () => {
  let [weatherData, setWeatherData] = useState(null);
  let [todayDate, setTodayDate] = useState('');
  let [thisTime, setThisTime] = useState('');
  let [currentPosition, setCurrentPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTodayDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const todayDate = `${year}${month}${day}`;
      const time = date.getHours();
      setTodayDate(todayDate);
      setThisTime(time);
      console.log("시간",time);
    };

    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    };

    getTodayDate();
    getCurrentPosition();
  }, []);

  const calculateBaseTime = () => {
    const now = new Date(); 
    let baseTime = 0;
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let day = String(now.getDate()).padStart(2, '0');
    // Base_time 정의
    const baseTimes = [200, 500, 800, 1100, 1400, 1700, 2000, 2300];
  
    // API 제공 시간(~이후) 정의
    const apiSupplyTimes = [210, 510, 810, 1110, 1410, 1710, 2010, 2310];
  
    // 현재 시간에서 baseTimes를 차례대로 비교하여 가장 최근의 시간을 찾음
    for (let i = 0; i < baseTimes.length; i++) {
      if (now.getHours() * 100 + now.getMinutes() < apiSupplyTimes[i]) {
        baseTime = baseTimes[i - 1 >= 0 ? i - 1 : baseTimes.length - 1];
        if (now.getHours() * 100 + now.getMinutes() <= 209) {
          now.setDate(now.getDate() - 1);
        }        
        break;
      }
    }

    
  
    return baseTime;
  }
  
  const currentBaseTime = calculateBaseTime();
  console.log(`현재 시간에 대응하는 base_time: ${currentBaseTime}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=HHvG3%2F3Mx%2BtbYNvb%2BfJhtqOdTOgqEscPhlnGIB3znKp3p%2FEhIf6N5ZziE3hRJ87zIhcgzgsB7ZjJWHW7XCO%2BsQ%3D%3D&pageNo=1&numOfRows=12&dataType=XML&base_date=${todayDate}&base_time=${currentBaseTime}&nx=55&ny=127`
        );

        if (!response.ok) {
          throw new Error(`HTTP 에러!!!!!!1!`);
        }

        let xmlData = await response.text();

        parseString(xmlData, (err, result) => {
          if (err) {
            throw new Error('Error 파싱 XML!!!!!!!!!!!');
          }
          console.log('결과!!:', result.response.body[0].items[0].item);
          setWeatherData(result);
        });
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, [todayDate]);

  return (
    <Wrapper>
      <UpperContainer>
        <IconImage
          width={4}
          height={4}
          src="/asset/arrow_back.svg"
          alt="Back"
          onClick={() => navigate(-1)}
        />
        <LogoContainer>
          <LogoImage src="/asset/logo.svg" alt="Logo" />
        </LogoContainer>
      </UpperContainer>

      <WeatherInfo weatherData={weatherData} />
      <Wrapper2> 
        <PriceChartModule weatherData={weatherData}></PriceChartModule>
      </Wrapper2>   
    </Wrapper>
  );
};

export default WeahterPage;