import express from "express";
import { getAllSales,getSaleById,getSalesByLocation,getByFilters } from "../data/sales.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getAllSales(pageSize, page));
});

router.get("/topSellers", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await getTopSellers(pageSize));
});


router.get("/filters/:location/:purchaseMethod/:couponUsed", async (req, res) => {
  
  const location = req.params.location;
  const purchaseMethod = req.params.purchaseMethod;
  const couponUsed = req.params.couponUsed;
  
  try {
    console.log("Parametros:" + location,purchaseMethod,couponUsed);
    const sales = await getByFilters(location,purchaseMethod,couponUsed);
    console.log("sales"+sales);
    return res.status(200).json(sales);

  } 
  catch (error) 
  {
    return res.status(500).json({message:"Error interno del servidor accediendo a filter", error:error.message});
  }
});


router.get("/location/:location", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const location = req.params.location

  try {
    const sales = await getSalesByLocation(location,pageSize,page);
    return res.status(200).json(sales);

  } 
  catch (error) 
  {
    return res.status(500).json({message:"Error interno del servidor", error:error.message});
  }
});



router.get("/:id", async (req, res) => {
  
const {id} = req.params;
console.log("Id recibido por param "+id);

try {
  const sale = await getSaleById(id);
  return res.status(200).json(sale);


} catch (error) {
  return res.status(500).json({message:"Error interno del servidor", error:error.message});
}

});

export default router;
