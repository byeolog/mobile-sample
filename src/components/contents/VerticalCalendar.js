import React from "react";
import VcalendarCard from "./VcalendarCard";

export default function VerticalCalendar(props) {
  const day = () => {
    const dayComponent = props.calendarData.map(item => {
      return <VcalendarCard item={item} />;
    });
    return dayComponent;
  };

  return <div>{day()}</div>;
}
