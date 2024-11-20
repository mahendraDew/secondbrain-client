import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Error from './pages/Error';


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <Router>
      <div className="App">
        {/* Define navigation routes */}
        <Routes>
          <Route path="/" element={<Landing />} />        
          <Route path="/home" element={<Landing />} />        
          <Route path="/signup" element={<Signup />} />        
          <Route path="/signin" element={<Signin />} />        
          <Route path="*" element={<Error />} /> 
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
    </ThemeProvider>

  )
}

export default App
