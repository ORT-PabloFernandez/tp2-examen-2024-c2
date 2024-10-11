import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const SALES = "sales";

export async function getAllSales(pageSize, page) {
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

export async function getSale(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({_id: new ObjectId(id)});
  return sale;
}

export async function getSalesByStoreLocation(location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({storeLocation: location})
    .toArray();
  return sales;
}

export async function getSalesByLocationPurchaseCoupon(location, method) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({storeLocation: location,
      purchaseMethod: method,
      couponUsed: true
    })
    .toArray();
  return sales;
}

export async function getCostumerBySatisfaction() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find()
    .toArray();
  const customers = sales
    .map(sale => sale.customer)
    .sort({"customer.satisfaction": -1});
  return customers;
}
