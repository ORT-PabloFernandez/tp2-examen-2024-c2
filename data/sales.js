import { ObjectId } from "mongodb";
import getConnection from "./conn.js";
const DATABASE = "sample_supplies";
const MOVIES = "sales";

async function getClientsSortSatisfaction() {
	const connectiondb = await getConnection();
	const sales = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.find({})
		.toArray();
	const clients = new Map();
	sales.forEach(sale => {
		if (!clients.has(sale.customer.email)) {
			clients.set(sale.customer.email, sale.customer);
		}
	})
	return Array.from(clients.values()).sort((a, b) => b.satisfaction - a.satisfaction);
}

async function getProductsTenMostSold() {
	const connectiondb = await getConnection();
	const sales = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.find({})
		.toArray();
	const products = new Map();
	sales.forEach(sale => {
		sale.items.forEach(item => {
			if (products.has(item.name)) {
				products.get(item.name).quantity += item.quantity;
			} else {
				products.set(item.name, item);
			}
		})
	})
	return Array.from(products.values()).sort((a, b) => b.quantity - a.quantity).slice(0, 10);
}


async function getSalesFilterBy_storeLocation_purchasedMethd_couponUsed(storeLocation, purchaseMethod, couponUsed, pageSize, page) {
	const connectiondb = await getConnection();
	const salesFilter = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.find({
			storeLocation: { $regex: new RegExp(storeLocation, 'i') },
			purchaseMethod: { $regex: new RegExp(purchaseMethod, 'i') },
			couponUsed: couponUsed === 'true'
		})
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return salesFilter;
}

async function getSalesFilterByStoreLocation(storeLocation, pageSize, page) {
	const connectiondb = await getConnection();
	const salesFilterByStoreLocation = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.find({ storeLocation: { $regex: new RegExp(storeLocation, 'i') } })
		.limit(pageSize)
		.skip(pageSize * page)
		.toArray();
	return salesFilterByStoreLocation;
}

async function getSaleById(id) {
	const connectiondb = await getConnection();
	const sale = await connectiondb
		.db(DATABASE)
		.collection(MOVIES)
		.findOne({ _id: new ObjectId(id) });

	return sale;
}

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

export { getAllSales, getSaleById, getSalesFilterByStoreLocation, getSalesFilterBy_storeLocation_purchasedMethd_couponUsed, getProductsTenMostSold, getClientsSortSatisfaction };
