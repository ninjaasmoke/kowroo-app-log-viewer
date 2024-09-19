import React from 'react';
import { useDropzone } from 'react-dropzone';

const LogUploader = ({ onFileUpload }) => {
  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      onFileUpload(reader.result);
    };
    reader.readAsText(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag and drop a log file here, or click to select one</p>
    </div>
  );
};

export default LogUploader;
