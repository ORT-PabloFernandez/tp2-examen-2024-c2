import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const SALES = "sales";

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
  const Sale = connectiondb
    .db(DATABASE)
    .collection(SALES)
    .findOne({ _id: new ObjectId(id) });
  return Sale;
}

export async function getSaleByLocation(location) {
  const connectiondb = await getConnection();
  const Sales = connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({ storeLocation: location })
    .toArray();
  return Sales;
}

export async function getAdvancedFilter(location, purchaseMethod) {
  const connectiondb = await getConnection();
  const Sales = connectiondb
    .db(DATABASE)
    .collection(SALES)
    .find({
      storeLocation: location,
      purchaseMethod: purchaseMethod,
      couponUsed: true,
    })
    .toArray();
  return Sales;
}

export async function getTopTen() {
  const connectiondb = await getConnection();
  const salesCollection = connectiondb.db(DATABASE).collection(SALES);

  const sales = await salesCollection.find().toArray();

  const productSalesCount = {};

  sales.forEach((sale) => {
    const soldProducts = sale.items;
    soldProducts.forEach((object) => {
      const objectName = object.name;
      const quantity = object.quantity;

      if (productSalesCount[objectName]) {
        productSalesCount[objectName] += quantity;
      } else {
        productSalesCount[objectName] = quantity;
      }
    });
  });

  const orderProducts = [];

  for (const objectName in productSalesCount) {
    orderProducts.push({
      name: objectName,
      quantity: productSalesCount[objectName],
    });
  }

  orderProducts.sort((a, b) => b.quantity - a.quantity);

  const topTen = orderProducts.slice(0, 10);

  return topTen;
}

export async function getClientsBySatisfaction() {
  const connectiondb = await getConnection();
  const salesCollection = await connectiondb.db(DATABASE).collection(SALES);

  const sales = await salesCollection.find().toArray();

  const customersMap = {};

  sales.forEach((sale) => {
    const customer = sale.customer;

    if (customer && customer.satisfaction !== undefined) {
      const customerEmail = customer.email;

      if (!customersMap[customerEmail]) {
        customersMap[customerEmail] = {
          email: customer.email,
          satisfaction: customer.satisfaction,
        };
      }
    }
  });

  const customersArray = [];

  for (const email in customersMap){
    customersArray.push(customersMap[email])
  }

  customersArray.sort((a,b) => b.satisfaction - a.satisfaction)

  return customersArray;
}
