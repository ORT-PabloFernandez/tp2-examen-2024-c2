import express from "express";
import { getAllSales, getSaleById, getSalesFilterByStoreLocation, getSalesFilterBy_storeLocation_purchasedMethd_couponUsed, getProductsTenMostSold, getClientsSortSatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/sort-clients-satisfaction", async (req, res) => {
	try {
		const clients = await getClientsSortSatisfaction();
		if (clients) {
			res.json(clients);
		} else {
			res.status(404).send("clientes not found");
		}
	} catch(error) {
		res.status(500).send("Internal error");
	}
});

router.get("/most-sold-prod", async (req, res) => {
	try {
		const products = await getProductsTenMostSold();
		if (products) {
			res.json(products);
		} else {
			res.status(404).send("products not found");
		}
	} catch(error) {
		res.status(500).send("Internal error");
	}
});

router.get("/filter-sale", async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		const storeLocation = req.query.storeLocation;
		const purchaseMethod = req.query.purchaseMethod;
		const couponUsed = req.query.couponUsed;

		if (storeLocation && purchaseMethod && couponUsed) {
			const sales = await getSalesFilterBy_storeLocation_purchasedMethd_couponUsed(storeLocation, purchaseMethod, couponUsed, pageSize, page);
			if (sales) {
				res.json(sales);
			} else {
				res.status(404).send("Sales not found");
			}
		} else {
			res.status(422).send("invalid parameter");
		}
	} catch(error) {
		res.status(500).send("Internal error");
	}
});

router.get("/store-location/:storeLocation", async (req, res) => {
	try {
		const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
		const page = req.query.page ? parseInt(req.query.page) : 0;
		const storeLocation = req.params.storeLocation;

		if (storeLocation) {
			const sales = await getSalesFilterByStoreLocation(storeLocation, pageSize, page);
			if (sales) {
				res.json(sales);
			} else {
				res.status(404).send("Sales not found");
			}
		} else {
			res.status(422).send("invalid parameter");
		} 
	} catch(error) {
		res.status(500).send("Internal error");
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const sale = await getSaleById(id);
		if (sale) {
			res.json(sale);
		} else {
			res.status(404).send("Sale not found");
		}
	} catch(error) {
		res.status(500).send("Internal error");
	}
});

router.get("/", async (req, res) => {
	const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
	const page = req.query.page ? parseInt(req.query.page) : 0;

	res.json(await getAllSales(pageSize, page));
});

export default router;
