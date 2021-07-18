import PostIt from './PostIt';
import React, { useState } from 'react';

interface ContentsProps {
  boardTitle: string;
  changeTitle: (newTitle: string) => void;
}

const BoardContents = ({ boardTitle, changeTitle }: ContentsProps) => {
  const [isRevision, setIsRevision] = useState(false);
  const [description, setDescription] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  return (
    <section id="boardContentsWrapper">
      {!isRevision ? (
        <header className="boardName" onClick={() => setIsRevision(true)}>
          {boardTitle}
        </header>
      ) : (
        <form className="titleForm">
          <input className="titleInput" type="text" placeholder={boardTitle} onChange={handleChange} />
          <button
            onClick={(e) => {
              e.preventDefault();
              changeTitle(description);
              setIsRevision(false);
            }}
          >
            확인
          </button>
        </form>
      )}
      <div className="contentsArea">
        <PostIt />
      </div>
    </section>
  );
};

export default BoardContents;
