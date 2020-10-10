import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { useActionListeners } from "../redux-signal";

const dataSelector = (store) => store.data.data;

export const DataFetcher = () => {
  const dispatch = useDispatch();
  const fetchMessage = "click to fetch data";
  const data = useSelector(dataSelector) || fetchMessage;
  const [isFetching, setLoading] = useState(false);

  useActionListeners(
    fetchData,
    () => setLoading(true),

    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    () => setLoading(false)
  );

  return (
    <div className="data-fetcher">
      <pre>
        {`
        const data = useSelector(dataSelector) || fetchMessage;
        const [isLoading, setLoading] = useState(false);

        useActionListeners(
          fetchData,
          () => setLoading(true),

          FETCH_DATA_SUCCESS,
          FETCH_DATA_FAILURE,
          () => setLoading(false)
        );
        {(isFetching && "fetching...") || data}
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(fetchData())}>
        Fetch
      </button>
      {(isFetching && "fetching...") || data}
    </div>
  );
};
