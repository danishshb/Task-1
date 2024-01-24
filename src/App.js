import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faSave } from '@fortawesome/free-regular-svg-icons';
import { message } from 'antd';
import './App.css'

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [savedText, setSavedText] = useState('');
  const [copyIconHovered, setCopyIconHovered] = useState(false);
  const [saveIconHovered, setSaveIconHovered] = useState(false);

  useEffect(() => {
    const savedTextFromLocalStorage = localStorage.getItem('savedText');
    if (savedTextFromLocalStorage) {
      setSavedText(savedTextFromLocalStorage);
    }
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCopyClick = () => {
    const transformedText = document.getElementById("box");
  
    if (transformedText.value.trim() === "") {
      message.error('Error: Cannot copy empty text.');
    } else {
      transformedText.select();
      navigator.clipboard.writeText(transformedText.value);
      message.success('Text copied to clipboard');
    }
  };
  
  const handleSaveClick = () => {
    if (inputValue.trim() === "") {
      message.error('Error: Cannot save empty text.');
    } else {
      localStorage.setItem('savedText', inputValue);
      setSavedText(inputValue);
      message.success('Text saved successfully');
    }
  };
  
  const firstLetterTransform = (text) =>
  text.replace(/^.|\s\S/g, (match) => match.toUpperCase());

  const handleFirstLetter = () => {
    const firstLetterText = firstLetterTransform(inputValue);
    setInputValue(firstLetterText);
  };

  const handleSentenceCase = () => {
    const sentenceCaseText = inputValue
      .toLowerCase()
      .replace(/(^\s*\w|[/./!/?]\s*\w)/g, (match) => match.toUpperCase());
    setInputValue(sentenceCaseText);
  };

  const handleuppercase = () => {
    const upperText = inputValue.toUpperCase();
    setInputValue(upperText);
  };

  const handlelowercase = () => {
    const lowercaseText = inputValue.toLowerCase();
    setInputValue(lowercaseText);
  };

  const handleclear = () => {
    const clearText = ("");
    setInputValue(clearText);
  };
  return (
    <div className="app">
      <div className="background-image"></div>
      <div className="content">
      <p className='heading'>React Js Project</p>
        <textarea
          id='box'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
         <FontAwesomeIcon
        icon={faCopy}
        style={{
          fontSize: '24px',
          cursor: 'pointer',
          color: copyIconHovered ? 'blue' : 'black', // Change color when hovered
        }}
        onMouseEnter={() => setCopyIconHovered(true)}
        onMouseLeave={() => setCopyIconHovered(false)}
        onClick={handleCopyClick}
      />
      {' '}
      <FontAwesomeIcon
        icon={faSave}
        style={{
          fontSize: '24px',
          cursor: 'pointer',
          color: saveIconHovered ? 'green' : 'black', // Change color when hovered
        }}
        onMouseEnter={() => setSaveIconHovered(true)}
        onMouseLeave={() => setSaveIconHovered(false)}
        onClick={handleSaveClick}
      />
       
        <div className="buttons">
          <button onClick={handlelowercase}>
            lowercase
          </button>
          <button onClick={handleFirstLetter}>
            First Letter
          </button>
          <button onClick={handleuppercase}>
            UPPERCASE
          </button>  
          <button onClick={handleSentenceCase}>
          Sentence Case
        </button>        
          <button onClick={handleclear}>
            Clear
          </button>
        </div>
        <div>
          <h2>Text Summary</h2>
            <p>{inputValue.trim() === "" ? '0 Word' : `${inputValue.split(" ").length} Word`} {" "}
            {inputValue.trim() === "" ? '0 Character' : `${inputValue.length} Character`}</p>
        </div>
        {savedText && <div>Saved Text: {savedText}</div>}
      </div>
    </div>
  );
};

export default App;

