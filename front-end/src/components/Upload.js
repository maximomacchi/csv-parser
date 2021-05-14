import '../App.css';
import { useState } from 'react';

function Upload({ files, api, refetch }) {
  // Error for when duplicate files are trying to be uploaded
  const [errMsg, showErrMsg] = useState(false);

  const uploadFile = (e) => {
    e.preventDefault();
    let fileInput = e.target[0];
    let formData = new FormData();
    // Check if a duplicate file is trying to be uploaded. Show error message
    // if it is
    if (files.length && files.includes(fileInput.files[0].name)) {
      showErrMsg(true);
    } else {
      showErrMsg(false);
      formData.append('file', fileInput.files[0]);
      fetch(`${api}file/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => refetch());
    }
  };

  return (
    <div>
      <h4>Upload a file:</h4>
      {errMsg ? <h3>Unique filename must be used</h3> : ''}
      <form onSubmit={(e) => uploadFile(e)}>
        <input type="file"></input>
        <input type="submit" value="Upload"></input>
      </form>
    </div>
  );
}

export default Upload;
