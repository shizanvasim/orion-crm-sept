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

// ----------------------------------------------------------------------

export const LoadingContext = createContext()

export default function App() {
  const [loading, setLoading] = useState(false)
  const [currentuser, setCurrentUser] = useState([])
  const token = localStorage.getItem("token")
  const {username, email, setUserInfo} = userStore

  // Client Side
  useEffect(() => {
    (async()=>{
      if(!token){
        console.log("Please Login First")
      }else{
        const response = await axios.post('/login/protected', {"token": token})
        setCurrentUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response))
        setUserInfo(response.data.user)
      }
    })()
  }, []);


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
