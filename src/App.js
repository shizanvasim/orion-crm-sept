import { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'mobx-react';
import axios from 'axios';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import userStore from './stores/UserStore';

import LogoutPage from './pages/LogoutPage';

// ----------------------------------------------------------------------

export const LoadingContext = createContext()

export default function App() {
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const { setUserInfo } = userStore

  useEffect(() => {
    (async () => {
      if (!token) {
        console.log("Please Login First");
      } else {
        try {
          const response = await axios.post('/login/protected', { "token": token });

          if (response.status === 200) {
            console.log('Token is valid');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUserInfo(response.data.user);
          } else {
            console.log('Token is invalid. Status code:', response.status);
          }
        } catch (error) {
          console.error('Error occurred:', error);
          // Handle other network or request-related errors here
          window.location.href = '/dashboard/logout';
        }
      }
    })();
  }, [setUserInfo, token]);



  return (
    <Provider>
      <LoadingContext.Provider value={[loading, setLoading]}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </LoadingContext.Provider>
    </Provider>
  );
}
