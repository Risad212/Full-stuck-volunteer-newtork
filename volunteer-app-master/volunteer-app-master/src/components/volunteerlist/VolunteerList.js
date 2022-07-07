import React, { useEffect, useState } from 'react';
import './VolunteerList.css';
import Sidebar from '../sidebar/Sidebar';


const VolunteerList = () => {
    const [volunteerList, setVolunteerList] = useState()

    useEffect(() => {
      fetch('http://localhost:5000/allEvent')
      .then(res => res.json())
      .then(data => setVolunteerList(data))
    },[])
   
    function delateEvent(event,id){
       fetch(`http://localhost:5000/delate/${id}`,{
          method: 'DELETE',
       })
       .then(res => res.json)
       .then(result => {
           if(result){
              event.target.parentNode.parentNode.style.display = 'none'
           }
       })
    }
 

    
 
    return (
        <div id="valunteerList">
           <div className="row ">
              <div className="col-2">
                 <Sidebar />
              </div>
              <div className="col-10 volunteer-container bg-light">
                 <h2 className='py-4'>volunteer register list</h2>
                  <div className="volunteer-list-container bg-white">
                    <table>
                       <tr>
                          <th>Name</th>
                          <th>Email Id</th>
                          <th>Registation Date</th>
                          <th>volunteer lists</th>
                          <th>Action</th>
                       </tr>
                           {
                             volunteerList? (
                                <>
                                 {
                                  volunteerList.map((elem) => {
                                     console.log(elem)
                                     return (
                                        <>
                                        <tr className='volunterlist'>
                                         <td>{elem?.name}</td>
                                         <td>{elem?.email}</td>
                                         <td>{elem?.date}</td>
                                         <td>{elem?.event}</td>
                                         <td className='ps-4' onClick={(event) => delateEvent(event, elem._id)}><i class="fa-solid fa-trash-can bg-danger p-2 text-white rounded"></i></td>
                                        </tr>
                                        </>
                                     )
                                  })
                                 }
                                </>
                             )
                             :
                             'loading...'
                           }
                     </table>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default VolunteerList;

