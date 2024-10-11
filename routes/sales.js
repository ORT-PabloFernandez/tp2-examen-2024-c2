import express from "express";
import {
  getAdvancedFilter,
  getAllSales,
  getClientsBySatisfaction,
  getSaleById,
  getSaleByLocation,
  getTopTen,
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/bylocation/:location", async (req, res) => {
  console.log("Sales By Location");
  const sales = await getSaleByLocation(req.params.location);
  res.json(sales);
});

router.get("/advancedfilter", async (req, res) => {
  console.log("Advanced Filter");
  const { location, purchaseMethod } = req.query;
  console.log(location, purchaseMethod);
  const sales = await getAdvancedFilter(location, purchaseMethod);
  res.json(sales);
});

router.get("/topten", async (req, res) => {
  console.log("Top ten");
  const Topten = await getTopTen();
  res.json(Topten);
});

router.get("/clients/satisfactionlist", async(req,res) => {
  console.log("Satisfaction List")
  const List = await getClientsBySatisfaction()
  res.json(List)
})

router.get("/:id", async (req, res) => {
  console.log("ID");
  const sale = await getSaleById(req.params.id);
  res.json(sale);
});

export default router;
