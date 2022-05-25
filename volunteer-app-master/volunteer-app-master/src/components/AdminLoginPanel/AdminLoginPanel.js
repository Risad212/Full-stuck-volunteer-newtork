import React, {useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './AdminLoginPanel.css';


const AdminLoginPanel = () => {
    const [AdminEmail, setAdminEmail] = useState()

    const navigate = useNavigate()

    const handleBlur = (e) => {
         if(e.target.value){
             setAdminEmail(e.target.value)
         }
    }
    

    const handleAdminEmailSubmit = (e) => {
          e.preventDefault()
          if(AdminEmail === 'hafez.risad@gmail.com'){
            sessionStorage.setItem('adminEmail', AdminEmail)
            navigate('/volunteerlist')
          }
    }
    

    
    return (
        <div id="adminLoginPanel">
          <form action='#'>
                <h2>Admin Login</h2>
                <input type="email" name="email" class="text-field" placeholder="Email" onBlur={handleBlur}/>
                <input type="submit"  class="button" value="Log In" onClick={handleAdminEmailSubmit}/>
            </form>
        </div>
    );
};

export default AdminLoginPanel;