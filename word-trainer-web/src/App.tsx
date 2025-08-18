import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');

  useEffect(() => {
    // Загружаем words.csv из public
    fetch('/dictionary.csv')
      .then(res => res.text())
      .then(text => {
        const parsed = Papa.parse(text, { header: true });
        const wordList = (parsed.data as any[])
          .map(row => row.word)
          .filter(Boolean);
        setWords(wordList);
        showRandom(wordList);
      });
  }, []);

  const showRandom = (list = words) => {
    if (!list.length) return;
    const index = Math.floor(Math.random() * list.length);
    setCurrentWord(list[index]);
  };

  return (
    <div className="App" onClick={() => showRandom()}>
      <h1>{currentWord}</h1>
      <p style={{ fontSize: 14, color: '#888' }}>
        (нажми/тапни, чтобы обновить)
      </p>
    </div>
  );
}

export default App;
