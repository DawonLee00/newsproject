import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import he from 'he';

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




const NewsListItem = ({onClick, key, news}) => {

    const title = news.title;
    const replaced_title=title.replace(/(<([^>]+)>)/ig,"").replace(/&quot;/g,"").replace(/&amp;/g,);
    const desc = news.description;
    const replaced_desc=desc.replace(/(<([^>]+)>)/ig,"").replace(/&quot;/g,"").replace(/&lt;/g,"").replace(/&gt;/g,"").replace(/&amp;/g,);
    const pubDate = news.pubDate.split(' ')[0]+" "+news.pubDate.split(' ')[1]+" "+news.pubDate.split(' ')[2]+" "+news.pubDate.split(' ')[3];

    return (
    <Wrapper key={key} onClick={onClick}>
        <InfoContainer>
          <NameText>{replaced_title}</NameText>
        <TextContainer2>
          <DescText>{replaced_desc}</DescText>  
        </TextContainer2>
        <TextContainer>
            <RoundedContainer><GrayText>{pubDate}</GrayText></RoundedContainer>
        </TextContainer>
        </InfoContainer>
   
        
    </Wrapper>
    
  );
};

export default NewsListItem;