import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

async function getAllSales(pageSize, page, location, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();
   const query = {};

   if (location) {
       query.storeLocation = location;
   }
   if (purchaseMethod) {
       query.purchaseMethod = purchaseMethod;
   }
   if (couponUsed !== undefined) {
       query.couponUsed = couponUsed === 'true';
   }
   
   const sales = await connectiondb
   .db(DATABASE)
   .collection(MOVIES)
   .find(query) 
   .limit(pageSize)
   .skip(pageSize * page)
   .toArray();

return sales;
}

async function getSalesById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });
  return sale;
}


async function getTopSelling() {
  const connectiondb = await getConnection();

  const topProducts = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .aggregate([
          {
              $unwind: "$items" 
          },
          {
              $group: {
                  _id: "$items.name",
                  totalSales: { $sum: "$items.quantity" }
              }
          },
          {
              $sort: { totalSales: -1 } 
          },
          {
              $limit: 10 
          }
      ])
      .toArray();

  return topProducts;
}


async function getSatisfaccion() {
  const connectiondb = await getConnection();
  const customers = await connectiondb
      .db(DATABASE)
      .collection(MOVIES)
      .aggregate([
          {
              $group: {
                  _id: "$customer.email", 
                  averageSatisfaction: { $avg: "$customer.satisfaction" }, 
                  totalSales: { $sum: 1 } 
              }
          },
          {
              $sort: { averageSatisfaction: -1 }
          }
      ])
      .toArray();

  return customers;
}



export { getAllSales , getSalesById , getTopSelling , getSatisfaccion };

