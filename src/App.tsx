import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import theme from './theme';
import Contacts from './pages/Contacts';
import Create from './pages/Create';
import Delete from './pages/Delete';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/create" element={<Create />} />
          <Route path="/contacts/delete/:id" element={<Delete />} />
          <Route path="*" element={<Navigate to="/contacts" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
