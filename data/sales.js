import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

export async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export async function getSale(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}

export async function getByLocation(pageSize, page, location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ storeLocation: location })
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export async function getFilteredSales(
  pageSize,
  page,
  location,
  method,
  coupon
) {
  const connectiondb = await getConnection();
  const query = {
    storeLocation: location,
    purchaseMethod: method,
    couponUsed: coupon,
  };

  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(query)
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return sales;
}

export async function getTopTenSoldProducts(limit) {
  const connectiondb = await getConnection();
  const products = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .aggregate([
      { $unwind: "$items" },
      {
        $group: { _id: "$items.name", totalSold: { $sum: "$items.quantity" } },
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
    ])
    .toArray();
  return products;
}

export async function getCustomersBySatisfaction() {
  const connectiondb = await getConnection();
  const customers = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .aggregate([
      { $sort: { satisfaction: -1 } },
      {
        $group: {
          _id: "$custormer.email",
          customer: { $first: "$customer" },
        },
      },
      // {
      //   $group: {
      //     _id: "$custormer.email",
      //     satisfaction: { $max: "$customer.satisfaction" },
      //     customer: { $first: "$customer" },
      //   },
      // },
      // { $sort: { satisfaction: -1 } },
    ])
    .toArray();
  return customers;
}

//export { getAllSales };
