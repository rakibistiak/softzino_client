import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/Context/AuthProvider';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import UserList from './components/Dashboard/UserList/UserList';
import DeleteProduct from './components/Dashboard/DeleteProduct/DeleteProduct';
import AddProduct from './components/Dashboard/AddProduct/AddProduct';
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

            <Route path='*' element={<DeleteProduct />}/>
            <Route path='users' element={<UserList />}/>
            <Route path='deleteproduct' element={<DeleteProduct />}/>
            <Route path='addProduct' element={<AddProduct />}/>
  
          </Route>


        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
