
import { useState, useRef } from "react"
import countryCodes from './languagesCodes';
import Language from "./Language";
import axios from 'axios';
import { FaCopy } from "react-icons/fa6";


const Translator = () => {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [sourceText, setSourceText] = useState('');
  const [tranlatedText, setTranlatedText] = useState('');

  const textAreaRef = useRef(null);

  const handleClick = async () => {
    let headers = {
      'x-rapidapi-key': '161b9fff07msh0abd245cb055c9fp172810jsn485b76467f1f',
      'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const data = {
      source_language: sourceLang,
      target_language: targetLang,
      text: sourceText
    };

    try {
      const response = await axios.post(url, data, { headers });
      setTranlatedText(response.data.data.translatedText);
    } catch (err) {
      console.error(err);
    }
  };

  const copyText = () => {
    const textArea = textAreaRef.current;
    if(textArea.defaultValue == '') return;
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(textArea.value)
    .then(() => {
      alert('Text copied to clipboard');
    })
    .catch(err => {
      console.error('Error copying text: ', err);
    });
  };

  return (
    <div className="body-container">
      <div className="container">
        <h1>Text Translator</h1>
        <div className="input-container">
          <div className="left">
            <Language id='source' languages={countryCodes} onChange={(e) => setSourceLang(e.target.value)} value={sourceLang} />
            <textarea
              name="source"
              id="inpurSource"
              placeholder="Enter your text here"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          <div className="right">
            <Language id='target' languages={countryCodes} onChange={(e) => setTargetLang(e.target.value)} value={targetLang} />
            <textarea
              name="target"
              id="targetOutput"
              placeholder="Get your translated text here"
              value={tranlatedText}
              readOnly
              onChange={(e) => setTranlatedText(e.target.value)}
              ref={textAreaRef}
            />
            <button className="copyBtn" onClick={copyText}><FaCopy className="icon"/></button>
          </div>
        </div>
        <div className="btn">
          <button className="result-btn" onClick={handleClick}>Translate</button>
        </div>
      </div>
    </div>
  )
}

export default Translator