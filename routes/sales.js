import express from "express";
import { getOneSale, getAllSales, getSaleByStoreLocation, getSaleByFilters, getCustomersBySatisfaction, getTopTenProducts} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

// 1
// api/sales/5bd761dcae323e45a93cd0d3
router.get("/:id", async(req, res) => {
  try {
    const sale = res.json(await getOneSale(req.params.id));
    res.json(sale);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error'});
  } 
});

// 2
// api/sales/storeLocation/Seattle
router.get("/storeLocation/:storeLocation", async(req, res) => {
  const { storeLocation } = req.params;

  try {
    const saleByStoreLocation = res.json(await getSaleByStoreLocation(storeLocation));
    res.json(saleByStoreLocation);
  } catch(error) {
    console.log(error);
    res.status(500).json({ message: 'Error'});
  } 
});

// 3
// api/sales/filter?storeLocation=[storeLocation]&purchaseMethod=[purchaseMetod]&couponUsed=[value]
// api/sales/filterByStorePurchaseCoupon/filter?storeLocation=Seattle&purchaseMethod=Online&couponUsed=false
router.get("/filterByStorePurchaseCoupon/filter", async (req, res) => {
  const { storeLocation, purchaseMethod, couponUsed } = req.query;

  res.json(await getSaleByFilters(storeLocation, purchaseMethod, couponUsed));
})

// 4 
// api/sales/products/topTenProducts
router.get("/products/topTenProducts", async (req, res) => {
  res.json(await getTopTenProducts());
})

// 5
// api/sales/customers/satisfaction
router.get("/customers/satisfaction", async (req, res) => {
  const customers = await getCustomersBySatisfaction();
  res.json(customers);
});

export default router;
