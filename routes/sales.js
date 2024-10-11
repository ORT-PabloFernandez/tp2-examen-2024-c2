import express from "express";
import {
  getSale,
  getAllSales,
  getByLocation,
  getFilteredSales,
  getTopTenSoldProducts,
  getCustomersBySatisfaction,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/topTen/products", async (req, res) => {
  res.json(await getTopTenSoldProducts(10)); // top10
});

router.get("/customerBySatisfaction", async (req, res) => {
  res.json(await getCustomersBySatisfaction());
});

router.get("/filtered", async (req, res) => {
  const location = req.query.location;
  const method = req.query.method;
  const coupon = req.query.coupon === "true";

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getFilteredSales(pageSize, page, location, method, coupon));
});

router.get("/:id", async (req, res) => {
  res.json(await getSale(req.params.id));
});

router.get("/location/:location", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getByLocation(pageSize, page, req.params.location));
});

export default router;
