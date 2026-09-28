'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useAppDispatch } from './hooks';
import { restoreAuth } from './slices/authSlice';
import { store } from './store';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        dispatch(restoreAuth({ token, user }));
      }
    } catch {
      // Ignore JSON parsing or storage access errors
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}

