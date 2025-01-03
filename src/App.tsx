import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Error from './pages/Error';
import Dashboard from "./pages/Dashboard";
import Tos from "./pages/Tos";
import PrivacyPolicy from "./pages/Privacy";
import { Analytics } from "@vercel/analytics/react"
import SharedContent from "./pages/SharedContent";
import { useEffect, useState } from "react";


function App() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  // const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null; // Check if user data exists in localStorage
  // console.log("the user from app: ", user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <Router>
      <div className="App">
        {/* Define navigation routes */}
        <Routes>
          <Route path="/" element={<Landing />} />        
          {/* <Route path="/test/:hash" element={<Test />} />         */}
          <Route path="/signup" element={<SignUp />} />        
          <Route path="/signin" element={<SignIn setUser={setUser}/>} />        
          <Route path="/home" element={user? <Dashboard />: <Navigate to='/' />} />        
          <Route path="/share/brain/:hash" element={<SharedContent />} />        
          <Route path="/tos" element={<Tos/>} />        
          <Route path="/privacy" element={<PrivacyPolicy />} />        
          <Route path="*" element={<Error />} /> 
          {/* Add more routes as needed */}
        </Routes>
        <Analytics />

      </div>
    </Router>
    </ThemeProvider>

  )
}

export default App
