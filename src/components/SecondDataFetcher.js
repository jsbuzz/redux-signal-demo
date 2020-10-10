import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { useFetchState } from "../redux-signal";

const dataSelector = (store) => store.data.data;

export const SecondDataFetcher = () => {
  const dispatch = useDispatch();
  const fetchMessage = "click to fetch data";
  const data = useSelector(dataSelector) || fetchMessage;
  const [isFetching, fetchError] = useFetchState({
    fetch: fetchData,
    success: FETCH_DATA_SUCCESS,
    failure: FETCH_DATA_FAILURE,
  });

  return (
    <div className="data-fetcher">
      <pre>
        {`
        const data = useSelector(dataSelector) || fetchMessage;
        const [isFetching, fetchError] = useFetchState({
          fetch: fetchData,
          success: FETCH_DATA_SUCCESS,
          failure: FETCH_DATA_FAILURE,
        });
        {(isFetching && "fetching...") || fetchError?.error || data}
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(fetchData())}>
        Fetch
      </button>
      {(isFetching && "fetching...") || fetchError?.error || data}
    </div>
  );
};
