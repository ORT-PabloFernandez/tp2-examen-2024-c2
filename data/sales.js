import { ObjectId } from "mongodb";
import getConnection from "./conn.js";

const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
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

// 1
// api/sales/5bd761dcae323e45a93cd0d3
// Comentar para testear item 3 getSaleByFilters
async function getOneSale(id) {
  const connectiondb = await getConnection();

  const sale = await connectiondb
  .db(DATABASE)
  .collection(SALES)
  .findOne({ _id: new ObjectId(id)});

  return sale;
}

// 2
// api/sales/storeLocation/Seattle
async function getSaleByStoreLocation(storeLocation) {
  const connectiondb = await getConnection();

  const filter = { storeLocation : storeLocation };

  const sale = await connectiondb
  .db(DATABASE)
  .collection(SALES)
  .find(filter)  
  .toArray();

  return sale;
}

// 3
// api/sales/filter?storeLocation=[storeLocation]&purchaseMethod=[purchaseMetod]&couponUsed=[value]
// api/sales/filterByStorePurchaseCoupon/filter?storeLocation=Seattle&purchaseMethod=Online&couponUsed=false
async function getSaleByFilters(storeLocation, purchaseMethod, couponUsed) {
  const connectiondb = await getConnection();

  const saleFiltered = await connectiondb
  .db(DATABASE)
  .collection(SALES)
  .find({
    $and: [
      { storeLocation: { $regex: new RegExp(storeLocation, 'i') }},
      { purchaseMethod: { $regex: new RegExp(purchaseMethod, 'i') }},
      { couponUsed: couponUsed === 'true'}
    ]
  })
  .toArray();

  return saleFiltered;
}

// 4
// api/sales/products/topTenProducts
async function getTopTenProducts() {
  const connectiondb = await getConnection();

  const topProducts = await connectiondb
    .db(DATABASE)
    .collection(SALES)
    .aggregate([ //Pipeline de agregación: agrupar valores de distintos documentos y devolver un solo resultado
      //source: https://www.mongodb.com/docs/manual/aggregation/
      { $unwind: "$items" }, //Descompone el array de items para hacer la suma de las cantidades
      { 
        $group: { //Agrupar items por: nombre de producto y el total de cantidades vendidas
          _id: "$items.name",
          totalSold: { $sum: "$items.quantity" } //Suma la cantidad vendida de cada item
        } 
      },
      { $sort: { totalSold: -1 } }, //Ordenado de manera descendente
      { $limit: 10 } //Devuelve solo 10 objetos
    ])
    .toArray();

  return topProducts;
}

// 5
// api/sales/customers/satisfaction
async function getCustomersBySatisfaction() {
  const connectiondb = await getConnection();

  const customers = await connectiondb
  .db(DATABASE)
  .collection(SALES)
  .find({ "customer.satisfaction": { $exists: true }})
  .sort({ "customer.satisfaction": -1}) //Ordenado de manera descendente
  .toArray();

  return customers;
}

export { getOneSale, getAllSales, getSaleByStoreLocation, getSaleByFilters, getCustomersBySatisfaction, getTopTenProducts };