import { addUploadedFile, uploadError, uploadChunk } from "../actions";

let counter = 1;
export const uploadFile = () => (dispatch) => {
  const step = 200 + getRandomInt(400);

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
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
