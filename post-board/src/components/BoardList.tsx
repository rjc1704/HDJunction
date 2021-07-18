import { useState, useEffect } from 'react';

interface ListProps {
  boardTitle: string;
}

const BoardList = ({ boardTitle }: ListProps) => {
  const defaultBoard = { title: 'Title', body: null };
  const [boardList, setBoardList] = useState([defaultBoard]);
  const handleAdd = () => {
    setBoardList([...boardList, defaultBoard]);
  };
  useEffect(() => {
    console.log(`boardTitle:`, boardTitle);
  }, []);
  return (
    <div id="boardListWrapper">
      <ul className="listUl">
        {boardList.map((board, idx) => {
          return (
            <li className="boardList" key={idx}>
              {board.title} {idx}
            </li>
          );
        })}
      </ul>
      <section className="plusSection">
        <div className="plusBtn" onClick={handleAdd}>
          +
        </div>
      </section>
    </div>
  );
};

export default BoardList;
