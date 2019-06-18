import React from "react";
import styled from "styled-components";

const DaySpan = styled.span`
  padding: 12px;
  display: inline;
  font-weight: 600;
  color: ${props => (props.weekend ? "#e50505" : "#000000")};
`;

export default function HorizontalCalendar(props) {
  const day = () => {
    const dayComponent = props.calendarData.map(item => {
      return <DaySpan weekend={item.weekend}>{item.date}</DaySpan>;
    });
    console.log(dayComponent);
    return dayComponent;
  };

  return <div>{day()}</div>;
}
