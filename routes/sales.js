import express from "express";
import { getAllSales, getSaleByID, getSalesByStoreLocation, getSalesByFilters, getCustomersByOrderOfSatisfaction} from "../data/sales.js";

const router = express.Router();

router.get("/customersByOrderOfSatisfaction", async (req, res) => {
  try{
    const customers = await getCustomersByOrderOfSatisfaction()
    res.json(customers)
  } catch (error) {
    res.status(500).json({"Error con el listado de clientes por oden de satisfaccion": error.message});
  }
});

router.get("/filters-sales", async (req, res) => {
  try{
    const storeLocation = req.query.storeLocation;
    const purchaseMethod = req.query.purchaseMethod;
    const couponUsed = req.query.couponUsed;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    
    const sales = await getSalesByFilters(storeLocation, purchaseMethod, couponUsed, pageSize, page)
    res.json(sales)
  } catch (error) {
    res.status(500).json({"Error en la filtracion de ventas": error.message})
  }
});

router.get("/storeLocation/:store", async (req, res) => {
  try{
    const storeLocation = req.params.store;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const salesByStoreLocation = await getSalesByStoreLocation(storeLocation, pageSize, page);
    res.json(salesByStoreLocation);
  } catch (error) {
    res.status(500).json({"Error en la obtencion de las ventas por la ubicacion de la tienda" : error.message});
  }
});

router.get("/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const sale = await getSaleByID(id);
    if(!sale){
      res.status(404).json({message: "Error! No se encontro la venta"});
    } else {
      res.json(sale);
    }
  }catch (error) {
    res.status(500).json({"Error en la obtencion de la venta con ID": error.message});
  }
});

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  res.json(await getAllSales(pageSize, page));
});

export default router;
