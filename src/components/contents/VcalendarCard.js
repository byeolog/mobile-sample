import React from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";
import { Element } from "react-scroll";
import { SwipeAction, Modal } from "antd-mobile";

const alert = Modal.alert;

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
    <Element name={props.item.date} className="element">
      <SwipeAction
        style={{ backgroundColor: "gray" }}
        autoClose
        right={[
          {
            text: "Cancel",
            onPress: () => console.log("cancel"),
            style: { backgroundColor: "#ddd", color: "white" }
          },
          {
            text: "Delete",
            onPress: () => {
              alert(
                "초과근무 삭제",
                `${props.item.month}월 ${
                  props.item.date
                }일 초과근무를 삭제하시겠습니까?`,
                [
                  { text: "Cancel", onPress: () => console.log("cancel") },
                  { text: "Ok", onPress: () => console.log("ok") }
                ]
              );
            },
            style: { backgroundColor: "#F4333C", color: "white" }
          }
        ]}
        left={[
          {
            text: "Reply",
            onPress: () => console.log("reply"),
            style: { backgroundColor: "#108ee9", color: "white" }
          },
          {
            text: "Cancel",
            onPress: () => console.log("cancel"),
            style: { backgroundColor: "#ddd", color: "white" }
          }
        ]}
        onOpen={() => console.log("global open")}
        onClose={() => console.log("global close")}
      >
        <Waypoint
          onEnter={() => props.waypointEnter(props.item.date)}
          topOffset="80px"
          bottomOffset="80%"
        >
          <CardWrapper id={"v" + props.item.date}>
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
        </Waypoint>
      </SwipeAction>
    </Element>
  );
}
