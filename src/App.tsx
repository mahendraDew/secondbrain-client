import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Error from './pages/Error';
import Dashboard from "./pages/Dashboard";
import Tos from "./pages/Tos";
import PrivacyPolicy from "./pages/Privacy";
// import Test from "./pages/Test";
import SharedContent from "./pages/SharedContent";


function App() {
  
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null; // Check if user data exists in localStorage
  // console.log("the user from app: ", user);

  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <Router>
      <div className="App">
        {/* Define navigation routes */}
        <Routes>
          <Route path="/" element={<Landing />} />        
          {/* <Route path="/test" element={<Test />} />         */}
          <Route path="/signup" element={<SignUp />} />        
          <Route path="/signin" element={<SignIn />} />        
          <Route path="/home" element={user? <Dashboard />: <Navigate to='/' />} />        
          <Route path="/share/brain/:hash" element={<SharedContent />} />        
          <Route path="/tos" element={<Tos/>} />        
          <Route path="/privacy" element={<PrivacyPolicy />} />        
          <Route path="*" element={<Error />} /> 
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
    </ThemeProvider>

  )
}

export default App
