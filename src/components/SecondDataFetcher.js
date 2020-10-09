import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { usePendingState } from "../redux-signal/hooks";

const dataSelector = (store) => store.data.data;

export const SecondDataFetcher = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const isFetching = usePendingState({
    pending: FETCH_DATA_START,
    done: [FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
  });

  return (
    <>
      {(isFetching && "loading...") || <div>{data}</div>}
      <div>&nbsp;</div>
      <button disabled={isFetching} onClick={() => dispatch(fetchData())}>
        Fetch
      </button>
    </>
  );
};
