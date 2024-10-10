import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

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

export async function getSalePorId(id){
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id)});

  return sale;
}

export async function getSalesPorLocation(location){
  const connectiondb = await getConnection();
  const locationSales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({storeLocation: { $in: [location] } })
    .toArray();
  return locationSales
}



export { getAllSales };
