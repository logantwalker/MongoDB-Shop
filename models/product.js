//importing our database connection from the database.js module
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();

    //in mongodb, you can call collection to tell mongodb into which collection you want to insert something 
    //also to specify what collection you want to work with 

    //if it doesnt exist yet, it will be created when we insert data
    return db.collection('products').insertOne(this)
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

  static findById(prodId) {
    const db=getDb();
    return db.collection('products')
      .find({_id: prodId})
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
}

module.exports = Product;
