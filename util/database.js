//here is where we are going to establish connect to mongo Atlas
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//empty variable to later store the database info from Cluster0 on Atlas
let _db;


//method for connecting and storing the connection to the database
//this will keep on running
const mongoConnect = (callback) =>{

  MongoClient.connect(
    'mongodb+srv://lwalker37:amv12v@cluster0.p7jgf.mongodb.net/Cluster0?retryWrites=true&w=majority',
  {   useNewUrlParser: true, 
      useUnifiedTopology: true 
  })
  .then(client => {
    console.log('connected!');

    // here the value is assigned to _db with the client.db() method returned to us by mongodb
    //SIDE_NOTE: we never need to create the database or the tables/collections ahead of time
    // the db is created on the fly when we first access it. 
    //mongodb will create the db as soon as we start writing data to it

    //stored db connection
    _db = client.db();
    callback();
  }).catch(err =>{
    console.log(err);
    throw err;
  });

}

//method for returning access to that connected db if it exists
//mongodb manages this behind the scenes with something called connection pooling

const getDb = () =>{
  if (_db){
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;




