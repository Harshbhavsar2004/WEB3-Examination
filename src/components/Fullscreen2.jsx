import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResizeComponent() {
  const resizeCount = useRef(0);
  const history = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      resizeCount.current += 1;
      if (resizeCount.current % 2 === 0) {
        toast.error("Window has been resized!");
        history('/dash') 
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
    </div>
  );
}

export default ResizeComponent;
