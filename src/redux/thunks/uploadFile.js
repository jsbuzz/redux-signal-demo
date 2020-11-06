import { thunk } from "../../redux-transitions";
import { addUploadedFile, uploadError, uploadChunk } from "../actions";

let counter = 1;
export const uploadFile = thunk(() => (dispatch) => {
  const step = 100 + getRandomInt(300);

  setTimeout(() => dispatch(uploadChunk(15)), step);
  setTimeout(() => dispatch(uploadChunk(35)), 2 * step);
  setTimeout(() => dispatch(uploadChunk(65)), 3 * step);
  setTimeout(() => dispatch(uploadChunk(77)), 4 * step);
  setTimeout(() => dispatch(uploadChunk(85)), 5 * step);
  setTimeout(
    () =>
      dispatch(
        step % 3
          ? addUploadedFile({
              fileName: `${counter++}_somethink.zip`,
              fileSize: (7 * step) / 100,
            })
          : uploadError(`Whoopsie #${counter}`)
      ),
    6.5 * step
  );
}).withTransitionStates((uploadFile) => ({
  pending: [uploadFile, uploadChunk().type],
  success: addUploadedFile({}).type,
  failure: uploadError().type,
}));

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
