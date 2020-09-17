const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username,email,id){
    this.username = username;
    this.email = email;
    this._id = id ? new mongodb.ObjectId(id): null;
  }

  save() {
    const db = getDb();
    db.collection('users').insertOne(this)
  }

  static findById(userId) {
    const db=getDb();
    return db.collection('users')
      //this mongodb method wraps your id string with the ObjectId bson data type
      // so the system will recognize what you are looking for
      .find({_id: new mongodb.ObjectId(userId)})
      .next()
      .then(user =>{
        console.log(user);
        return user;
      })
      .catch(err =>{
        console.log(err);
        throw err;
      });
  }
}
module.exports = User;
