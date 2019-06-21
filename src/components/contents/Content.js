import React, { Component } from "react";
import styled from "styled-components";
import MOCK_DATA from "../../MOCK_DATE.json";
import { Button, Calendar, Icon } from "antd-mobile";
import moment from "moment";

import "./Content.css";

import enUSforCalendar from "antd-mobile/lib/calendar/locale/en_US";

import Menu from "../menu/Menu";
import HorizontalCalendar from "./HorizontalCalendar";
import VerticalCalendar from "./VerticalCalendar";
import InputModal from "./InputModal";

const calendarData = MOCK_DATA;
const now = new Date();
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

  display: flex;
  justify-content: space-between;
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
  height: 50px;
  width: 50px;
  border-radius: 25px;
  /* background-color: #ff0000; */
  /* color: #ffffff; */
  /* font-weight: 900; */
  /* font-size: 42px; */
  /* text-align: center; */
  position: fixed;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
`;

export default class Content extends Component {
  originbodyScrollY = document.getElementsByTagName("body")[0].style.overflowY;

  state = {
    preScrollHeight: 0,
    headerVisible: true,
    modal1: false,
    modal2: false,
    waypointDate: 1,
    calendarShow: false
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

    if (a === null) a = "h1";
    const id = "h" + a.toString();
    document.getElementById(id).scrollIntoView();
  };

  horizontalHandleClick = a => {
    this.setState({ waypointDate: a });
  };

  openCalendar = () => {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    this.setState({
      calendarShow: true
    });
  };

  onConfirm = (startTime, endTime) => {
    document.getElementsByTagName(
      "body"
    )[0].style.overflowY = this.originbodyScrollY;

    const day = moment(startTime.toString(), "ddd MMM DD YYYY HH:mm:ss");
    // console.log(day.format("D"));

    document.getElementById("v" + day.format("D")).scrollIntoView();
    document.getElementById("h" + day.format("D")).scrollIntoView();

    this.setState({
      calendarShow: false,
      startTime,
      endTime,
      waypointDate: parseInt(day.format("D"))
    });
  };

  onCancel = () => {
    document.getElementsByTagName(
      "body"
    )[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      calendarShow: false,
      startTime: undefined,
      endTime: undefined
    });
  };

  preMonth = () => {};

  nextMonth = () => {};

  render() {
    return (
      <div>
        <HeaderWrapper>
          <div className={this.state.headerVisible ? "" : "novisible"}>
            <Menu />
          </div>
          <RenderMonth>
            <Icon type="left" onClick={() => this.preMonth()} />
            &nbsp;
            <span onClick={() => this.openCalendar()}>6 월</span>&nbsp;
            <Icon type="right" onClick={() => this.nextMonth()} />
          </RenderMonth>
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
          <PlusButton onClick={this.showModal("modal2")}>
            <Button
              type="primary"
              inline
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "25px",
                marginRight: "4px"
              }}
            >
              +
            </Button>
          </PlusButton>
        </ContnetWrapper>
        <InputModal visible={this.state.modal2} onClose={this.onClose} />

        <Calendar
          type="one"
          locale={enUSforCalendar}
          visible={this.state.calendarShow}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 31536000000)}
        />
      </div>
    );
  }
}
