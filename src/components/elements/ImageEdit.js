import React, { useState } from 'react';
import uploadImageToCloudinary from '../../services/cloudinary';
import fileReader from '../../services/readFile';

const ImageEdit = () => {
  const [file, setFile] = useState();
  const [returnUrl, setReturnUrl] = useState();

  const uploadedImage = '../../assets/blank-file.png';

  return (
    <form onSubmit={event => {
      event.preventDefault();
      fileReader(file)
        .then(result => {
          return uploadImageToCloudinary(result);
        })
        .then(result => {
          console.log(result);
          // result.delete_token <-- This token allows us to delete images from the front end.
          // returnUrl = result.file;
        });
    }}>
      <input type="file" id="input" onChange={({ target }) => { setFile(target.files[0]); }} />
      <img src={uploadedImage} ></img>
      <button>Submit</button>
    </form>
  );

};

export default ImageEdit;
