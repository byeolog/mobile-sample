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

const NoSchecule = styled.span`
  color: #aaaaaa;
`;

const InSchedule = styled.div``;
const InScheduleTime = styled.span`
  color: #ff0000;
`;
const InScheduleCmt = styled.span`
  color: #999999;
`;

export default function VcalendarCar(props) {
  const renderTime = () => {
    let rtext;
    if (props.item.time) {
      rtext = (
        <InSchedule>
          연장시간 : <InScheduleTime>{props.item.time}</InScheduleTime>
          <br />
          사유 : <InScheduleCmt>{props.item.cmt}</InScheduleCmt>
        </InSchedule>
      );
    } else {
      rtext = <NoSchecule>일정 없음</NoSchecule>;
    }
    return rtext;
  };

  const deleteConfirm = time => {
    console.log(time);
    if (!time) return;
    alert(
      "초과근무 삭제",
      `${props.item.month}월 ${props.item.date}일 초과근무를 삭제하시겠습니까?`,
      [
        { text: "취소", onPress: () => console.log("cancel") },
        {
          text: "삭제",
          onPress: () => props.removeSchedule(props.item.date)
        }
      ]
    );
  };

  return (
    <Element name={props.item.date} className="element">
      <SwipeAction
        style={{ backgroundColor: "gray" }}
        autoClose
        right={[
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("cancel"),
          //   style: { backgroundColor: "#ddd", color: "white" }
          // },
          {
            text: "삭제",
            onPress: () => {
              deleteConfirm(props.item.time);
            },
            style: { backgroundColor: "#F4333C", color: "white" }
          }
        ]}
        left={[
          {
            text: "수정",
            onPress: () => console.log("modify"),
            style: { backgroundColor: "#108ee9", color: "white" }
          }
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("cancel"),
          //     style: { backgroundColor: "#ddd", color: "white" }
          //   }
        ]}
        //onOpen={() => console.log("global open")}
        //onClose={() => console.log("global close")}
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
            <RightDiv>{renderTime()}</RightDiv>
          </CardWrapper>
        </Waypoint>
      </SwipeAction>
    </Element>
  );
}
