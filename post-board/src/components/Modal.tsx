import React from 'react';

interface ModalProps {
  close: () => void;
  title: string;
  btnText1: string;
  btnText2: string;
  callback: () => void;
}

const Modal: React.FC<ModalProps> = ({ close, title, btnText1, btnText2, callback }: ModalProps) => {
  const handleDelete = () => {
    callback();
    close();
  };
  return (
    <div className="darkBackground" onClick={close}>
      <div className="dialogBlock" onClick={(e) => e.stopPropagation()}>
        <div className="dialogBody">{title}</div>
        <div className="btnWrapper">
          <button className="modalBtn" onClick={handleDelete}>
            {btnText1}
          </button>
          <button className="modalBtn" onClick={close}>
            {btnText2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
