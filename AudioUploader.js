// AudioUploader.js
import React, { useState } from 'react';

function AudioUploader() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/analyze', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setAnalysis(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Analyze</button>
      </form>
      {analysis && (
        <div>
          <p>BPM: {analysis.bpm}</p>
          <p>Key: {analysis.key}</p>
        </div>
      )}
    </div>
  );
}

export default AudioUploader;
