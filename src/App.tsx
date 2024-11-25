import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './shared/themes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  return (
  <ThemeProvider theme={LightTheme}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ToastContainer />
  </ThemeProvider>
    
    
  );
}


