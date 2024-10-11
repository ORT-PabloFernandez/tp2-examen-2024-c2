import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
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

export async function getSaleById(id) {
  const connectiondb = await getConnection();
  const sale = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .findOne({ _id: new ObjectId(id) });

  return sale;
}


export async function getSalesByLocation(storeLocation){
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find( {storeLocation : storeLocation} )
    .toArray();
  
    return sales;
}

export async function getSalesFiltered(storeLocation, purchaseMethod, couponUsed){
  const connectiondb = await getConnection();
  const salesFiltered = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find( {
      $and: [
      { storeLocation: { $regex: new RegExp(storeLocation, 'i') }},
			{ purchaseMethod: { $regex: new RegExp(purchaseMethod, 'i') }},
			{ couponUsed: couponUsed === 'true' }
      ]
    })
    .toArray();
  
    return salesFiltered;
}

export async function getTopSoldProducts() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .toArray();
  
  const productQuantities = {};

  sales.forEach(sale => {
    sale.items.forEach(item => {
      if (productQuantities[item.name]) {
        productQuantities[item.name] += item.quantity;
      } else {
        productQuantities[item.name] = item.quantity;
      }
    });
  });

  const topProducts = Object.keys(productQuantities)
    .map(name => ({ name, totalQuantity: productQuantities[name] }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 10);

  return topProducts;
}


export async function getClientsSatisfaction() {
  const connectiondb = await getConnection();
  const sales = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({})
    .toArray();
  const clients = sales
    .map((sale) => ({
      client: sale.customer,
      satisfaction: sale.satisfaction,
    }))
    .sort((a, b) => b.client.satisfaction - a.client.satisfaction);
  return clients;
}