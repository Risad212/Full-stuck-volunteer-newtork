import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import './Event.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Event = () => {
    const [login, setLogin] = useContext(userContext)
    const [event, setEvent] = useState()
    const [query, setQuery] = useState()
   
    console.log(event? event.filter(evn => evn.title.toLowerCase().includes(query)): '')

    useEffect(() => {
      fetch('https://volunternetworkapp.herokuapp.com/adminEvent')
      .then(res => res.json())
      .then(res => setEvent(res))
    },[])


    const classes = useStyles();
    
    return (
        <div id="event">
           <div className="container">
              <div className="input-container">
                  <h2>I grow by helping people in need.</h2>
                   <input type="text" placeholder='Search....' onChange={(e) => setQuery(e.target.value)}/>
                   <button>Search</button>
              </div>
              <div className="row my-5">
                 {
                   event? 
                    <>
                     {
                      query?(
                      event.filter(evn => evn.title.toLowerCase().includes(query)).map(elem => {
                       return (
                           <>
                            <div className="col-3 mb-5">
                              <div className="single-cart" onClick={(e) => setLogin({eventName: e.target.parentNode.firstChild.innerText})}>
                               <Link to="/login">
                              <Card className={classes.root}>
                                <CardActionArea>
                                  <CardMedia
                                    className={classes.media}
                                    image={`http://localhost:5000/${elem?.fileName}`}
                                    title="Contemplative Reptile"
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      {elem?.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                      {elem?.disc}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions>
                                  <Button size="small" color="primary">
                                     {elem?.date}
                                  </Button>
                                </CardActions>
                                </Card>
                              </Link>
                              </div>
                           </div>
                           </>
                          )
                         })
                         )
                         :
                         (
                          event.map(elem => {
                            return (
                                <>
                                 <div className="col-3 mb-5">
                                   <div className="single-cart" onClick={(e) => setLogin({eventName: e.target.parentNode.firstChild.innerText})}>
                                    <Link to="/login">
                                   <Card className={classes.root}>
                                     <CardActionArea>
                                       <CardMedia
                                         className={classes.media}
                                         image={`http://localhost:5000/${elem?.fileName}`}
                                         title="Contemplative Reptile"
                                       />
                                       <CardContent>
                                         <Typography gutterBottom variant="h5" component="h2">
                                           {elem?.title}
                                         </Typography>
                                         <Typography variant="body2" color="textSecondary" component="p">
                                           {elem?.disc}
                                         </Typography>
                                       </CardContent>
                                     </CardActionArea>
                                     <CardActions>
                                       <Button size="small" color="primary">
                                          {elem?.date}
                                       </Button>
                                     </CardActions>
                                     </Card>
                                   </Link>
                                   </div>
                                </div>
                                </>
                               )
                              })
                           ) 
                        }
                      </>
                      :
                     'loading...'
                 }
              </div>
           </div>
        </div>
    );
};

export default Event;




