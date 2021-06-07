const express=require ('express')
const app = express();
const PORT= 5000;
require('dotenv').config()
const cookieParser =require('cookie-parser')
const Routes = require('./Routes/routes')

/* Conexion a base de datos */
const mongoose = require('mongoose')
mongoose.set('runValidators', true);
mongoose.connect(process.env.DB, {
  useNewUrlParser : true, 
  useUnifiedTopology : true,
  useFindAndModify : false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(response => console.log("MongoDB Connected Successfully.") )
.catch(err => console.log("Database connection failed.") );
mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())
/* Conexion a base de datos */



app.use('/api',Routes.category)
app.use('/api',Routes.user)

app.use(function(err,req,res,next){
  res.json({error:err.message})
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
} 

app.listen(PORT,()=> console.log("Server Activated Correctly"))


