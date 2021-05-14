import './App.css';
import { useEffect, useState } from 'react';
import Files from './components/Files';
import Results from './components/Results';
import Upload from './components/Upload';
import Loader from './components/Loader';

const API_URL = 'http://localhost:3001/';

function App() {
  // Currently selected file
  const [currFile, setCurrFile] = useState(null);
  // Result data from currently selected file
  const [resultData, setResultData] = useState({});
  // List of all files
  const [files, setFiles] = useState([]);
  // Status on whether files are currently being fetched
  const [loadingFiles, setLoadingFiles] = useState(true);

  const fetchFiles = () => {
    setLoadingFiles(true);
    fetch(`${API_URL}files/all`)
      .then((response) => response.json())
      .then((files) => {
        setFiles(files);
        setLoadingFiles(false);
      });
  };

  // Parse the current file whenever a new one is chosen
  useEffect(() => {
    if (currFile) {
      fetch(`${API_URL}file/parse/${currFile}`)
        .then((response) => response.json())
        .then((results) => setResultData(results));
    }
  }, [currFile]);

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loadingFiles) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Maximo Macchi - CSV Parser</h2>
          <Loader />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Maximo Macchi - CSV Parser</h2>
          {!currFile && files.length ? (
            <h3>Choose a file below to parse: </h3>
          ) : (
            ''
          )}
          <Files
            files={files}
            updateCurrFile={(file) => setCurrFile(file)}
            api={API_URL}
            refetch={fetchFiles}
          ></Files>
          <h3>{currFile ? `${currFile} results:` : ''}</h3>
          <Results results={resultData}></Results>
          <Upload files={files} api={API_URL} refetch={fetchFiles} />
        </header>
      </div>
    );
  }
}

export default App;
