import express from "express";
import { 
  getAllSales,
  getSaleById,
  getSalesByStoreLocation,
  getFilteredSales,
  getTop10MostSellingProducts,
  getMostSatisfiedClients
} from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/id/:id", async (req, res) => {
  const sale = await getSaleById(req.params.id);
  res.json(sale);
});

router.get("/storeLocation/:storeLocation", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getSalesByStoreLocation(pageSize, page, req.params.storeLocation));
});

router.get("/filter", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const filter = {
    storeLocation: req.query.storeLocation ? req.query.storeLocation : null,
    purchaseMethod: req.query.purchaseMethod ? req.query.purchaseMethod : null,
    couponUsed: (req.query.couponUsed === 'true')
  }
  console.log(filter);

  res.json(await getFilteredSales(pageSize, page, filter));
})

router.get("/top10MostSellingProducts", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getTop10MostSellingProducts(pageSize, page));
})

router.get("/mostSatisfiedClient", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getMostSatisfiedClients(pageSize, page));
})

export default router;
