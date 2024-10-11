import express from "express";
import { getAllSales, getSale, getSalesByStoreLocation, getSalesByLocationPurchaseCoupon, getCostumerBySatisfaction } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    res.json(await getAllSales(pageSize, page));  
  } catch(error) {
    console.log(error);
    res.json(500).json({message: 'An error ocurred.'});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const sale = await getSale(saleId);
    console.log(saleId);
    if(sale) {
      res.json(sale);
    } else {
      res.status(404).json({message: 'The sale does not exist.'})
    }
  } catch(error) {
    console.log(error);
    res.json(500).json({message: 'An error ocurred.'});
  }
});

router.get("/location", async (req, res) => {
  try {
    const storeLocation = req.query.location;
    const sale = await getSalesByStoreLocation(storeLocation);
    res.json(sale);
  } catch(error) {
    console.log(error);
    res.json(500).json({message: 'An error ocurred.'});
  }
});

router.get("/location/method/coupon", async (req, res) => {
  try {
    const storeLocation = req.query.location;
    const purchaseMethod = req.query.purchase;
    const sale = await getSalesByLocationPurchaseCoupon(storeLocation, purchaseMethod);
    res.json(sale);
  } catch(error) {
    console.log(error);
    res.json(500).json({message: 'An error ocurred.'});
  }
});

router.get("/satisfaction", async (req, res) => {
  try {
    const costumer = await getCostumerBySatisfaction();
    res.json(costumer);
  } catch(error) {
    console.log(error);
    res.json(500).json({message: 'An error ocurred.'});
  }
});


export default router;
