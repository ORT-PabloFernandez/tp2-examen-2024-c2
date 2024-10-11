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

export async function getSaleByID(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({_id: new ObjectId(id)});
  return sale;
}

export async function getSalesByStoreLocation(storeLocation, pageSize, page) {
  const connectiondb = await getConnection();
  const salesByStoreLocation = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation : storeLocation})
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return salesByStoreLocation;
}

export async function getSalesByFilters(storeLocation, purchaseMethod, couponUsed, pageSize, page) {
  const connectiondb = await getConnection();
  const query = {}

  if(storeLocation){
    query.storeLocation = storeLocation;
  }

  if(purchaseMethod){
    query.purchaseMethod = purchaseMethod;
  }

  if(couponUsed){
    query.couponUsed = couponUsed === 'true';
  }
  
  const salesByFilters = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find(query)
    .limit(pageSize)
    .skip(pageSize * page)
    .toArray();
  return salesByFilters
}

export async function getCustomersByOrderOfSatisfaction() {
  const connectiondb = await getConnection();
  const customers = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({}, {projection: {customer:1}})
    .sort({"customer.satisfaction": -1})
    .toArray();
  return customers;
}