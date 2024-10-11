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
  if (!sale) {
    throw new Error("sale no encontrada");
  }
  return sale;
}

export async function getSalesByLocations(location) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ storeLocation: location })
    .toArray();

  return sales;
}

export async function getSalesExSales(locacion, metodo, cupon) {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      storeLocation: locacion,
      purchaseMethod: metodo,
      couponUsed: cupon,
    })
    .toArray();

  return sales;
}

export async function getTenMostSold() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({}, { proyection: { "items.quantity": 1, _id: 0 } })
    .sort({ "items.quantity": -1 })
    .limit(10)
    .toArray();

  return sales;
}
