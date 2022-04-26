import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
function App() {
  return (
    <AuthProvider>

        <BrowserRouter>
          {/* <Appbar></Appbar> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
