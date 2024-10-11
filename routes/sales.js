import express from "express";
import {
  getAllSales,
  getSale,
  getSalesByLocations,
  getSalesExSales,
  getTenMostSold,
} from "../data/sales.js";

// no pude practicar, no dejaste el link del server de MONGODB para el simulacro

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const sale = await getSale(req.params.id);
  res.json(sale);
});

router.post("/", async (req, res) => {
  const sales = await getSalesByLocations(req.body.storeLocation);
  res.json(sales);
});

router.post("/", async (req, res) => {
  const sales = await getSalesExSales(
    req.body.storeLocation,
    req.body.purchaseMethod,
    req.body.couponUsed
  );
  res.json(sales);
});

router.get("/", async (req, res) => {
  const sales = await getTenMostSold();
  res.json(sales);
});

export default router;
