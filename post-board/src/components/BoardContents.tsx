import PostIt from './PostIt';
import React, { useState, useRef, useEffect } from 'react';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, changeTitle } from '../redux/reducers/boardReducer';

const BoardContents = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [isRevision, setIsRevision] = useState(false);
  const [description, setDescription] = useState('');
  // const [postList, setPostList] = useState([defaultPost]);
  const currentId = useSelector((state: RootState) => state.boardReducer.selectedId);
  const boardList = useSelector((state: RootState) => state.boardReducer.boardList);
  const currentBoard = boardList.filter((board) => board.id === currentId);
  const postList = boardList[currentId].postList;
  const handleAddPost = (e: React.MouseEvent) => {
    dispatch(addPost({ xValue: e.clientX, yValue: e.clientY }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    if (titleRef.current && isRevision) {
      titleRef.current.focus();
    }
  }, [isRevision]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      console.log(`e.key:`, e.key);
      if (e.key === 'Dead') {
        dispatch(addPost({ xValue: Math.max(300, Math.random() * 700), yValue: Math.max(100, Math.random() * 500), isModi: true }));
      }
    });
  }, []);

  return (
    <section id="boardContentsWrapper">
      {!isRevision ? (
        <header className="boardName" onClick={() => setIsRevision(true)}>
          {currentBoard[0].title}
        </header>
      ) : (
        <form className="titleForm">
          <input ref={titleRef} className="titleInput" type="text" placeholder={currentBoard[0].title} onChange={handleChange} />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(changeTitle({ title: description }));
              setIsRevision(false);
            }}
          >
            확인
          </button>
        </form>
      )}
      <div className="contentsArea" onDoubleClick={handleAddPost}>
        {postList.map((post, idx) => (
          <PostIt
            key={idx}
            id={post.id}
            header={post.header}
            body={post.body}
            xValue={post.xValue}
            yValue={post.yValue}
            isModi={post.isModi}
          />
        ))}
      </div>
    </section>
  );
};

export default BoardContents;
