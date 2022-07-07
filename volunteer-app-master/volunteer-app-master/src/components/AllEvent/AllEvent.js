import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AllEvent.css';


const AllEvent = () => {
    const [event,setEvent] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/adminEvent')
        .then(res => res.json())
        .then(data => setEvent(data))
      },[])
     
    return (
        <div id="AllEvent">
        <div className="row">
           <div className="col-2">
              <Sidebar />
           </div>
           <div className="col-10 bg-light">
              <h2 className='py-4'>volunteer register list</h2>
               <div className="bg-white">
                 <table>
                    <tr>
                       <th>Title</th>
                       <th>discription</th>
                       <th>Image</th>
                       <th>Date</th>
                       <th>Action</th>
                    </tr>
                      {
                       event? (
                         event.map(elem => {
                            return (
                                <>
                                 <tr>
                                    <td>{elem?.title}</td>
                                    <td>{elem?.disc}</td>
                                    <td><img src={`${elem?.fileName}`} alt="" /></td>
                                    <td>{elem?.date}</td>
                                    <td>
                                       <i class="fa-solid fa-trash-can bg-danger p-2 text-white rounded"></i>
                                    </td>
                                 </tr>
                                </>
                            )
                         })
                       )
                       :
                       'loading....'
                      }
                  </table>
                </div>
            </div>
         </div>
     </div>
    );
};

export default AllEvent;