import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTransitions } from "redux-transitions";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";

const dataSelector = (store) => store.data.data;

const fetchStates = {
  pending: fetchData,
  success: FETCH_DATA_SUCCESS,
  failure: FETCH_DATA_FAILURE,
};

const fetchReducer = (state = FETCH_DATA_SUCCESS, { error } = {}) => ({
  isFetching: state === "pending",
  fetchError: state === "failure" && error,
});

export const DataFetcherWithTransitions = () => {
  const dispatch = useDispatch();
  const fetchMessage = "click to fetch data";
  const data = useSelector(dataSelector) || fetchMessage;
  const { isFetching, fetchError } = useTransitions(fetchStates, fetchReducer);

  return (
    <div className="data-fetcher">
      <pre>
        {`
        const fetchStates = {
          pending: fetchData,
          success: FETCH_DATA_SUCCESS,
          failure: FETCH_DATA_FAILURE,
        };

        const fetchReducer = (state, { error }) => ({
          isFetching: state === "pending",
          fetchError: state === "failure" && error,
        });

        const data = useSelector(dataSelector) || fetchMessage;
        const { isFetching, fetchError } = useTransitions(fetchStates, fetchReducer);
        {(isFetching && "fetching...") || fetchError || data}
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(fetchData(500))}>
        Fetch
      </button>
      {(isFetching && "fetching...") || fetchError || data}
    </div>
  );
};
