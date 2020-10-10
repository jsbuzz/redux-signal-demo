import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { withPendingState } from "../redux-signal/hooks";

const dataSelector = (store) => store.data.data;

export const ThirdDataFetcher = () => {
  const dispatch = useDispatch();
  const fetchMessage = "click to fetch data";
  const data = useSelector(dataSelector) || fetchMessage;
  const [isFetching, doFetchData] = withPendingState(fetchData)(
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE
  );

  return (
    <div className="data-fetcher">
      <pre>
        {`
        const data = useSelector(dataSelector) || fetchMessage;
        const [isFetching, doFetchData] = withPendingState(fetchData)(
          FETCH_DATA_SUCCESS,
          FETCH_DATA_FAILURE
        );
        {(isFetching && "fetching...") || data}
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(doFetchData())}>
        Fetch
      </button>
      {(isFetching && "fetching...") || data}
    </div>
  );
};
