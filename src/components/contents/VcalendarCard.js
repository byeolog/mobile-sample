import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  border-bottom: 1px solid #e3e3e3;
  ::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const LeftDiv = styled.div`
  float: left;
  width: 80px;
  padding: 10px 20px;
`;

const Date = styled.div`
  color: ${props => (props.weekend ? "#e50505" : "#000000")};
  font-size: 20px;
  width: 30px;
  display: inline-block;
`;

const RightDiv = styled.div`
  float: left;
  padding: 10px 20px;
`;

export default function VcalendarCar(props) {
  return (
    <CardWrapper>
      <LeftDiv>
        <Date weekend={props.item.weekend}>{props.item.date}</Date> /{" "}
        {props.item.weekofday}
      </LeftDiv>
      <RightDiv>
        근로시간
        <br />
        근로시간
        <br />
        근로시간
        <br />
        근로시간
        <br />
      </RightDiv>
    </CardWrapper>
  );
}
