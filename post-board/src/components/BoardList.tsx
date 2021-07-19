// import { useEffect } from 'react';
import { addBoard, selectBoard } from '../redux/reducers/boardReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BoardList = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.boardReducer.boardList);
  const handleAdd = () => {
    dispatch(addBoard());
  };

  const handleSelect = (id: number) => {
    dispatch(selectBoard({ id }));
  };

  return (
    <div id="boardListWrapper">
      <div className="listUl">
        {boardList.map((board, idx) => {
          return (
            <div className="boardList" key={idx} onClick={() => handleSelect(idx)}>
              <span>-</span> {board.title}
            </div>
          );
        })}
      </div>
      <section className="plusSection">
        <div className="plusBtn" onClick={handleAdd}>
          +
        </div>
      </section>
    </div>
  );
};

export default BoardList;
