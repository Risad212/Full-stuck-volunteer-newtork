import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './AddEvent.css';


const AddEvent = () => {
    const [event, setEvent] = useState()
    const [file, setFile] = useState()
    
    const navigate = useNavigate()

    const handleBlur = (e) => {
      if(e.target.value){
        const newInfo = {...event}
        newInfo[e.target.name] = e.target.value
        setEvent(newInfo) 
      }
   }


    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', event.title)
        formData.append('date', event.date)
        formData.append('disc', event.discription)

        fetch('http://localhost:5000/addEvent', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            res.json();
            if(res){
                navigate('/')
            }
        })
        .then(error => console.log(error))
    }
    


   
    return (
        <div id="addEvent">
          <div className="row ">
              <div className="col-2">
                 <Sidebar />
              </div>
              <div className="col-10 addEventContainer bg-light">
                 <h2 className='py-4'>Add event</h2>
                  <div className="addEventFormContainer px-5 py-4">
                      <form onSubmit={handleSubmit}>
                          <div>
                            <label htmlFor="Event Title">Event Title</label>
                            <input type="text" placeholder='Event Title' name="title" onBlur={handleBlur}/>
                          </div>
                          <div>
                          <label htmlFor="Event Title">Event Date</label>
                            <input type="date" placeholder='date' name="date" onBlur={handleBlur}/>
                          </div>
                          <div>
                              <label htmlFor="Disctiption">Disctiption</label>
                              <textarea name="discription" id="" placeholder="Enter Disctiption" onBlur={handleBlur}></textarea>
                          </div>
                          <div>
                              <label htmlFor="Banner">Banner</label>
                              <input type="file" name="image" id="uploadImage" onChange={(e) => setFile(e.target.files[0])}/>
                          </div>
                      </form>
                       <input type="submit" value="Submit" className='button' onClick={handleSubmit}/>
                  </div>
               </div>
            </div>
        </div>
    );
};

export default AddEvent;