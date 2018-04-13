import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer } from 'react-toastify';
import CategoryDashboard from './CategoryDashboard/CategoryDashboard';

const App = () => {
  return (
    <MuiThemeProvider>
      <div className='h-100'>
        <ToastContainer autoClose={2500} />
        <CategoryDashboard />
      </div>
    </MuiThemeProvider>
  );
};

export default App;