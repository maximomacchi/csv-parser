import '../App.css';
import Loader from './Loader';
import { useState, useEffect } from 'react';

function Results({ results }) {
  // Dynamic set of tables that's updated whenever current file results change
  const [tables, setTables] = useState([]);
  // Status of whether HTML is being generated for current file results
  const [loading, setLoading] = useState(false);

  // Generate new HTML for current file results whenever results changes
  useEffect(() => {
    if (Object.keys(results).length) {
      setLoading(true);
      let tables = [];
      // Loop through each question and create a new table for its responses
      for (let question in results) {
        tables.push(<h2>{question}</h2>);
        let body = [];
        // Loop through each answer and create a new table row based on the
        // answer's breakdown of responses
        for (let answer in results[question]) {
          body.push(
            <tr>
              <td>{answer}</td>
              <td>{results[question][answer]}</td>
            </tr>
          );
        }
        tables.push(
          <table className="table">
            <thead>
              <tr>
                <th>Response</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>{body}</tbody>
          </table>
        );
      }
      setTables(tables);
      setLoading(false);
    }
  }, [results]);

  if (loading) {
    return <Loader />;
  } else {
    return <div className="results">{tables}</div>;
  }
}

export default Results;
