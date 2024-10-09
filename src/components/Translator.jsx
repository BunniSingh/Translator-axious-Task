
import { useState, useEffect } from "react"
import countryCodes from './languagesCodes';
import Language from "./Language";
import axios from 'axios';


const Translator = () => {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [sourceText, setSourceText] = useState('');
  const [tranlatedText, setTranlatedText] = useState('');

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

  return (
    <div className="body-container">
      <div className="container">
        <h1>Text Translator</h1>
        <div className="input-container">
          <div className="left">
            <Language id='source' languages={countryCodes} onChange={(e) => setSourceLang(e.target.value)} value={sourceLang} />
            <textarea
              name=""
              id=""
              // cols="30"
              // rows="10"
              placeholder="Enter your text here"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          <div className="right">
            <Language id='target' languages={countryCodes} onChange={(e) => setTargetLang(e.target.value)} value={targetLang} />
            <textarea
              name=""
              id=""
              // cols="30"
              // rows="10"
              placeholder="Get your translated text here"
              value={tranlatedText}
              readOnly
              onChange={(e) => setTranlatedText(e.target.value)}
            />
          </div>
        </div>
        <div className="btn">
          <button onClick={handleClick}>Translate</button>
        </div>
      </div>
    </div>
  )
}

export default Translator