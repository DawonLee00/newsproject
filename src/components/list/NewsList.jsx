import React, { useEffect, useState } from "react";
import WineListItem from "./NewsListItem";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`;



const NewsList = (props) => {
    const {onClickItem, key, news } = props;
  
    console.log("??",news)
    console.log("확인용",news[0].title)
  
    return (
      <Wrapper>
        {news.map((news, index) => (
         <WineListItem 
            key={index} 
            news={news}
           onClick={() => {
           onClickItem(news);
        }} />
        ))}

     </Wrapper>
    );
  };
  
  export default NewsList;