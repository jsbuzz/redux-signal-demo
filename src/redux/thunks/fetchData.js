import { thunk } from "../../redux-transitions";
import { setData, fetchDataError } from "../actions";

let counter = 0;
export const fetchData = thunk((delay = 800) => (dispatch) => {
  setTimeout(() => {
    if (++counter % 3) {
      dispatch(setData(`This is the fetched data #${counter}`));
    } else {
      dispatch(fetchDataError(`Whoopsie #${counter / 3}`));
    }
  }, delay);
}).withTransitionStates((fetchData) => ({
  pending: fetchData,
  success: setData().type,
  failure: fetchDataError().type,
}));
