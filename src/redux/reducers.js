import { combineReducers } from "redux";
import { FETCH_DATA_SUCCESS, UPLOAD_SUCCESS } from "./actions";

const dataReducerState = {
  data: null,
};
const dataReducer = (state = dataReducerState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    default:
      console.log("dataReducer");
      return state;
  }
};

const uploadReducerState = {
  uploadedFiles: [],
  totalSize: 0,
};
const uploadReducer = (state = uploadReducerState, action) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        totalSize: state.totalSize + action.fileSize,
        uploadedFiles: [
          ...state.uploadedFiles,
          {
            fileName: action.fileName,
            fileSize: action.fileSize,
          },
        ],
      };

    default:
      console.log("uploadReducer");
      return state;
  }
};

export default combineReducers({
  data: dataReducer,
  upload: uploadReducer,
});
