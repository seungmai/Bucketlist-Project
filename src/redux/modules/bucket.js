// bucket.js

import { firestore } from "../../firebase";

const LOAD = "bucket/LOAD";
const CREATE = "bucket/CREATE";
const DELETE = "bucket/DELETE";
const UPDATE = "bucket/UPDATE";

const LOADED = "bucket/LOADED";

const initialState = {
  list: [
  ],is_loaded: false,
};

const bucket_db = firestore.collection("bucket2");

export const loadBucket = (bucket) => {
  return { type: LOAD, bucket };
};

export const createBucket = (bucket) => {
  return { type: CREATE, bucket };
};

export const deleteBucket = (bucket) => {
  return { type: DELETE, bucket };
};

export const updateBucket = (bucket) => {
  return { type: UPDATE, bucket };
};

export const isLoaded = (loaded) => {
  return { type: LOADED, loaded }
};

export const loadBucketFB = () => {
  return function (dispatch) {
    bucket_db.get().then((docs) => {
      let bucket_data = [];
      docs.forEach((doc) => {

        if (doc.exists) {
          bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
        }
      });

      console.log(bucket_data);
      dispatch(loadBucket(bucket_data));
    });
  };
};

export const addBucketFB = (bucket) => {
  return function (dispatch) {

    let bucket_data = { text: bucket, completed: false };

    dispatch(isLoaded(false));

    bucket_db
      .add(bucket_data)
      .then(docRef => {
        bucket_data = {...bucket_data, id: docRef.id} ;

        console.log(bucket_data);

        dispatch(createBucket(bucket_data));
        dispatch(isLoaded(true));
      })
      .catch((err) => {
        console.log(err);
        window.alert("오류가 났네요! 나중에 다시 시도해주세요!");
        dispatch(isLoaded(true));
      });
  };
};

export const updateBucketFB = (bucket) => {
  return function (dispatch, getState) {
    const _bucket_data = getState().bucket.list[bucket];

    if (!_bucket_data.id) {
      return;
    }

    let bucket_data = { ..._bucket_data, completed: true };

    bucket_db
      .doc(bucket_data.id)
      .update(bucket_data)
      .then((res) => {
        dispatch(updateBucket(bucket));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

export const deleteBucketFB = (bucket) => {
  return function (dispatch, getState) {
    const _bucket_data = getState().bucket.list[bucket];
    if (!_bucket_data.id) {
      return;
    }
    bucket_db
      .doc(_bucket_data.id)
      .delete()
      .then((res) => {
        dispatch(deleteBucket(bucket));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "bucket/LOAD": {
      if (action.bucket.length > 0) {
        return { list: action.bucket, is_loaded: true };
      }
      
      return state;
    }

    case "bucket/CREATE": {
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list };
    }

    case "bucket/DELETE": {
      const bucket_list = state.list.filter((l, idx) => {
        if (idx !== action.bucket) {
          return l;
        }
      });
      return { ...state, list: bucket_list };
    }

    case "bucket/UPDATE": {
      const bucket_list = state.list.map((l, idx) => {
        if (idx === action.bucket) {
          return { ...l, completed: true };
        }

        return l;
      });

      return { ...state, list: bucket_list };
    }

    case "bucket/LOADED": {

      return {...state, is_loaded: action.loaded};
    }

    default:
      return state;
  }
}