import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
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
async function getSaleId(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
    
    return sale;
}

async function getSaleFilter(location){
  const connectiondb = await getConnection();
  const sales = await connectiondb
  .db(DATABASE)
  .collection(MOVIES)
  .toArray()
  .find({}.filter(sale => sale.storeLocation == location))
  

  return sales
}




 
export { getAllSales, getSaleId, getSaleFilter };
