import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_CHUNK, UPLOAD_SUCCESS, UPLOAD_FAILURE } from "../redux/actions";
import { uploadFile } from "../redux/thunks/uploadFile";
import { useTransitions } from "../redux-signal";

const uploadedFilesSelector = (store) => store.upload;

const uploadStates = {
  pending: [uploadFile, UPLOAD_CHUNK],
  success: UPLOAD_SUCCESS,
  failure: UPLOAD_FAILURE,
};

const uploadReducer = (state, { error, percentage }) => ({
  isUploading: state === "pending",
  uploadError: state === "failure" && error,
  uploadPercentage: percentage || 0,
});

const stopPropagation = [UPLOAD_CHUNK, UPLOAD_FAILURE];

export const FileUpload = () => {
  const dispatch = useDispatch();

  const { uploadedFiles, totalSize } = useSelector(uploadedFilesSelector);
  const { isUploading, uploadPercentage, uploadError } = useTransitions(
    uploadStates,
    uploadReducer,
    stopPropagation
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
