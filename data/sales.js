import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";
import {ObjectId} from "mongodb"

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

async function getByFilters(location, purchaseMethod,couponUsed)
{
  console.log("Dentro de getByFilters");
  const couponParse = (couponUsed === 'true');
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({
      storeLocation: location,
      purchaseMethod: purchaseMethod,
      couponUsed: couponParse
    })
    .toArray();
    console.log("Sales dentro del metodo:"+ sales);
  return sales;

}


async function getSalesByLocation(location,pageSize, page)
{
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



async function getSaleById(id)
{
  const connectiondb = await getConnection();
  const sale = await connectiondb
.db(DATABASE)
.collection(MOVIES)
.findOne({_id:new ObjectId(id)});
return sale;
}


export { getAllSales, getSaleById, getSalesByLocation,getByFilters};
