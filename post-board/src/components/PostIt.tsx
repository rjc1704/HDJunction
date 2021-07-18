import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useEffect, useState } from 'react';

const PostIt = () => {
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
  return (
    <div className="postItWrapper">
      <header className="postItHeader" ref={headerRef}>
        <div className="title">This is awesome!</div>
        <div className="iconWrapper">
          <FontAwesomeIcon icon="minus-square" className="hideIcon" />
          <FontAwesomeIcon icon="window-close" className="closeIcon" />
        </div>
      </header>
      <textarea className="postItBody" ref={bodyRef} onMouseMove={resizeWidth} />
    </div>
  );
};

export default PostIt;
