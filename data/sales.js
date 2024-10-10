import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
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

async function getSale(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

async function getSalesByLocation(location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location })
    .toArray();
  return sales;
}

async function getSalesFiltered(storeLocation, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      storeLocation: storeLocation,
      purchaseMethod: purchaseMethod,
      couponUsed: couponUsed === "true",
    })
    .toArray();
  return sales;
}

async function getTopSellingProducts() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
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
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 10,
      },
    ])
    .toArray();
  return sales;
}

async function getMostSatisfiedClients() {
  const connectiondb = await getConnection();
  const clients = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([
      {
        $group: {
          _id: "$customer.email",
          totalSatisfaction: { $sum: "$customer.satisfaction" },
        },
      },
      {
        $sort: { totalSatisfaction: -1 },
      },
    ])
    .toArray();
  return clients;
}

export {
  getAllSales,
  getSale,
  getSalesByLocation,
  getSalesFiltered,
  getTopSellingProducts,
  getMostSatisfiedClients,
};
