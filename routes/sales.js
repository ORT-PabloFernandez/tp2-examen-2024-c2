import express from "express";
import { getAllSales, getSaleById, getSalesByLocation, getSalesFiltered, getTopSoldProducts, getClientsSatisfaction } from "../data/sales.js";

const router = express.Router();

// TEST - ENDPOINT http://localhost:3000/api/sales/5bd761dcae323e45a93cd02b
router.get("/:id", async (req, res) => {
  res.json(await getSaleById(req.params.id));
});


// TEST - ENDPOINT http://localhost:3000/api/sales/location/Austin
router.get("/location/:storeLocation", async(req,res) => {
  res.json(await getSalesByLocation(req.params.storeLocation))
})


// TEST - ENDPOINT http://localhost:3000/api/sales/filterSales/filter?storeLocation=denver&purchaseMethod=In%20store&couponUsed=true
router.get("/filterSales/filter", async (req,res) => {
    const { storeLocation, purchaseMethod, couponUsed } = req.query;
    res.json(await getSalesFiltered(storeLocation, purchaseMethod, couponUsed))
})


// TEST - ENDPOINT http://localhost:3000/api/sales/products/top-products
router.get("/products/top-products", async (req,res) => {
  res.json(await getTopSoldProducts());
})

// TEST - ENDPOINT http://localhost:3000/api/sales/clients/clientsatisfaction
router.get("/clients/clientsatisfaction", async (req, res) => {
  res.json(await getClientsSatisfaction());
});

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

export default router;
