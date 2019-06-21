import React, { Component } from "react";
import {
  Modal,
  List,
  Button,
  DatePicker,
  TextareaItem,
  InputItem,
  WhiteSpace
} from "antd-mobile";
import { createForm } from "rc-form";

import enUs from "antd-mobile/lib/date-picker/locale/en_US";

export class InputModal extends Component {
  state = {
    date: new Date(),
    time: null,
    cmt: null
  };

  // onSubmit = (a, b, c) => {
  //   console.log(a, b, c);
  // };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <>
        <Modal
          popup
          visible={this.props.visible}
          onClose={this.props.onClose("modal2")}
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
              title="연장근로 신청일자"
              extra="일자를 선택해주세요."
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <List.Item arrow="horizontal">일자</List.Item>
            </DatePicker>
            <InputItem
              {...getFieldProps("digit")}
              type="digit"
              placeholder="연장근로시간을 입력해주세요."
              value={this.state.time}
              onChange={time => this.setState({ time })}
            >
              연장시간
            </InputItem>
            <TextareaItem
              title="사유"
              placeholder="연장근로 사유를 작성해주세요."
              data-seed="logId"
              autoHeight
              rows={3}
              ref={el => (this.autoFocusInst = el)}
              value={this.state.cmt}
              onChange={cmt => this.setState({ cmt })}
            />

            <List.Item>
              <Button onClick={this.props.onClose("modal2")}>취소</Button>
              <WhiteSpace />
              <Button
                type="primary"
                onClick={() =>
                  this.props.onSubmit(
                    this.state.date,
                    this.state.time,
                    this.state.cmt
                  )
                }
              >
                저장
              </Button>
            </List.Item>
          </List>
        </Modal>
      </>
    );
  }
}

const InputModalWrapper = createForm()(InputModal);
export default InputModalWrapper;
