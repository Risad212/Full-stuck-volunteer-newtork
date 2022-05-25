import React, { useContext } from 'react';
import Logo from '../../Media/logos/Group 1329.png';
import GoogleIcon from '../../Media/logos/google.png'
import './Login.css';
import { initializeApp } from 'firebase/app';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import firebaseConfig from './firebaseConfiq';
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { userContext } from '../../App';

const app = initializeApp(firebaseConfig)

const Login = () => {
    const [login, setLogin] = useContext(userContext)

    const eventName = login?.eventName

    const location = useLocation()
    const navigate = useNavigate()
    let from = location.state?.from?.pathname || "/registration";

    const handleGoogleSignIn = () => {
       const provider = new GoogleAuthProvider();
       const auth = getAuth();
         signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const {displayName, email,photoURL} = user
               const signInUser = {
                  name: displayName,
                  email: email,
                  photo: photoURL,
                  event: eventName,
               }
               setLogin(signInUser)
               storgeAuthToken()
               navigate(from, { replace: true });
         }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
         });
    }

    const storgeAuthToken = () => {
      getAuth().currentUser.getIdToken(true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken)
          }).catch(function(error) {
            console.log(error)
        });
    }

    

    return (
        <div id="login" className='text-center'>
           <div className="logo">
             <Link to="/home"><img src={Logo} alt=""/></Link>
           </div>
            <div className="login-container">
               <div className="login-inner">
               <h3>Login With</h3>
               <div className="social-account" onClick={handleGoogleSignIn}>
                  <img src={GoogleIcon} alt=""/>
                 <span>Contunie with Google</span>
              </div>
                <span className='d-block mt-3'>Don’t have an account? <Link to="/login">Create an account</Link></span>
              </div>
           </div>
        </div>
    );
};

export default Login;