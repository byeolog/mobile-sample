import React from "react";
import VcalendarCard from "./VcalendarCard";

export default function VerticalCalendar(props) {
  const day = () => {
    const dayComponent = props.calendarData.map(item => {
      return <VcalendarCard item={item} waypointEnter={props.waypointEnter} />;
    });
    return dayComponent;
  };

  return <div>{day()}</div>;
}
