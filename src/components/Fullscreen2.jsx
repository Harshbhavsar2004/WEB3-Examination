import React, { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResizeComponent() {
  const resizeCount = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      resizeCount.current += 1;
      if (resizeCount.current % 2 === 0) {
        toast.error("Window has been resized!");
        window.location.href = '/dash'; 
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h1>Resize the window to see the toast message</h1>
      <ToastContainer />
    </div>
  );
}

export default ResizeComponent;
