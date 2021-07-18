import React from 'react';
import './App.css';
import BoardList from './components/BoardList';
import BoardContents from './components/BoardContents';

const App: React.FC = () => {
  return (
    <div id="pageWrapper">
      <BoardList />
      <BoardContents />
    </div>
  );
};

export default App;
