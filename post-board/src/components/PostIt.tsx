import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { changeBodyText, changeHeaderTitle } from '../redux/reducers/boardReducer';

interface PostItProps {
  id: number;
  header: string;
  body: string;
  xValue: number;
  yValue: number;
  isModi?: boolean;
}

const PostIt = ({ id, header, body, xValue, yValue, isModi }: PostItProps) => {
  const dispatch = useDispatch();
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const headerRef = useRef<HTMLTextAreaElement>(null);
  const headerTitleRef = useRef<HTMLInputElement>(null);
  const [bodyWidth, setBodyWidth] = useState(0);
  const [isHeaderRevision, setIsHeaderRevision] = useState(isModi);
  const [description, setDescription] = useState('');
  const [bodyText, setBodyText] = useState('');
  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.target.value);
  };
  const resizeWidth = () => {
    if (bodyRef.current) setBodyWidth(bodyRef.current.offsetWidth);
  };
  useEffect(() => {
    dispatch(changeBodyText({ id, body: bodyText }));
  }, [bodyText]);
  useEffect(() => {
    if (bodyRef.current && headerRef.current) {
      const diff = bodyRef.current?.offsetWidth - headerRef.current?.offsetWidth;
      headerRef.current.style.width = `${headerRef.current.offsetWidth + diff}px`;
    }
  }, [bodyWidth]);
  useEffect(() => {
    if (headerTitleRef.current && isHeaderRevision) {
      headerTitleRef.current.focus();
    }
  }, [isHeaderRevision]);
  const postStyle = {
    left: xValue,
    top: yValue,
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`e.target.value: `, e.target.value);
    setDescription(e.target.value);
  };
  return (
    <div className="postItWrapper" style={postStyle}>
      {!isHeaderRevision ? (
        <header className="postItHeader" ref={headerRef}>
          <div className="title" onClick={() => setIsHeaderRevision(true)}>
            {header}
          </div>
          <div className="iconWrapper">
            <FontAwesomeIcon icon="minus-square" className="hideIcon" />
            <FontAwesomeIcon icon="window-close" className="closeIcon" />
          </div>
        </header>
      ) : (
        <form
          className="headerForm"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(changeHeaderTitle({ id, header: description }));
            setIsHeaderRevision(false);
          }}
        >
          <input
            ref={headerTitleRef}
            className="headerInput"
            type="text"
            placeholder={header}
            onChange={handleChange}
            defaultValue={header}
          />
        </form>
      )}
      <textarea className="postItBody" ref={bodyRef} onMouseMove={resizeWidth} onChange={handleBodyChange} value={body} />
    </div>
  );
};

export default PostIt;
