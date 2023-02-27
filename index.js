const path=require('path');
const aws = require('aws-sdk');
require('dotenv').config({ path: './config.env' });
const express=require('express');
const edge=require('edge.js')
const dotenv=require('dotenv')
dotenv.config({path:'./congig.env'});
const expressSession=require('express-session')

const bodyParser=require('body-parser')  //parses the post req coming from the browser and give it to us in req.body

const mongoose=require('mongoose');
const connectMongo= require('connect-mongo')
const app=new express();
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology: true 
}).then(()=>{

    console.log('DB connection successful');
});
const mongoStore=connectMongo(expressSession);

const connectFlash=require('connect-flash');

const multer = require('multer'); // "^1.3.0"
const multerS3 = require('multer-s3'); 

app.use(expressSession({
  secret: 'secret',
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
  
}));


app.use(connectFlash())

//app.set('view engine', 'ejs');

//file upload

aws.config.update({
  secretAccessKey: 'YOUR_ACCESS_SECRET_KEY',
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'mybucky101',
      key: function (req, file, cb) {
          console.log(file);
          cb(null, file.originalname); //use Date.now() for unique file keys
      }
  })
});



const Post=require('./database/models/Post')

//controller
const createPostController=require('./controllers/createPost')
const homePageController=require('./controllers/homePage')
const storePostController=require('./controllers/storePost')
const getPostController=require('./controllers/getPost')
const createUserController=require('./controllers/createUser')
const storeUserController=require('./controllers/storeUser')
const loginController=require('./controllers/login')
const loginUserController=require('./controllers/loginUser')
const logoutController=require('./controllers/logout')
const uploadController=require('./controllers/upload')


app.use(express.json())
//jobs controller
const jobsController=require('./controllers/jobs')
const jobsnewController=require('./controllers/jobsnew')
const jobssearchController=require('./controllers/jobssearch')
const jobsupdateController=require('./controllers/jobsupdate')
const jobsdeleteController=require('./controllers/jobsdelete')
const jobssingleController=require('./controllers/jobssingle')
const jobsstatController=require('./controllers/jobsstat')

//jobs middleware
// const errorMiddleware=require('./middleware/errors')
//handling uncaught exceptions
process.on('uncaughtException',err=>{
  console.log(`ERROR: ${err.message}`);
  console.log('shutting down server due to uncaught eeception');
  process.exit(1);
})
process.on('unhandledRejection',err=>{
  console.log(`ERROR: ${err.message}`);
  console.log('shutting down server due to unhandled rejection');
  server.close(()=>{
    process.exit(1);
  })
  process.exit(1);
})


app.use(express.static('public'));
 //app.use(expressEdge)
 //app.set('views','${__dirname}/views')

//app.use(expressEdge);     //app.use helps us to add functionality to express
//app.set('views',`${__dirname}/views`); //name and the currdirectory
app.use('*', (req, res, next) => {
  app.locals.auth = req.session.userId
  next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const storePost=require('./middleware/storePost')
const auth=require("./middleware/auth");
const redirectifAuthenticated=require("./middleware/redirectifAuthenticated")
// app.use('/postsstore',storePost)
// app.use('/posts',auth)
app.set("view engine","ejs")
app.get('/',homePageController)
app.get('/authlogin',redirectifAuthenticated,loginController)
app.get('/authregister',redirectifAuthenticated,createUserController)
app.get('/authlogout',auth,logoutController)
app.get('/post/:id',getPostController)
app.get('/posts',auth,createPostController);
app.post('/postsstore',auth,storePost,storePostController);
app.post('/userregister',redirectifAuthenticated,storeUserController);
app.post('/userlogin',redirectifAuthenticated,loginUserController)


app.get('/upload',uploadController)


//jobbee 
//importing routes

app.get('/api/v1/jobs',jobsController)
app.get('/jobssingle/:id/:slug',jobssingleController)
app.post('/jobsnew',jobsnewController)
app.get('/jobssearch/:zipcode/:distance',jobssearchController)
app.put('/jobsupdate/:id',jobsupdateController)
app.delete('/jobsdelete/:id',jobsdeleteController)
app.get('/jobsstat/:topic',jobsstatController)



app.post('/upload', upload.array('upl', 25), (req, res, next) => {
  res.send({
    message: "Uploaded!",
    urls: req.files.map(function(file) {
      return {url: file.location, name: file.key, type: file.mimetype, size: file.size};
    })
  });
});
app.use((req,res)=>{
    res.render('not-found')
})



app.use(express.json());
app.post('/p',(req,res)=>{
    console.log(req.body);
    res.send('ok');
})



const port =process.env.PORT;
app.listen(port,()=>{
    console.log(`App listening on port ${process.env.PORT}`);
})