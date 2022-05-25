import React, { useContext,useState} from 'react';
import './Registration.css';
import Logo from '../../Media/logos/Group 1329.png';
import { userContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';




const Registration = () => {
    const [login, setLogin] = useContext(userContext)
    const [input, setInput] = useState()
    const navigate = useNavigate()

    const {name, event, email} = login

    const handleBlur = (e) => {
        let isFormValid
        if(e.target.name === 'date'){
            isFormValid = e.target.value
            setLogin(isFormValid)
        }
        if(e.target.name === 'discription'){
            isFormValid = e.target.value
            setLogin(isFormValid)
        }
        if(e.target.name === 'name'){
            isFormValid = e.target.value;
        }
        if(isFormValid){
            let newUserInfo = {...login}
            newUserInfo[e.target.name] = e.target.value
            setLogin(newUserInfo)
         }
    }
  

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://volunternetworkapp.herokuapp.com/addPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({login})
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        navigate('/myevent')
    }

    
 
    return (
        <div id="Registration">
           <div className="logo">
             <Link to="/home"><img src={Logo} alt=""/></Link>
           </div>
            <div className="registration-container">
               <div className="registration-inner">
                  <h3>Register as a Volunteer</h3>
                  <form  action="#" onSubmit={handleSubmit}>
                  <input type="text" placeholder='Full Name' value={name}/>
                  <input type="email" placeholder='Username or Email' value={email}/>
                  <input type="date" placeholder='Date' name="date" onBlur={handleBlur}/>
                  <input type="text" placeholder='Desicription' name="discription" onBlur={handleBlur}/>
                  <input type="text" placeholder='Organize books at the library.' value={event}/>
                  <input type="submit" value="Registration" className='submit'/>
                 </form>
               </div>
            </div>
        </div>
    );
};

export default Registration;