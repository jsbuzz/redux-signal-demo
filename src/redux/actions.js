import { STOP_PROPAGATION } from "redux-transitions";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataStart = () => ({
  type: FETCH_DATA_START,
  [STOP_PROPAGATION]: true,
});

export const setData = (data) => ({
  type: FETCH_DATA_SUCCESS,
  data,
});

export const fetchDataError = (error) => ({
  type: FETCH_DATA_FAILURE,
  [STOP_PROPAGATION]: true,
  error,
});

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  [STOP_PROPAGATION]: true,
  token,
});

export const loginError = (error) => ({
  type: LOGIN_FAILURE,
  [STOP_PROPAGATION]: true,
  error,
});

export const UPLOAD_CHUNK = "UPLOAD_CHUNK";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";

export const addUploadedFile = ({ fileName, fileSize }) => ({
  type: UPLOAD_SUCCESS,
  fileName,
  fileSize,
});

export const uploadError = (error) => ({
  type: UPLOAD_FAILURE,
  [STOP_PROPAGATION]: true,
  error,
});

export const uploadChunk = (percentage) => ({
  type: UPLOAD_CHUNK,
  [STOP_PROPAGATION]: true,
  percentage,
});
