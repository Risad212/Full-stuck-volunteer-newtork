import React, {useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import Logo from '../../Media/logos/Group 1329.png';
import './Navbar.css';


const Navbar = ({eventPage}) => {
    const [userInfo, setUserInfo] = useState()
    const [login,setLogin] = useContext(userContext)

    const adminEmail = sessionStorage.getItem('adminEmail')
    
    const navigate = useNavigate()
    const removeAdminEmail = () => {
       sessionStorage.removeItem('adminEmail')
       navigate('/')
    }
    return (
        <div id="Navbar">
           <nav class="navbar navbar-expand-lg navbar-light">
             <div class="container">
               <Link class="navbar-brand" to="/"><img src={Logo} alt="" /></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                  </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                     <ul class="navbar-nav ms-auto py-3">
                      <li class="nav-item">
                         <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="/addevent">Dashboard</Link>
                      </li>
                       <li class="nav-item">
                         <Link class="nav-link" to="/myevent">Event</Link>
                        </li>
                        <li class="nav-item">
                          <Link class="nav-link" to="/adminlogin">Blog</Link>
                      </li>
                       <div className="btn-container">
                         {
                           eventPage? (<li>{login?.name}</li>): (
                              <>
                               <li class="nav-item nav-btn">
                           <Link class="nav-link" to="/registration">Regester</Link>
                         </li>
                            {
                             adminEmail ? (
                                <>
                                  <li class="nav-item nav-btn" onClick={removeAdminEmail}>
                                    <span class="nav-link">logout</span>
                                  </li>
                                 </>
                                )
                              :
                              (
                                 <>
                                   <li class="nav-item nav-btn">
                                     <Link class="nav-link" to="/volunteerlist">Admin</Link>
                                    </li>
                                  </>
                              )
                            }
                           </>
                           )
                         }
                      </div>
                   </ul>
                </div>
             </div>
          </nav>
       </div>
    );
};

export default Navbar;


