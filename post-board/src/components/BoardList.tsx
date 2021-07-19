// import { useEffect } from 'react';
import { addBoard, selectBoard } from '../redux/reducers/boardReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BoardList = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state: RootState) => state.boardReducer.boardList);
  const selectedId = useSelector((state: RootState) => state.boardReducer.selectedId);
  const handleAdd = () => {
    dispatch(addBoard());
  };

  const handleSelect = (id: number) => {
    dispatch(selectBoard({ id }));
  };

  interface BoardProps {
    color: string;
    background: string;
  }

  const boardStyle: BoardProps = {
    color: '#ffffff',
    background: 'black',
  };

  return (
    <div id="boardListWrapper">
      <div className="listUl">
        {boardList.map((board, idx) => {
          return (
            <>
              {selectedId === board.id ? (
                <div className="boardList" style={boardStyle} key={idx} onClick={() => handleSelect(idx)}>
                  <span>-</span> {board.title}
                </div>
              ) : (
                <div className="boardList" key={idx} onClick={() => handleSelect(idx)}>
                  <span>-</span> {board.title}
                </div>
              )}
            </>
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
