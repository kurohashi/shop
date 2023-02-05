var mongo = require('mongodb').MongoClient;
var conf = require('../configs/app.conf');
let console = conf.console;
const server = 'localhost:27017'; 
const database = 'myshop';
class Database {
  constructor() {
    this._connect().then(_ => console.log("database connected")).catch(err => console.log("Database connection error", err));
  }
  async _connect() {
    let d = await mongo.connect(`mongodb://${server}/${database}`);
    let db = d.db();
    conf.db = db;
    let products = db.collection("inventory");
    await products.createIndexes([{
      key: { sku: 1 },
      unique: true,
    }, {
      key: { price: 1 },
    }, {
      key: { category: "text" }
    }, {
      key: { name: "text" }
    }]);

    let customers = db.collection("customers");
    await customers.createIndexes([{
      key: { id: 1 },
      unique: true,
    }, {
      key: { phone: 1 },
      unique: true,
    }, {
      key: { name: "text", address: "text" },
    }, {
      key: { sex: 1 },
    }]);

    let purchases = db.collection("purchases");
    await purchases.createIndexes([
      { key: { customerId: 1 } },
      { key: { sku: 1 } },
      { key: { agentId: 1 } },
      { key: { ts: -1 } }
    ]);

    conf.collections = {
      products: products,
      customers: customers,
      purchases: purchases,
    };
  }
}
module.exports = new Database()