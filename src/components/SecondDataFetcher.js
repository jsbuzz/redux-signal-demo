import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThunkReducer } from "redux-transitions/hooks";
import { fetchData } from "../redux/thunks/fetchData";
import { Code } from "./Code";

const dataSelector = (store) => store.data.data;

export const SecondDataFetcher = () => {
  const dispatch = useDispatch();
  const fetchMessage = "click to fetch data";
  const data = useSelector(dataSelector) || fetchMessage;
  const [isFetching, fetchError] = useThunkReducer(fetchData);

  return (
    <div className="data-fetcher">
      <Code>
        {`
        const dispatch = useDispatch();
        const fetchMessage = "click to fetch data";
        const data = useSelector(dataSelector) || fetchMessage;
        const [isFetching, fetchError] = useThunkReducer(fetchData);

        return (
          <>
            <button disabled={isFetching} onClick={() => dispatch(fetchData(500))}>
              Fetch
            </button>
            {(isFetching && "fetching...") || fetchError?.error || data}
          </>
        )
      `}
      </Code>
      <button disabled={isFetching} onClick={() => dispatch(fetchData(500))}>
        Fetch
      </button>
      {(isFetching && "fetching...") || fetchError?.error || data}
    </div>
  );
};
