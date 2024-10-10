import express from "express";
import { getAllSales , getSale , filterByLocation , filterByLocationPurchaseCoupon , topTenProducts } from "../data/sales.js";
import { getClients } from "../data/clients.js";
import { topTenProducts } from "../data/products.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/buscarsale/:id", async (req, res) => {
  res.json(await getSale(req.params.id))
})

router.get("/locationfilter/", async(req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const location = req.query.location
  res.json(await filterByLocation(location, pageSize, page))
})

router.get("/multiplefilter/", async (req, res) => {
  const location = req.query.location ? req.query.location : "Denver"
  const purchase = req.query.purchaseMethod ? req.query.purchaseMethod : "Online"
  const coupon = req.query.couponUsed ? req.query.couponUsed : "false"
  res.json(await filterByLocationPurchaseCoupon(location, purchase, coupon))
})

router.get("/toptenproducts/", async(req, res) => {
  res.json(await topTenProducts())
})

router.get("/clientsbysatisfaction/", async(req, res) => {
  res.json(await getClients())
})

export default router;
