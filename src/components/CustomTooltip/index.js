import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

const CustomTooltip = ({ text, children, show=false }) => {
  const targetRef = useRef(null); // Ref para el elemento target (el `children`)
  const [showTooltip, setShowTooltip] = useState(show);
  const [tooltipStyle, setTooltipStyle] = useState({});

  useEffect(() => {
    if (showTooltip && targetRef.current) {
      const { top, left, height } = targetRef.current.getBoundingClientRect();
      setTooltipStyle({
        position: 'fixed',
        top: top + window.scrollY - 10,
        left: left + window.scrollX,
        zIndex: 10000, // Asegura que esté encima de otros elementos
      });
    }
  }, [showTooltip]);

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={() => setShowTooltip(true)}
        style={{ display: 'inline-block' }} 
      >
        {children}
      </div>
      {showTooltip &&
        ReactDOM.createPortal(
          <div className='custom-tooltip' style={{ ...tooltipStyle }}>
            {text}
          </div>,
          document.body
        )}
    </>
  );
};

export default CustomTooltip;
