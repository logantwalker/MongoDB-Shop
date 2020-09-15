//importing our database connection from the database.js module
const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp
    if(this._id){
      //update the product

      //updateOne needs a filter and a JSON where we describe the update. THIS IS NOT THE NEW OBJ
      dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)},{$set: this});

    }
    else{
      dbOp = db.collection('products').insertOne(this)
    }
    //in mongodb, you can call collection to tell mongodb into which collection you want to insert something 
    //also to specify what collection you want to work with 

    //if it doesnt exist yet, it will be created when we insert data
    return dbOp
      .then(result =>{
        console.log(result)
      })
      .catch(err =>{
        console.log(err);
        throw err;
      })
  }

  static fetchAll(){

    const db = getDb();
    //use find to fetch data. you can also apply a filter to find specific data i.e. {name: 'Logan'}
    //does not return a promise, but instead returns something called a cursor
    //cursor is an obj provided by mongodb which allows us to go through our documents step by step
    //find gives you a handle which you can use to iterate through the documents
    //but you can use .toArray() to return all of the documents, but that is a bad idea with a lot of data.

    return db
      .collection('products')
      .find()
      .toArray()
      .then(products =>{
        console.log(products);
        return products;
      })
      .catch(err =>{
        console.log(err);
        throw err;
      })
  }
  //_id is a special mongodb data type. you must require mongodb to access it
  static findById(prodId) {
    const db=getDb();
    return db.collection('products')
      //this mongodb method wraps your id string with the ObjectId bson data type
      // so the system will recognize what you are looking for
      .find({_id: new mongodb.ObjectId(prodId)})
      .next()
      .then(product =>{
        console.log(product);
        return product;
      })
      .catch(err =>{
        console.log(err);
        throw err;
      });
  }

  // static Edit()
}

module.exports = Product;
