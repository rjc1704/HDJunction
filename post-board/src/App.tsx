import React, { useState } from 'react';
import './App.css';
import BoardList from './components/BoardList';
import BoardContents from './components/BoardContents';

const App: React.FC = () => {
  const [boardTitle, setBoardTitle] = useState('This is a title');
  const changeTitle = (newTitle: string) => {
    setBoardTitle(newTitle);
  };
  return (
    <div id="pageWrapper">
      <BoardList boardTitle={boardTitle} />
      <BoardContents boardTitle={boardTitle} changeTitle={changeTitle} />
    </div>
  );
};

export default App;
