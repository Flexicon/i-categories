import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ToastContainer } from 'react-toastify';
import CategoryDashboard from './CategoryDashboard/CategoryDashboard';

const wrapperStyle = {
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 1rem',
  boxSizing: 'border-box'
};

const App = () => {
  return (
    <MuiThemeProvider>
      <div style={wrapperStyle}>
        <ToastContainer />
        <CategoryDashboard />
      </div>
    </MuiThemeProvider>
  );
};

export default App;