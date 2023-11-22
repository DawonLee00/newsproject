import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 16px; 
  border-bottom: 1px solid #000000;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.div`
  padding: 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  & > * {
    margin-left: 8px; 
  }
`;

const TextContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  & > * {
    margin-left: 8px; 
  }
`;



const NameText = styled.span`
  padding: 0px 8px;
  margin-right: auto;
  color: #000000;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 16px;
`;

const DescText = styled.span`
  margin-right: auto;
  color: #000000;
  font-weight: 400;
  font-size: 15px;
`;

const GrayText = styled.span`
  margin-right: auto;
  color: #4D4D4D;
  font-weight: 400;
  font-size: 12px;
  position: relative;
  bottom: 5px;
  letter-spacing: 1px; 
  justify-content: center;
  padding:0px 8px;
`;

const RoundedContainer = styled.div`
  background: #F6F6F6;
  border-radius: 15px; 
  padding: 3px;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};

`;

const NewsListItem = ({index, onClick, key, news}) => {

    const title = news.title;
    //const pubDate = moment(props.row.pubDate).format('YYYY.MM.DD HH:mm');
    const desc = news.description;
  return (
    <Wrapper key={index} onClick={onClick}>
        <InfoContainer>
          <NameText>{title}</NameText>
        <TextContainer2>
          <DescText>{desc}</DescText>  
        </TextContainer2>
        <TextContainer>
            <RoundedContainer><GrayText>{news.pubDate}</GrayText></RoundedContainer>
            
        </TextContainer>
        </InfoContainer>
   
        
    </Wrapper>
    
  );
};

export default NewsListItem;

//  <ImageContainer src={`https://image.veenoverse.com${imagePath}`}/>
/*     <InfoContainer>

            <NameText>{wine.name}</NameText>
            <TextContainer2>
            <BoldText>{wine.price.currency === 'USD' ? '$' : ''}{wine.price.value}</BoldText>
            <GrayText>{wine.volume}ml</GrayText>
            <a href="#" dangerouslySetInnerHTML={{__html: title}}></a>
            </TextContainer2>
            <TextContainer>
              <RoundedContainer><GrayText>{wine.vintage}</GrayText></RoundedContainer>
              <RoundedContainer><GrayText>{wine.country.name}</GrayText></RoundedContainer>
            </TextContainer>
          </InfoContainer> */