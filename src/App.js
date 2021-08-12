// App.js

import React from "react";

import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

import BucketList from "./BucketList";
import styled from "styled-components";
import Detail from "./Detail";
import NotFound from "./NotFound";

import { connect } from "react-redux";
import {
  loadBucket,
  createBucket,
  loadBucketFB,
  addBucketFB,
} from "./redux/modules/bucket";
import Progress from "./Progress";

import Spinner from "./Spinner";
import { firestore } from "./firebase";

const mapStateTopProps = (state) => ({
  bucket_list: state.bucket.list,
  is_loaded: state.bucket.is_loaded,
});

const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadBucketFB());
  },
  create: (new_item) => {
    console.log(new_item);
    dispatch(addBucketFB(new_item));
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.text = React.createRef();
  }

  componentDidMount() {
    this.props.load();
  }

  addBucketList = () => {
    const new_item = this.text.current.value;
    this.props.create(new_item);
  };

  render() {
    console.log(this.props.is_loaded);
    return (
      <div className="App">
        <Container>
          <Title>My BucketList</Title>
          {!this.props.is_loaded ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Progress />
              <Line />
              <Switch>
                <Route path="/" exact component={BucketList} />
                <Route path="/detail/:index" component={Detail} />
                <Route component={NotFound} />
              </Switch>
            </React.Fragment>
          )}
        </Container>
        <Input>
          <input type="text" ref={this.text} />
          <button onClick={this.addBucketList}>추가하기</button>
        </Input>

        <button
          onClick={() => {
            window.scrollTo({ top: 10, left: 0, behavior: "smooth" });
          }}
        >
          위로가기
        </button>
      </div>
    );
  }
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #7ec04b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > * {
    padding: 5px;
  }

  & input {
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid #7ec04b;
    width: 70%;
    &:focus {
      border: 1px solid #7ec04b;
    }
  }

  & button {
    width: 25%;
    color: #fff;
    border: 1px solid #7ec04b;
    background-color: #7ec04b;
    border-radius: 5px;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #7ec04b;
`;

const Title = styled.h1`
  color: #7ec04b;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #7ec04b;
`;

export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));