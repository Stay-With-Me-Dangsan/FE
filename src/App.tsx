import React from 'react';
import './App.css';
import { Router } from './router/Router';
import { Modal } from './components/modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
      <Modal>
        <h2>모달</h2>
        <p>모달 내용</p>
      </Modal>
    </>
  );
}

export default App;
