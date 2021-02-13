import React from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../redux/thunks/uploadFile";
import { defaultStates } from "redux-transitions";
import { useThunkReducer } from "redux-transitions/hooks";

const { pending, success, failure } = defaultStates;
export const uploadReducer = (state = success, { error, percentage } = {}) => ({
  isUploading: state === pending,
  uploadError: state === failure && error,
  uploadPercentage: percentage || 0,
});

// this component only relies on Transition state
// @transitionState
// @dispatcher
export const UploadSection = () => {
  const dispatch = useDispatch();

  const { isUploading, uploadPercentage, uploadError } = useThunkReducer(
    uploadFile,
    uploadReducer
  );

  return (
    <>
      <button disabled={isUploading} onClick={() => dispatch(uploadFile())}>
        {isUploading ? "uploading..." : uploadError ? "retry" : "upload"}
      </button>
      {isUploading && (
        <progress id="file" max="100" value={uploadPercentage}>
          {uploadPercentage}% done
        </progress>
      )}
      {uploadError && (
        <span className="upload-error">
          Error while uploading: {uploadError}
        </span>
      )}
    </>
  );
};
