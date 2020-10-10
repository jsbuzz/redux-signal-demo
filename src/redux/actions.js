export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataStart = () => ({
  type: FETCH_DATA_START,
});

export const setData = (data) => ({
  type: FETCH_DATA_SUCCESS,
  data,
});

export const fetchDataError = (error) => ({
  type: FETCH_DATA_FAILURE,
  error,
});
