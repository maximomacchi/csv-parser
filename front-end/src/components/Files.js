import { useState, useEffect } from 'react';
import '../App.css';

function Files({ files, updateCurrFile, api, refetch }) {
  // Dynamic HTML used to generate list of files
  const [listHTML, setListHTML] = useState([]);

  const deleteFile = (file) => {
    fetch(`${api}file/delete/${file}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => refetch());
  };

  // Update HTML of list every time list of files is updated
  useEffect(() => {
    if (files.length) {
      let newListHTML = [];
      files.forEach((file) => {
        newListHTML.push(
          <div className="files-list-item">
            <li onClick={() => updateCurrFile(file)}>{file}</li>
            <li onClick={() => deleteFile(file)}>Delete</li>
          </div>
        );
      });
      setListHTML(newListHTML);
    }
  }, [files, updateCurrFile]);

  if (files.length) {
    return <ul className="files-list">{listHTML}</ul>;
  } else {
    return <h3>No files currently uploaded</h3>;
  }
}

export default Files;
