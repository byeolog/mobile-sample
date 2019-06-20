import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

const DaySpan = styled.span`
  padding: 12px;
  display: inline;
  font-weight: 600;
  color: ${props => (props.weekend ? "#e50505" : "#000000")};
  border-bottom: ${props => (props.waypointDate ? "6px solid #616161" : "")};
  /* border-radius: 20px; */
  cursor: pointer;
`;

export default function HorizontalCalendar(props) {
  const day = () => {
    const dayComponent = props.calendarData.map(item => {
      return (
        <Link
          activeClass="active"
          className={item.date}
          to={item.date}
          spy={true}
          smooth={true}
          duration={500}
        >
          <DaySpan
            weekend={item.weekend}
            onClick={() => props.horizontalHandleClick(item.date)}
            waypointDate={props.waypointDate === item.date}
            id={"h" + item.date}
          >
            {item.date}
          </DaySpan>
        </Link>
      );
    });
    return dayComponent;
  };

  return <div>{day()}</div>;
}
