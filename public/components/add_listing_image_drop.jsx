import React from 'react';
import Dropzone from 'react-dropzone';

const ImageDrop = (props) => {
  const onDrop = (acceptedFiles, rejectedFiles) => {
    props.setImages(acceptedFiles);
  };

  return (
    <div>
      <Dropzone onDrop={onDrop}>
        <div className='imageDrop'>Drop images here, or click to select files to upload.</div>
      </Dropzone>
      <div>
        images will go here
      
      </div>
    </div>
  );
};

export default ImageDrop;

