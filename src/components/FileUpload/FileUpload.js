import React from "react";
import { useSelector } from "react-redux";
import { UploadSection } from "./UploadSection";

const uploadedFilesSelector = (store) => store.upload;

// this component only relies on Application state fomr the store
// @applicationState
export const FileUpload = () => {
  const { uploadedFiles, totalSize } = useSelector(uploadedFilesSelector);

  return (
    <div className="data-fetcher">
      <UploadSection />
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
