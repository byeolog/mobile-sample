package Manager : npm<br>

[Create React App](https://github.com/facebook/create-react-app) 기반

## Mobile Web

모바일 웹 화면을 위해 Ant-Design-Mobile 활용<br>
[`antd-mobile`](https://www.npmjs.com/package/antd-mobile)

## 세로형 달력

모바일 환경에 적합한 달력 스타일을 찾던 중 아래의 라이브러리 발견<br>
[`react-native-calendars`](https://github.com/wix/react-native-calendars)의 Agenda 스타일에 꽂혔으나 react native라는 함정에 걸림<br>
마땅한 라이브러리를 찾지 못해 비슷하게 만들어보기로 함<br>

### react-scroll

[`react-scroll`](https://www.npmjs.com/package/react-scroll)<br>
지정한 위치로 스크롤 이동시키기

### react-waypoint

[`react-waypoint`](https://www.npmjs.com/package/react-waypoint)<br>
스크롤이 waypoint가 위치한 지점을 지나갈 때 action 발생

## Styled Components

스타일 처리기로 [`Styled-Components`](https://www.styled-components.com/)를 활용해봄

## etc.

### moment

[`moment`](https://www.npmjs.com/package/moment)<br>
date format을 위해 momentjs 사용

### rc-form

[`rc-form`](https://www.npmjs.com/package/rc-form)<br>
ant design의 InputItem Component를 사용하기 위해 추가

## 기억할 것

```javascript
componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
}
componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
}
handleScroll = event => {
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
```

```javascript
_handleWaypointEnter = a => {
  this.setState({ waypointDate: a });

  if (a === null) a = "1";
  const id = a.toString();
  document.getElementById(id).scrollIntoView();
};
```
