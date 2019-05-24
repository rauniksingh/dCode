require('dotenv').config();
const express = require('express'),
      app = express(),
      mongoose = require('mongoose')
      mongoose.Promise = global.Promise,
      bodyParser = require('body-parser'),
      chalk = require('chalk'),
      config = require('./config/config'); 

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));
app.use(bodyParser.json());    

app.use('/api', require('./routes/user'));
app.use('/api/thread', require('./routes/thread'));

//-----Database Connection----------
try {
  mongoose.connect(`mongodb://localhost:27017/${environmentConfig.database}`, { useNewUrlParser: true, 'useCreateIndex':true }).catch((err) => {
   if(err) console.error(chalk.red(' [ ✗ ] '), err)
}) 
 console.log(chalk.blue(` [ ✓ ] Connected to Database : ${environmentConfig.database}`) ); 
} catch (error) {
    return console.error(chalk.red(' [ ✗ ] '), error);
}
//---------------------------------------

app.listen(environmentConfig.node_port, () => {
     console.log(chalk.blue(' [ ✓ ] Running on port : ' + environmentConfig.node_port ) );
});