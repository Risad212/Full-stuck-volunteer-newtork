import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration';
import NotFound from './components/NotFound/NotFound'
import PrivetRoute from './components/PrivetRoute/PrivetRoute';
import MyEvent from './components/MyEvent/MyEvent';
import VolunteerList from './components/volunteerlist/VolunteerList'
import AddEvent from './components/AddEvent/AddEvent';
import AdminLoginPanel from './components/AdminLoginPanel/AdminLoginPanel';
import AdminRoute from './components/AdminRoute/AdminRoute';
import AllEvent from './components/AllEvent/AllEvent';

export const userContext = createContext()

function App() {
  const [logInUser, setLogInUser] = useState()
  return (
     <userContext.Provider value={[logInUser, setLogInUser]}>
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/registration' element={<PrivetRoute><Registration /></PrivetRoute>}/>
            <Route path='/myevent' element={<PrivetRoute><MyEvent /></PrivetRoute>}/>
            <Route path='/volunteerlist' element={<AdminRoute><VolunteerList /></AdminRoute>} />
            <Route path='/addevent' element={<AdminRoute><AddEvent /></AdminRoute>} />
            <Route path='/allevent' element={<AdminRoute><AllEvent /></AdminRoute>} />
            <Route path='/adminlogin' element={<AdminLoginPanel />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </BrowserRouter>
     </userContext.Provider>
  );
}

export default App;
