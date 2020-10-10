import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../redux/actions";
import { fetchData } from "../redux/thunks/fetchData";
import { usePendingState } from "../redux-signal/hooks";

const dataSelector = (store) => store.data.data;

export const SecondDataFetcher = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const isFetching = usePendingState({
    pending: fetchData,
    done: [FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
  });

  return (
    <div className="data-fetcher">
      <pre>
        {`
        const isFetching = usePendingState({
          pending: fetchData,
          done: [FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
        });
      `}
      </pre>
      <button disabled={isFetching} onClick={() => dispatch(fetchData())}>
        Fetch
      </button>
      &nbsp; {(isFetching && "fetching...") || data}
    </div>
  );
};
