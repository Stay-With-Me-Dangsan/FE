import React, { useEffect } from 'react';
import './App.css';
import { Router } from './router/Router';
import { Modal } from './components/modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { jwtStore } from './store';

function App() {
  const [, setJwt] = useAtom(jwtStore);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setJwt(token);
    }
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
