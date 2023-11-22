import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30%;
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
  width: 15%;
  height: 100%;
  padding: 8px 32px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  margin-right: auto;
  color: #000000;
  font-weight: 700;
  font-size: 24px;
  position: relative;
  bottom: 4px;
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
`;

const RoundedPurpleContainer = styled.div`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  border-radius: 10px;
  padding: 3px;
  border: 2px solid #6D23F9
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

const WineDetailModule = (props) => {
   const {imageURL, wineDetail}=props;
    return (
      <Wrapper2>
      <Wrapper>
        <ImageContainer src={`https://image.veenoverse.com${imageURL}`} />
       
        <InfoContainer>
          <NoteContainerWrapper>
               <NoteImage src="/asset/write_tasting_note.svg"/>
                  <NoteContainer>
                    <GrayText>{wineDetail.data.item.country.name} &gt; {wineDetail.data.item.country.name} &gt; {wineDetail.data.item.country.name}</GrayText>
                    <BoldText>2018 Opus One</BoldText>
                  </NoteContainer>
           </NoteContainerWrapper>

        <UnderContainer>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <NoteContainer/>
          <RoundedPurpleContainer>
            <PurpleText>{wineDetail.data.item.type.name}</PurpleText>  
          </RoundedPurpleContainer>
          <SpaceContainer/>
          <RoundedPurpleContainer>
            <PurpleText>{wineDetail.data.item.alcohol}°</PurpleText>
          </RoundedPurpleContainer>
            <SpaceContainer/>
          <RoundedPurpleContainer>
            <PurpleText>2018</PurpleText>
          </RoundedPurpleContainer>
            <SpaceContainer/>
        </UnderContainer>

         <NoteContainer> 
          <SpaceContainer2/>
            <UnderContainer>
              <IconImage src="/asset/list.svg" alt='list'/>
              <IconImage src="/asset/rate.svg" alt='rate'/>
              <IconImage src="/asset/share.svg" alt='share'/>
            </UnderContainer>
            
          </NoteContainer>
       
        </InfoContainer>
       
      </Wrapper>
       <InfoContainer2>
       <IconImage src="/asset/explain.svg" alt='ex'/>
       <IconImage src="/asset/explain.svg" alt='ex'/>
       </InfoContainer2>
       </Wrapper2>
    );
  }
export default WineDetailModule;