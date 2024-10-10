import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";
import { ObjectId } from "mongodb";

async function getAllSales(pageSize, page) {
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

async function getSale (id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({_id : new ObjectId(id)})
  return sale
}

async function filterByLocation(location, pageSize, page) {
  const connectiondb = await getConnection();
  const filteredSales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({storeLocation : location})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();

  return filteredSales;
}

async function filterByLocationPurchaseCoupon(location, purchaseMethod, couponUsed) {
  let coupon = couponUsed === "true"? true : false;
  const connectiondb = await getConnection();
  const filteredSales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      storeLocation: location,
      couponUsed: coupon,
      purchaseMethod: purchaseMethod
    })
    .toArray()

  return filteredSales;
}

export { getAllSales , getSale , filterByLocation , filterByLocationPurchaseCoupon };
