import React from 'react';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Media/logos/Group 1329.png';

const Sidebar = () => {
  // remove admin email from sessionStorage and 
  //  navigate to home components
   const navigate = useNavigate()
   const RemoveAdminEmail = () => {
     sessionStorage.clear()
     navigate('/')
   }
    return (
        <div id="sidebar" className='py-3 px-3'>
          <Link to="/home"><img src={Logo} alt=""/></Link>
           <ul className='pt-5'>
             <li className='mb-3'><Link to="/volunteerlist"><i class="fa-solid fa-user-group pe-2"></i>volunteer register list</Link></li>
             <li><Link to="/addevent"><i class="fa-solid fa-plus pe-2"></i>add event</Link></li><li></li>
             <li><Link to="/allevent"><i class="fa-solid fa-calendar pe-2 mt-3"></i>All Event</Link></li><li></li>
             <li><button type="button" class="btn btn-primary mt-5 px-3" onClick={RemoveAdminEmail}>Log Out</button></li>
          </ul>
        </div>
    );
};

export default Sidebar;