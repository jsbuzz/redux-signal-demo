import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTransitions } from "redux-transitions";
import { UPLOAD_CHUNK, UPLOAD_SUCCESS, UPLOAD_FAILURE } from "../redux/actions";
import { uploadFile } from "../redux/thunks/uploadFile";

const uploadedFilesSelector = (store) => store.upload;

const PENDING_STATE = "pending";
const SUCCESS_STATE = "success";
const FAILURE_STATE = "failure";

const uploadStates = {
  [PENDING_STATE]: [uploadFile, UPLOAD_CHUNK],
  [SUCCESS_STATE]: UPLOAD_SUCCESS,
  [FAILURE_STATE]: UPLOAD_FAILURE,
};

const uploadReducer = (state, { error, percentage }) => ({
  isUploading: state === PENDING_STATE,
  uploadError: state === FAILURE_STATE && error,
  uploadPercentage: percentage || 0,
});

export const FileUpload = () => {
  const dispatch = useDispatch();

  const { uploadedFiles, totalSize } = useSelector(uploadedFilesSelector);
  const { isUploading, uploadPercentage, uploadError } = useTransitions(
    uploadStates,
    uploadReducer
  );

  return (
    <div className="data-fetcher">
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
      <div className="uploaded-files">
        {uploadedFiles.map(({ fileName, fileSize }) => (
          <div key={fileName}>
            {fileName} [{fileSize.toFixed(2)} Mb]
          </div>
        ))}
      </div>
      Total Size: {totalSize.toFixed(2)} Mb
    </div>
  );
};
