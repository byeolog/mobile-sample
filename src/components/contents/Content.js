import React, { Component } from "react";
import styled from "styled-components";
import MOCK_DATA from "../../MOCK_DATE.json";

import HorizontalCalendar from "./HorizontalCalendar";
import VerticalCalendar from "./VerticalCalendar";

const calendarData = MOCK_DATA;

const RenderMonth = styled.div`
  height: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  font-family: "맑은 고딕";
`;

const WrapperHorizontalCalendar = styled.div`
  padding: 5px;
  height: 30px;
  background-color: #e5e5e5;
  width: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WrapperVerticalCalendar = styled.div`
  /* padding: 20px; */
  background-color: #ffffff;
`;

export default class Content extends Component {
  render() {
    return (
      <div>
        <RenderMonth>6 월</RenderMonth>
        <WrapperHorizontalCalendar>
          <HorizontalCalendar calendarData={calendarData} />
        </WrapperHorizontalCalendar>
        <WrapperVerticalCalendar>
          <VerticalCalendar calendarData={calendarData} />
        </WrapperVerticalCalendar>
      </div>
    );
  }
}
