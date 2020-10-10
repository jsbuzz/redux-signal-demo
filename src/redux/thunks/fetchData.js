import { setData, fetchDataError } from "../actions";

let counter = 0;
export const fetchData = () => (dispatch) => {
  setTimeout(() => {
    if (++counter % 3) {
      dispatch(setData(`This is the fetched data #${counter}`));
    } else {
      dispatch(fetchDataError(`Whoopsie #${counter}`));
    }
  }, 800);
};
