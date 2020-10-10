import { combineReducers } from "redux";
import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./actions";

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
      return { ...state };
  }
};

export default combineReducers({
  data: dataReducer,
});
