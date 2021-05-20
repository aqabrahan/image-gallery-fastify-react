import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Uploader = (props) => {
  const { onUploadHandle } = props;
  const form = new FormData();
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      form.append('upload', file);
      onUploadHandle(form)
      .then((r) => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
        //TODO: show any error message
      });
    });
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default Uploader;