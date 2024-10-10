import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getSaleById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

async function getSalesByStoreLocation(pageSize, page, storeLocation) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: storeLocation })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getFilteredSales(pageSize, page, filter) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find(filter)
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

async function getTop10MostSellingProducts() {
  const connectiondb = await getConnection();
  const top10Products = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ])
    .toArray();

  return top10Products.map(product => ({
    name: product._id,
    totalQuantity: product.totalQuantity
  }));
}

async function getMostSatisfiedClients() {
  const connectiondb = await getConnection();
  const satisfiedClients = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      { $sort: { "customer.satisfaction": -1 } }
    ])
    .toArray();

  return satisfiedClients.map(client => ({
    clientEmail: client.customer.email,
    clientSatisfaction: client.customer.satisfaction
  }));
}

export { 
  getAllSales, 
  getSaleById, 
  getSalesByStoreLocation, 
  getFilteredSales, 
  getTop10MostSellingProducts, 
  getMostSatisfiedClients
};
