import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { useListeners } from "../redux-signal/hooks";

const dataSelector = (store) => store.data.data;

export const DataFetcher = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const [isFetching, setLoading] = useState(false);

  useListeners(
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
        const [isLoading, setLoading] = useState(false);

        useListeners(
          fetchData,
          () => setLoading(true),

          FETCH_DATA_SUCCESS,
          FETCH_DATA_FAILURE,
          () => setLoading(false)
        );
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(fetchData())}>
        Fetch
      </button>
      &nbsp; {(isFetching && "fetching...") || data}
    </div>
  );
};
