import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import volunteerImg from '../../Media/images/extraVolunteer.png';
import './MyEvent.css';
import { userContext } from '../../App';


const MyEvent = () => {
    const [myEvent, setMyEvent] = useState()
    const [login, setLogin] = useContext(userContext)

    useEffect(() => {
     fetch('https://volunternetworkapp.herokuapp.com/events?email='+login.email,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization : `Bearer ${sessionStorage.getItem('token')}`
         }  
     })
     .then(res => res.json())
     .then(data => setMyEvent(data))
    },[])


    // handle remove item
    const handleRemoveEvent = (element) => {
      element.target.parentNode.parentNode.style.display = 'none'
    }
    
    return (
        <div className='bg-light myEvent'>
           <Navbar eventPage="eventPage"/>
            <div className="container">
               <div className="row mt-5 gx-5">
                  {
                    myEvent? 
                    myEvent.map((elem) => {
                        return (
                            <>
                             <div className="col-6 my-3">
                                <div className="row eventCard py-3">
                                   <div className="col-4">
                                     <img src={volunteerImg} alt="" className='w-100'/>
                                   </div>
                                   <div className="col-8 py-3">
                                      <h4>{elem?.event}</h4>
                                       <p>{elem?.date}</p>
                                       <button onClick={(elem) => handleRemoveEvent(elem)}>Cancel</button>
                                   </div>
                                </div>
                             </div>
                            </>
                        )
                    })
                    :
                    'loading...'
                  }
               </div>
            </div>
        </div>
    );
};

export default MyEvent;