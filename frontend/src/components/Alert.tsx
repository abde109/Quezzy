import React, { useEffect, useRef } from 'react';
import { ToastOptions, toast } from 'react-toastify';

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const hasShownToast = useRef(false);




  useEffect(() => {
      
    if (!type || !message) {
      return;
    }
    if (!hasShownToast.current) {
      const options: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

      if (type === 'success') {
        toast.success(message, options);
      } else if (type === 'warning') {
        toast.warn(message, options);
      } else if (type === 'error') {
        toast.error(message, options);
      }

      hasShownToast.current = true;
    }
  }, [type, message]);
    

  

  return null;
};

export default Alert;
