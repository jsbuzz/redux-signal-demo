import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_DATA_START,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { useListeners } from "../redux-signal/hooks";

const dataSelector = (store) => store.data.data;

export const DataFetcher = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const [isLoading, setLoading] = useState(false);

  useListeners(
    FETCH_DATA_START,
    () => setLoading(true),

    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    () => setLoading(false)
  );

  return (
    <>
      {(isLoading && "loading...") || <div>{data}</div>}
      <div>&nbsp;</div>
      <button disabled={isLoading} onClick={() => dispatch(fetchData())}>
        Fetch
      </button>
    </>
  );
};
