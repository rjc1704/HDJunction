import PostIt from './PostIt';
import React, { useState } from 'react';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, changeTitle } from '../redux/reducers/boardReducer';

const BoardContents = () => {
  // const defaultPost = { header: 'Post Header', body: '', xValue: 350, yValue: 200 };
  const dispatch = useDispatch();
  const [isRevision, setIsRevision] = useState(false);
  const [description, setDescription] = useState('');
  // const [postList, setPostList] = useState([defaultPost]);
  const currentId = useSelector((state: RootState) => state.boardReducer.selectedId);
  const boardList = useSelector((state: RootState) => state.boardReducer.boardList);
  const currentBoard = boardList.filter((board) => board.id === currentId);
  const postList = boardList[currentId].postList;
  const handleAddPost = (e: React.MouseEvent) => {
    // setPostList([...postList, { header: 'Post Header', body: '', xValue: e.clientX, yValue: e.clientY }]);
    dispatch(addPost({ xValue: e.clientX, yValue: e.clientY }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <section id="boardContentsWrapper">
      {!isRevision ? (
        <header className="boardName" onClick={() => setIsRevision(true)}>
          {currentBoard[0].title}
        </header>
      ) : (
        <form className="titleForm">
          <input className="titleInput" type="text" placeholder={currentBoard[0].title} onChange={handleChange} />
          <button
            onClick={(e) => {
              e.preventDefault();
              // changeTitle(description);
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
          <PostIt key={idx} header={post.header} body={post.body} xValue={post.xValue} yValue={post.yValue} />
        ))}
      </div>
    </section>
  );
};

export default BoardContents;
