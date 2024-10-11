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

export async function masVendidos(){
  const connectiondb = await getConnection();
  const masVendidos = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .aggregate([
      {$unwind: "$items" }, //desarmo array de items
      { $group: { 
            _id: "$items.name", 
            totalCantidad: { $sum: "$items.quantity" } 
                } 
      },
      { $sort: { totalCantidad: -1 } },
      { $limit: 10 }
    ])
    .toArray();
  return masVendidos
  
}


export async function buscarVentas({ location, purchaseMethod, couponUsed}){
  const connectiondb = await getConnection();
  const query = {};
  if (location) query.storeLocation = location;
  if (purchaseMethod) query.purchaseMethod = purchaseMethod;
  if (couponUsed !== undefined) query.couponUsed = couponUsed === "true";

  const ventas = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find(query)
    .toArray();

    return ventas;
}

export { getAllSales };
