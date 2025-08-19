import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './App.css';

interface Word {
  word: string;
  english: string;
  russian: string;
}

function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showRussian, setShowRussian] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'words.csv')
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true });
        const wordList: Word[] = (parsed.data as any[])
          .map(row => ({
            word: row.word,
            english: row.english,
            russian: row.russian,
          }))
          .filter(w => w.word);
        setWords(wordList);
        showRandom(wordList);
      });
  }, []);

  const showRandom = (list = words) => {
    if (!list.length) return;
    const index = Math.floor(Math.random() * list.length);
    console.log(`Showing word at index: ${index} out of ${list.length}`);    
    setCurrentWord(list[index]);
    setShowEnglish(false);
    setShowRussian(false);
  };

  return (
    <div className="App">
      {currentWord && (
        <div className="word-container">
          <h1>{currentWord.word}</h1>
          <p
            className={`translation ${showEnglish ? 'visible' : 'hidden'}`}
            onClick={() => setShowEnglish(!showEnglish)}
          >
            {showEnglish ? currentWord.english : 'English'}
          </p>
          <p
            className={`translation ${showRussian ? 'visible' : 'hidden'}`}
            onClick={() => setShowRussian(!showRussian)}
          >
            {showRussian ? currentWord.russian : 'Русский'}
          </p>
          <button onClick={() => showRandom()}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;
