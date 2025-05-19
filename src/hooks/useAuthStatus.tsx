// Check if the user is currently authenticated 
import { useEffect, useState } from 'react';


const checkAuthUrl = `${import.meta.env.VITE_DEV_BACKEND_URL}/auth/check-status`;
export function useAuthStatus() {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    fetch(checkAuthUrl, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) setStatus('authenticated');
        else setStatus('unauthenticated');
      })
      .catch(() => setStatus('unauthenticated'));
  }, []);

  return status;
}
