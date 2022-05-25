const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const ObjectId = require('mongodb').ObjectId
const admin = require('firebase-admin')
const {getAuth} = require('firebase-admin/auth')
var serviceAccount = require('./volunteer-app-e86f8-firebase-adminsdk-kiq1y-cab266778b.json')


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


//--------------
// middle ware init
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('events'))
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended: true}))


 //================================
 // user event database collection
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query, response } = require('express')
const uri = "mongodb+srv://networkadmin:network123@cluster0.uppua.mongodb.net/network123?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("network123").collection("eventitems");
  
 
  // post data to server 
  //================================
  app.post('/addPost', (req,res) => {
     const event = req.body.login
     collection.insertOne(event)
     .then(result => {
         console.log('event added sucessfully')
     })
  })


  // Get events
  //================================
  app.get('/events',(req,res) => {
     const bearer = req.headers.authorization
     if(bearer && bearer.startsWith('Bearer ')){
      const idToken = bearer.split(' ')[1]
      // idToken comes from the client app
        getAuth()
       .verifyIdToken(idToken)
       .then((decodedToken) => {
         const tokenEmail = decodedToken.email;
         const queryEmail = req.query.email
         //===============================
          if(tokenEmail == queryEmail){
            collection.find({email: req.query.email})
           .toArray((error, document) =>{
             res.status(200).send(document)
           })
         }
       }) 
    }
     else{
      res.status(401).send('unauthorized access')
    }
  })


  app.get('/allEvent', (req,res) => {
    collection.find({})
    .toArray((error, document) =>{
      res.send(document)
    })
    
  })

  //===================================
  // delate user register from admin dashboard
  app.delete('/delate/:id',(req,res) => {
     collection.deleteOne({_id: ObjectId(req.params.id)})
     .then(result => {
       res.send(result.deletedCount > 0)
     })
  })
  
 
});



//================================
// admin event database collection
client.connect(err => {
  const admincollection = client.db("network123").collection("adminEvent");

   // Post Event
  //================================
  app.post('/addEvent', (req,res) => {
    const file = req.files.file
    const fileName = file.name

    file.mv(`${__dirname}/events/${file.name}`, err => {
       if(err){
         console.log(err)
         return res.status(500).send({msg: 'Fail to upload image'})
       }
       return res.send({name: file.name, path: file.name})
    })

    const adminEvent = {...req.body,fileName}
    admincollection.insertOne(adminEvent)
     .then(result => {
         console.log('event added sucessfully')
     })
  })

  // Get admin events
  //================================
  app.get('/adminEvent', (req,res) =>{
    admincollection.find({})
    .toArray((error, document) =>{
      res.send(document)
    })
  })

});





//==================================
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(PORT)



 