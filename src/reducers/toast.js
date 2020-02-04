import { toast } from 'react-toastify'

const toastSucces = (text) => {
    toast.success(text, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }
  
  const toastError = (text) => {
    toast.error(text , {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });  
  }

export {toastSucces, toastError}
