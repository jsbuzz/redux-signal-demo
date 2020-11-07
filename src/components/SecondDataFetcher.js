import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThunkReducer } from "redux-transitions";
import { fetchData } from "../redux/thunks/fetchData";

const dataSelector = (store) => store.data.data;

export const SecondDataFetcher = () => {
  const dispatch = useDispatch();
  const fetchMessage = "click to fetch data";
  const data = useSelector(dataSelector) || fetchMessage;
  const [isFetching, fetchError] = useThunkReducer(fetchData);

  return (
    <div className="data-fetcher">
      <pre>
        {`
        const data = useSelector(dataSelector) || fetchMessage;
        const [isFetching, fetchError] = usePendingState({
          fetch: fetchData,
          success: FETCH_DATA_SUCCESS,
          failure: FETCH_DATA_FAILURE,
        });
        {(isFetching && "fetching...") || fetchError?.error || data}
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(fetchData(500))}>
        Fetch
      </button>
      {(isFetching && "fetching...") || fetchError?.error || data}
    </div>
  );
};
