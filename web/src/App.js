import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from './routes';

function App() {
  return (
    <div>
    <ToastContainer
      autoClose={5000}
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <AppRoutes />
  </div>
  );
}

export default App;
