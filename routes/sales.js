import express from "express";
import {
  getAllSales,
  getSale,
  getSalesByLocation,
  getSalesFiltered,
  getTopSellingProducts,
  getMostSatisfiedClients,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/id/:id", async (req, res) => {
  const sale = await getSale(req.params.id);
  res.json(sale);
});

router.get("/location/:location", async (req, res) => {
  const sales = await getSalesByLocation(req.params.location);
  res.json(sales);
});

router.get("/filter", async (req, res) => {
  const { storeLocation, purchaseMethod, couponUsed } = req.query;
  const sales = await getSalesFiltered(
    storeLocation,
    purchaseMethod,
    couponUsed
  );
  res.json(sales);
});

router.get("/topSellingProducts", async (req, res) => {
  const sales = await getTopSellingProducts();
  res.json(sales);
});

router.get("/mostSatisfied", async (req, res) => {
  const sales = await getMostSatisfiedClients();
  res.json(sales);
});

export default router;
