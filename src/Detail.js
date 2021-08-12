// Detail.js

import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteBucket,
  updateBucket,
  deleteBucketFB,
  updateBucketFB,
} from "./redux/modules/bucket";

const Detail = (props) => {
  const dispatch = useDispatch();
    
  const bucket_list = useSelector((state) => state.bucket.list);

  let bucket_index = parseInt(props.match.params.index);

  console.log(props);
  return (
    <div>
      <h1>{bucket_list[bucket_index].text}</h1>
      <ButtonGroup>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(deleteBucketFB(bucket_index));
            props.history.goBack();
          }}
        >
          삭제하기
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            dispatch(updateBucketFB(bucket_index));
            props.history.goBack();
          }}
        >
          완료하기
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Detail;