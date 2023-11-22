import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const UpperContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const ImageContainer = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => props.width}%;
  height: 100%;
  padding: 24px 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BarContainer = styled.div`
  background: #F6F6F6;
  border-radius: 16px;
  padding: 24px 16px;
`;

const UpperContainer2 = styled.div`
  padding: 8px 0px;
  justify-content: space-between;
  flex-direction: column;
  
`;

const HorizontalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

//Max값으로 각각 나눠서 길이 정할 예정 
const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  max-width: 98%;
  min-width: 20%;
  margin-bottom: 8px;
  color: ${(props) => props.textcolor};
  font-weight: 400;
  font-size: 15px;
  border-radius: 8px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: ${(props) => props.barColor};
`;

const BarText = styled.span`
  margin-right: 8px;
`;

const IconImage = styled.img`
  width: ${(props) => props.width}%;
  height:  ${(props) => props.height}%;
  margin-left: auto;
  padding:8px;
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
  margin-left: 8px;
  color: #6D23F9;
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size}px;

`;


const PriceChartModule = (props) => {
  const { avg, max, value, min, wineData} = props;
  const maxValue = Math.max(avg, max, value, min);

  return (
    <Wrapper>
        <HorizontalWrapper>
         <UpperContainer2>
              <GrayText>Real Price / Estimated Price</GrayText>
              <FlexContainer>
                <PurpleText weight={700} size={24}>{wineData.data.item.prices[0].value}$</PurpleText>
                <PurpleText weight={600} size={16}>/{wineData.data.item.prices[0].value}$</PurpleText>
              </FlexContainer>
            </UpperContainer2>
            
            <IconImage width={32} height={1} src="/asset/Variant4.svg" alt="image" />  
            </HorizontalWrapper>
      <UpperContainer>
        <ImageContainer width={30} src="/asset/Chip_Button.svg"/>
        <ImageContainer width={10} src="/asset/all.svg"/>
      </UpperContainer>
      <BarContainer>  
      <Bar barColor="#EBECFF" textcolor="#7A757F" fillPercentage={(avg / maxValue) * 100}>
        <BarText>Avg {avg}$</BarText>
      </Bar>
      <Bar barColor="#C0BBFF" textcolor="#7A757F" fillPercentage={(max / maxValue) * 100}>
        <BarText>Max {max}$</BarText>
      </Bar>
      <Bar barColor="#7368F8" textcolor="#ffffff" fillPercentage={(value / maxValue) * 100}>
        <BarText>Real {value}$</BarText>
      </Bar>
      <Bar barColor="#C0BBFF" textcolor="#7A757F" fillPercentage={(min / maxValue) * 100}>
        <BarText>Min {min}$</BarText>
      </Bar>
      <IconImage width={100} height={10} src="/asset/Price-Chart-Module2.svg" alt="image"/>
      </BarContainer>
    </Wrapper>
  );
};

export default PriceChartModule;
 
 
 
 
