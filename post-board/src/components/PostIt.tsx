import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useEffect, useState } from 'react';

interface PostItProps {
  header: string;
  body: string;
  xValue: number;
  yValue: number;
}

const PostIt = ({ header, body, xValue, yValue }: PostItProps) => {
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const headerRef = useRef<HTMLTextAreaElement>(null);
  const [bodyWidth, setBodyWidth] = useState(0);
  const resizeWidth = () => {
    if (bodyRef.current) setBodyWidth(bodyRef.current.offsetWidth);
  };
  useEffect(() => {
    if (bodyRef.current && headerRef.current) {
      const diff = bodyRef.current?.offsetWidth - headerRef.current?.offsetWidth;
      headerRef.current.style.width = `${headerRef.current.offsetWidth + diff}px`;
    }
  }, [bodyWidth]);
  const postStyle = {
    left: xValue,
    top: yValue,
  };
  return (
    <div className="postItWrapper" style={postStyle}>
      <header className="postItHeader" ref={headerRef}>
        <div className="title">{header}</div>
        <div className="iconWrapper">
          <FontAwesomeIcon icon="minus-square" className="hideIcon" />
          <FontAwesomeIcon icon="window-close" className="closeIcon" />
        </div>
      </header>
      <textarea value={body} className="postItBody" ref={bodyRef} onMouseMove={resizeWidth} />
    </div>
  );
};

export default PostIt;
