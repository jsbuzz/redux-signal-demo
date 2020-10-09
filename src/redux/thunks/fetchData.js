import { fetchDataStart, setData } from "../actions";

export const fetchData = () => (dispatch) => {
  dispatch(fetchDataStart());

  setTimeout(() => {
    dispatch(setData("This is the fetched data"));
  }, 1500);
};
