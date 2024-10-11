import express from "express";
import { getAllSales, getSaleId, getSaleFilter } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/:id", async (req, res) => {
  const sale = await getSaleId(req.params.id);
  res.json(sale);
} )

router.get("/:storeLocation", async (req, res) => {
  const sale = await getSalgit eFilter(req.params.storeLocation);
  res.json(sale);
} )



export default router;
