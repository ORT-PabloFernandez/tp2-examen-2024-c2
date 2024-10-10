import getConnection from "./conn.js";
import { ObjectId } from "mongodb";
const DATABASE = "sample_supplies";
const SALES = "sales";

async function getAllSales(pageSize, page) {
  const connectiondb = await getConnection();
  try {
    const sales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find({})
      .limit(pageSize)
      .skip(pageSize * page)
      .toArray();
    return sales;
  } catch (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }
}
export async function getSale(id) {
  const connectiondb = await getConnection();
  try {
    const sale = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .findOne({ _id: new ObjectId(id) });
    return sale;
  } catch (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }
}

export async function getSalesByFilters(filters, pageSize, page) {
  const connectiondb = await getConnection();
  try {
    const filteredSales = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find(filters)
      .limit(pageSize)
      .skip(pageSize * page)
      .toArray();
    return filteredSales;
  } catch (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }
}

export async function getSalesMasVendidos() {
  const connectiondb = await getConnection();
  try {
    const masVendidos = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.name",
            totalQuantity: { $sum: "$items.quantity" },
          },
        },
        {
          $sort: { totalQuantity: -1 },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();
    return masVendidos;
  } catch (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }
}

export async function getCustomersBySatisfaction(pageSize, page) {
  const connectiondb = await getConnection();
  try {
    const customersSorted = await connectiondb
      .db(DATABASE)
      .collection(SALES)
      .find({
        "customer.satisfaction": { $ne: null },
      })
      .sort({
        "customer.satisfaction": -1,
      })
      .limit(pageSize)
      .skip(pageSize * page)
      .toArray();
    return customersSorted;
  } catch (error) {
    throw new Error(`Error fetching movies: ${error.message}`);
  }
}

export { getAllSales };
