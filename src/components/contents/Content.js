import React, { Component } from "react";
import styled from "styled-components";
import MOCK_DATA from "../../MOCK_DATE.json";
import { Modal, List, Button, DatePicker, TextareaItem } from "antd-mobile";

import "./Content.css";

import enUs from "antd-mobile/lib/date-picker/locale/en_US";

import Menu from "../menu/Menu";
import HorizontalCalendar from "./HorizontalCalendar";
import VerticalCalendar from "./VerticalCalendar";

const calendarData = MOCK_DATA;

let headerVisible = true;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  display: ${headerVisible ? "display" : "none"};
  z-index: 999;
`;

const ContnetWrapper = styled.div`
  padding-top: 125px;
`;

const RenderMonth = styled.div`
  height: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  font-family: "맑은 고딕";
  background-color: #ffffff;
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

const PlusButton = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #ff0000;
  color: #ffffff;
  font-weight: 900;
  font-size: 42px;
  text-align: center;
  position: fixed;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
`;

export default class Content extends Component {
  state = {
    preScrollHeight: 0,
    headerVisible: true,
    modal1: false,
    modal2: false,
    waypointDate: 1
  };

  showModal = key => e => {
    e.preventDefault();
    this.setState({
      [key]: true
    });
  };
  onClose = key => () => {
    this.setState({
      [key]: false
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    // window.addEventListener("scroll", function() {});
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = event => {
    // console.log("the scroll things", event);
    // console.log(window.scrollY - this.state.preScrollHeight);

    if (
      window.scrollY > 125 &&
      window.scrollY - this.state.preScrollHeight > 0
    ) {
      this.setState({
        headerVisible: false,
        preScrollHeight: window.scrollY
      });
    } else {
      this.setState({
        headerVisible: true,
        preScrollHeight: window.scrollY
      });
    }
  };

  _handleWaypointEnter = a => {
    this.setState({ waypointDate: a });

    if (a === null) a = "1";
    const id = a.toString();
    document.getElementById(id).scrollIntoView();
  };

  horizontalHandleClick = a => {
    this.setState({ waypointDate: a });
  };

  render() {
    return (
      <div>
        <HeaderWrapper>
          <div className={this.state.headerVisible ? "" : "novisible"}>
            <Menu />
          </div>
          <RenderMonth>6 월</RenderMonth>
          <WrapperHorizontalCalendar>
            <HorizontalCalendar
              calendarData={calendarData}
              waypointDate={this.state.waypointDate}
              horizontalHandleClick={this.horizontalHandleClick}
            />
          </WrapperHorizontalCalendar>
        </HeaderWrapper>
        <ContnetWrapper>
          <WrapperVerticalCalendar>
            <VerticalCalendar
              calendarData={calendarData}
              waypointEnter={this._handleWaypointEnter}
            />
          </WrapperVerticalCalendar>
          <PlusButton onClick={this.showModal("modal2")}>+</PlusButton>
        </ContnetWrapper>
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose("modal2")}
          animationType="slide-up"
          afterClose={() => {
            // alert("afterClose");
          }}
        >
          <List
            renderHeader={() => <div>근로시간 등록</div>}
            //className="popup-list"
          >
            <DatePicker
              mode="date"
              locale={enUs}
              title="Select Date"
              extra="Optional"
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <List.Item arrow="horizontal">일자</List.Item>
            </DatePicker>
            <DatePicker
              mode="time"
              locale={enUs}
              minuteStep={2}
              use12Hours
              value={this.state.time}
              onChange={time => this.setState({ time })}
            >
              <List.Item arrow="horizontal">근무시간</List.Item>
            </DatePicker>
            <TextareaItem
              title="사유"
              placeholder="click the button below to focus"
              data-seed="logId"
              autoHeight
              rows={3}
              ref={el => (this.customFocusInst = el)}
            />
            <List.Item>
              <Button type="primary" onClick={this.onClose("modal2")}>
                닫기
              </Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    );
  }
}
