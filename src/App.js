import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import MyOrder from './components/Dashboard/MyOrder/MyOrder';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import UserList from './components/Dashboard/UserList/UserList';
function App() {
  return (
    <AuthProvider>

      <BrowserRouter>
        {/* <Appbar></Appbar> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />

          <Route path='/dashboard/*' element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>}>

            <Route path='*' element={<MyOrder />}/>
            <Route path='users' element={<UserList />}/>
            <Route path='myOrder' element={<MyOrder />}/>
  
          </Route>


        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
